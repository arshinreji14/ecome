import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { Eye, ShoppingCart, Star } from 'lucide-react';
interface Product {
  _id: string;
  image: string;
  title: string;
  description: string;
  stock:number;
  quantity: number;
  price: number;
  category: string; 
}

type ShopCardItemProps = {
  value: Product;
};

const ShopCardItem: React.FC<ShopCardItemProps> = ({ value }) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleAddToCart = async () => {
    const cartItem = {
      _id: value._id,
      image: value.image,
      title: value.title,
      description: value.description,
      price: value.price,
      stock: value.stock,
      quantity: 1, 
    }; // Add quantity to the cart item
    console .log('Adding to cart:', cartItem); // Debugging line
    try {
      const response = await axios.post('http://localhost:4000/api/carts', cartItem);
      console.log('API response:', response.data); // Handle successful response (optional)
    } catch (error) {
      console.error('Error adding to cart (API):', error); // Handle errors
    }
  };

  return (
  
    <div
      className="relative w-40 h-52 sm:w-64 sm:h-96 rounded-xl overflow-hidden shadow-lg bg-white transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Main Product Image */}
      <div className="relative w-full h-24 sm:h-64 overflow-hidden">
        <Image
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovering ? 'scale-110' : 'scale-100'}`}
          src={value.image || ""}
          alt={value.title}
          fill
        />
        
        {/* Quick action buttons - hidden on mobile */}
        <div className={`absolute right-2 sm:right-3 flex flex-col gap-1 sm:gap-2 transition-all duration-300 ${isHovering ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <button
            className="bg-white rounded-full p-1 sm:p-2 shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
          </button>
        </div>
      </div>
      
      {/* Product Details */}
      <div className="p-2 sm:p-4 flex flex-col h-20 sm:h-32">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-xs sm:text-base font-medium text-gray-800 line-clamp-1">{value.title}</h3>
          <div className="flex items-center">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-xs sm:text-sm text-gray-600 ml-1">4.5</span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-1 sm:line-clamp-2 mb-1 sm:mb-2">{value.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-baseline">
            {/* Price would go here */}
          </div>
        </div>
      </div>
      
      {/* Add to Cart Button - Fixed at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-transparent to-white pb-2 sm:pb-4 pt-1 sm:pt-2 px-2 sm:px-4">
        <button
          className={`w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs sm:text-sm font-medium py-1 sm:py-2 px-2 sm:px-4 rounded-lg shadow transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2 ${isHovering ? 'opacity-100' : 'opacity-90'}`}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">Add to Cart</span>
          <span className="xs:hidden">Add</span>
        </button>
      </div>
    </div>
  );
};

export default ShopCardItem;
