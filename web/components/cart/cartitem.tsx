
import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/zustant/useStore';
interface CartItemProps {
  value: {
    _id: string;
    image: string;
    title: string;
    description: string;
    stock: number;
    quantity: number;
    price: number;
  };
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ value, onQuantityChange,onRemove }) => {
  const [quantity, setQuantity] = useState<number>(value.quantity ||1);
const[total,setTotal]=useState<number>(0)

  const handleRemove = async () => {
    if (!value._id) {
      console.error("Invalid ID: The value object does not have a valid id.");
      return;
    } 
    
    try {
      const response = await axios.delete(`http://localhost:4000/api/carts/${value._id}`);
      console.log('API response:', response.data);
      onRemove(value._id);
    } catch (error) {
      console.error('Error removing from cart (API):', error);
     
    }
  };
   
  const updateQuantity = async (newQty: number) => {
    if (newQty < 1) return;
    setQuantity(newQty); 
   
  };
  useEffect(() => {
    const calculateTotal = () => {
      const totalPrice = value.price * quantity;
      setTotal(totalPrice);
    };
  
    calculateTotal();
  
    // Notify parent of change
    onQuantityChange(value._id, quantity);
  
    // Update in backend
    const handleUpdate = async () => {
      
      if (value._id) {
        try {
          await axios.put(`http://localhost:4000/api/carts/${value._id}`, {
            quantity,
          });
        
          console.log("Quantity updated in DB");
        } catch (error) {
          console.error("Error updating quantity:", error);
        }
      } else {
        console.error("Invalid ID: Cannot update");
      }
    };
  
    handleUpdate();
  }, [quantity]);
  

  return (
    <tr className={`w-full bg-white  mb-4 flex flex-col sm:flex-row gap-4 border  bg-opacity-10 backdrop-blur-md rounded-xl p-6 shadow-inner space-y-4 transition-all duration-300 hover:shadow-md `}>
      {/* Image */}
      <td className="flex-shrink-0">
        <div className="relative w-24 h-24 rounded-lg overflow-hidden shadow-sm bg-gray-50">
          <Image 
            src={`${value.image}.jpg`} 
            alt={value.title} 
            fill 
            className="object-cover hover:scale-105 transition-transform duration-300" 
          />
        </div>
      </td>
      
      {/* Content Container */}
      <td className="flex flex-1 flex-col sm:flex-row">
        {/* Title + Description */}
        <div className="flex-1 pr-4 mb-2 sm:mb-0">
          <h3 className="text-lg font-medium text-white line-clamp-1">{value.title}</h3>
          <p className="text-sm text-white mt-1 line-clamp-2">{value.description}</p>
          <p className="text-lg font-bold text-white mt-2">₹{total}</p>
        </div>
        
        {/* Actions Container */}
        <div className="flex flex-row sm:flex-col justify-between sm:justify-center items-center gap-4 mt-2 sm:mt-0">
          {/* Quantity Controls */}
          <div className="flex items-center bg-gray-50 rounded-full py-1 px-2 border border-gray-200">
            <button
              onClick={() => updateQuantity(quantity - 1)}
              disabled={quantity <= 1}
              className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${quantity <= 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-200'} 
                transition-colors`}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            
            <span className="w-8 text-center font-medium text-gray-800">{quantity}</span>
            
            <button
              onClick={() => updateQuantity(quantity + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          
          {/* Remove Button */}
          <button
            onClick={handleRemove}
            className="group p-2 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-all"
            aria-label="Remove item"
          >
            <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CartItem;