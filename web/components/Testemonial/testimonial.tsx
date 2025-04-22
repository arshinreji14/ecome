import Image from "next/image";
import React from "react";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    review: "Amazing products and great customer service! Highly recommend.",
    image: "/images/user1.jpg"
  },
  {
    id: 2,
    name: "Sarah Smith",
    review: "Fast delivery and quality items. Will shop again!",
    image: "/images/user2.jpg"
  },
  {
    id: 3,
    name: "Michael Lee",
    review: "Loved the experience! The shop exceeded my expectations.",
    image: "/images/user3.jpg"
  }
];

const Testimonials = () => {
  return (
    <div className="min-h-screen  py-12">
      <h2 className="text-4xl font-bold text-center text-white mb-8">What Our Customers Say</h2>
      
      <div className="flex flex-wrap justify-center gap-6 px-6">
        {testimonials.map(({ id, name, review, image }) => (
          <div key={id} className="bg-white p-6 rounded-xl shadow-lg max-w-sm text-center">
            <Image width={100} height={100} 
              src={image} 
              alt={name} 
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-500"
            />
            <h3 className="text-xl font-semibold text-black">{name}</h3>
            <p className="text-gray-600 mt-2">{review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
