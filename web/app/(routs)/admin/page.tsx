"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
const Page: React.FC = () => {
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    description: "",
    price: "",
    stock: 0,
    category: "", 
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle File Upload to ImgBB
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=6a8466740fcaddd043809735e2a8631e`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!data.success) throw new Error("Image upload failed");

      setFormData((prevData) => ({
        ...prevData,
        image: data.data.url, // Save the uploaded image URL
      }));
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload image.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Form Input Changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Form Submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit form");

      // Reset form after successful submission
      setFormData({ image: "", title: "", description: "", price: "" ,stock:0 ,category: "" });
    } catch (error) {
      console.error("Error:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {error && <div className="mb-4 text-red-500">{error}</div>}

          {/* Image Upload Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
            />
            {formData.image && (
              <Image  src={formData.image}  alt="Uploaded" className="mt-2 rounded w-full h-32 object-cover" width={100} height={100} />
            )}
          </div>

          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              name="title"
              type="text"
              placeholder="Product title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              name="description"
              placeholder="Product description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Price Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              name="price"
              type="text"
              placeholder="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              name="category"
              type="text"
              placeholder="Catogory"
              value={formData.category}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
            <input
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              name="stock"
              type="number"
              placeholder="Stocks"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>


          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
