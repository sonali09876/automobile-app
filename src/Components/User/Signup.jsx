import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import httpClient from "../../axios";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "user",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await httpClient.post("/auth/signup",
        {
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
          role: formData.role,
        },
      
      );

      console.log("Signup Response:", response.data);

      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            Error: {error}
          </div>
        )}

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="+1234567890"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="password123"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Hidden Role */}
        <input type="hidden" name="role" value="user" />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Go to Login */}
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
