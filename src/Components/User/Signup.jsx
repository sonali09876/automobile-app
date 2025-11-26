import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userSlice";

// Firebase config — replace with your credentials
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("redirect") || "/profile";

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const staticEmail = "test@gmail.com";
    const staticPassword = "123456";

    if (formData.email !== staticEmail) {
      setError("Email does not match the required email.");
      return;
    }

    if (formData.password !== staticPassword) {
      setError("Password is incorrect.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    dispatch(
      loginUser({
        name: "Test User",
        email: formData.email,
        location: "San Francisco, CA",
        phone: "+1 234 567 8900",
        avatar: "https://i.pravatar.cc/150?img=5",
        bio: "Welcome to your new profile!",
        method: "static",
      })
    );

    navigate(redirectTo);
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          loginUser({
            name: user.displayName || "Google User",
            email: user.email,
            uid: user.uid,
            avatar: user.photoURL || "https://i.pravatar.cc/150?img=2",
            location: "Unknown",
            phone: "N/A",
            bio: "Signed in with Google.",
            method: "google",
          })
        );

        navigate(redirectTo);
      })
      .catch(() => {
        setError("Google sign-in failed. Please try again.");
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-sm"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 dark:text-white">
          Create Your Account
        </h2>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-red-900 dark:text-red-300">
            Error: {error}
          </div>
        )}

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="test@gmail.com"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="123456"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="123456"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Sign Up
        </button>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-red-700 transition mt-4"
        >
          Sign Up with Google
        </button>
      </form>
    </div>
  );
}