"use client";
import { useEffect, useState } from "react";
import Datas from "@/app/schema/data";
import CartItem from "./cartitem";
import Checkout from "../checkout/checkout";
import Link from "next/link";
import { ArrowBigLeft,} from "lucide-react";
const url=process.env.NEXT_PUBLIC_API_URL
export default function Cartitemlist() {
  const [data, setData] = useState<Datas[]>([]);
  const [showCheckout, setCheckout] = useState(false);
  const handleCheckout = () => setCheckout(true);
  const handleCloseCheckout = () => setCheckout(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${url}/api/carts`);
        const fetchedData = await response.json();
        if (Array.isArray(fetchedData)) {
          setData(fetchedData);
        } else {
          console.error("Fetched data is not an array:", fetchedData);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, []);

  const subtotal = data.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );
  const gst = subtotal * 0.18;
  const deliveryCharge = data.length===0?0: 50;
  const total = subtotal + gst + deliveryCharge;
  const handileQuantityChange = (id: string, newQty: number) => {
    setData(prevData =>
      prevData.map(item =>
        item._id === id ? { ...item, quantity: newQty } : item
      )
    );
  };
  const handleRemoveItem = (id: string) => {
    setData(prevData => prevData.filter(item => item._id !== id));
  };
  return (
    <main className="container mx-auto p-6 lg:p-12 min-h-screen">
      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-20 rounded-lg shadow-lg w-full max-w-xl relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
              onClick={handleCloseCheckout}
            >
              ✖
            </button>
            <Checkout value={total} />
          </div>
        </div>
      )}

      {/* Shopping Cart Header */}
      <h1 className="text-3xl font-bold text-white text-center mb-8">Shopping Cart</h1>

      {/* Cart Items Table */}
      <div className="md:flex md:justify-center mb-8">
        <div className="overflow-hidden  bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-10 md:w-3/4 w-full">
          <table className="w-full text-sm md:text-base">
            <tbody className="divide-y">
              {data.map((item) => (
                <CartItem key={item._id} value={item} onQuantityChange={handileQuantityChange} onRemove={handleRemoveItem} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Price Summary */}
        <div className="md:w-1/4 md:mx-10 flex flex-col items-center space-y-8 p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl mt-4">
          <div className="w-full bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 shadow-inner space-y-4 text-white">
            <h2 className="text-xl font-bold text-gray-200">Price Details</h2>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹ {subtotal.toFixed(0)}</span>
            </div>

            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹ {gst.toFixed(0)}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery Charges</span>
              <span>₹ {deliveryCharge}</span>
            </div>

            <hr className="border-gray-300 opacity-30" />

            <div className="flex justify-between text-2xl font-extrabold text-white pt-2">
              <span>Total</span>
              <span>₹ {total.toFixed(0)}/-</span>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="w-full flex justify-center">
            <button
              onClick={handleCheckout}
              className="flex items-center gap-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition-all duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13l-1.5-7M7 13h10"
                />
              </svg>
              Proceed to Checkout
            </button>
          </div>
        </div>
        
      </div>
      <div className="w-full flex justify-center">
      <ArrowBigLeft/>  <Link href="/home" className="text-white hover:text-blue-400"> Back To Home</Link>
          </div>
    </main>
  );
}
