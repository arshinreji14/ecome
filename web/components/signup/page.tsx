"use client";
import React, { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter(); 
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const { confirmPassword, ...payload } = formData;
    console.log("Sending data:", JSON.stringify(payload));

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:4000/api/register', payload);
      console.log('API response:', response.data); 
      toast.success("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white shadow-2xl rounded-2xl p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 flex items-center justify-center">
            <UserPlus className="mr-2 text-green-600" />
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">Welcome to Spicera</p>
        </div>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center">{success}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label htmlFor="username" className="sr-only">Username</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleInputChange}
              className="appearance-none rounded-md block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Username"
            />
          </div>
          <div className="relative">
            <label htmlFor="username" className="sr-only">Name</label>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400"/>
            </div>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="appearance-none rounded-md block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Name"
            />
          </div>

          {[
            { id: "email", type: "email", icon: Mail, placeholder: "Email Address" },
            { id: "phone", type: "tel", icon: Phone, placeholder: "Phone Number" },
          ].map(({ id, type, icon, placeholder }) => (
            <div key={id} className="relative">
              <label htmlFor={id} className="sr-only">{placeholder}</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {React.createElement(icon, { className: "h-5 w-5 text-gray-400" })}
              </div>
              <input
                id={id}
                name={id}
                type={type}
                required
                value={formData[id as keyof typeof formData] as string}
                onChange={handleInputChange}
                className="appearance-none rounded-md block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder={placeholder}
              />
            </div>
          ))}

          {[
            {
              id: "password",
              show: showPassword,
              setShow: setShowPassword,
              placeholder: "Password",
            },
            {
              id: "confirmPassword",
              show: showConfirmPassword,
              setShow: setShowConfirmPassword,
              placeholder: "Confirm Password",
            },
          ].map(({ id, show, setShow, placeholder }) => (
            <div key={id} className="relative">
              <label htmlFor={id} className="sr-only">{placeholder}</label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id={id}
                name={id}
                type={show ? "text" : "password"}
                required
                value={formData[id as keyof typeof formData] as string}
                onChange={handleInputChange}
                className="appearance-none rounded-md block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder={placeholder}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          ))}

          <div className="flex items-center">
            <input
              id="termsAccepted"
              name="termsAccepted"
              type="checkbox"
              checked={formData.termsAccepted}
              onChange={handleInputChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-900">
              I agree to the{" "}
              <Link href="/terms" className="text-green-600 hover:text-green-500">
                Terms and Conditions
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <div className="mt-6 text-center">
<button className="text-sm text-gray-600 hover:text-gray-900">
            Already have an account? </button>
          <Link href="/" className="text-green-600 hover:text-green-500 font-medium"> Login </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
