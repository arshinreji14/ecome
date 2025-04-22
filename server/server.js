
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 4000;
const MONGO_URI="mongodb+srv://arshinreji12:Tbmn12ombiRCDumT@cluster0.juvskn1.mongodb.net/shope?retryWrites=true&w=majority&appName=Cluster0"


const app = express();
const port = PORT || 4000;
const mongoURI = MONGO_URI;

app.use(bodyParser.json());
app.use(cors());

// ✅ Connect to MongoDB with Mongoose
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB via Mongoose"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
const productSchema = new mongoose.Schema({
  id: String,
  image: String,
  title: String,
  description: String,
  price: String,
  stock: Number,
  category: String, 
});

const cartSchema = new mongoose.Schema({
  id: String,
  image: String,
  title: String,
  description: String,
  price: String,
  quantity: Number,
  stock: Number,
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  termsAccepted: {
    type: Boolean,
    required: true,
  },
}, { timestamps: true });

const Product = mongoose.model("Products", productSchema);
const Cart = mongoose.model("Carts", cartSchema);
const User = mongoose.model("Users", userSchema);

// Register API
app.post("/api/register", async (req, res) => {
  try {
    const {
      username,
      name,
      email,
      phone,
      password,
      termsAccepted,
    } = req.body;

    console.log("Incoming request body:", req.body);
    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { phone }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username, Email or Phone already in use." });
    }

    // Save new user
    const newUser = new User({
      username,
     name,
      email,
      phone,
      password, // In real apps, hash the password before saving!
      termsAccepted,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// Login API
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
console.log(user);

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // No JWT, just return success message and maybe user info
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



app.get("/api/products/:limit/:page", async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.params;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalProducts = await Product.countDocuments();
    const products = await Product.find().skip(skip).limit(parseInt(limit)).exec();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post('/api/products', async (req, res) => {
  console.log('Request Body:', req.body); // Log request body for debugging
  const product = new Product({
    image: req.body.image,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    category: req.body.category,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error saving product:', error); // Log error for debugging
    res.status(400).json({ message: error.message });
  }
});
// Cart APIs
app.get("/api/carts", async (req, res) => {
  try {
    const cart = await Cart.find();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/carts", async (req, res) => {
  try {
    const cart = new Cart(req.body);
    const newCart = await cart.save();
    res.status(201).json(newCart);
    console.log("New cart item added:", newCart); // Log the new cart item for debugging
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/carts/:id", async (req, res) => {
  try {
    const deletedCartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart item" });
  }
});
app.put("/api/carts/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: "Failed to update quantity" });
  }
});
// app.put("/api/products/:id/decrease-stock", async (req, res) => {
//   const { id } = req.params;
//   const { quantity } = req.body; // How much to decrease stock by

//   try {
//     const product = await Product.findById(id);
//     if (!product) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     if (product.stock < quantity) {
//       return res.status(400).json({ error: "Not enough stock available" });
//     }

//     product.stock -= quantity;
//     await product.save();

//     res.json(product);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to decrease product stock" });
//   }
// });
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});