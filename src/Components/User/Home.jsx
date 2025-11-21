import React, { useState, useEffect } from "react";
import { Car, Wrench, ShoppingCart, Fuel, Star, ChevronRight, Zap, Shield, Clock } from "lucide-react";
import ProductFeatures from "../User/ProductFeatures";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[500px] md:min-h-[600px]">
            {/* Left Content */}
            <div className="px-6 md:px-12 py-12 md:py-24 order-2 lg:order-1">
              <div className="inline-block mb-4 px-4 py-2 bg-white bg-opacity-20 rounded-full text-xs md:text-sm font-semibold backdrop-blur-sm animate-pulse">
                ✨ Trusted by 50,000+ Customers
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                Welcome to <span className="text-yellow-300">AutoWorld</span>
              </h1>
              <p className="text-base md:text-xl text-blue-100 mb-6 md:mb-8 leading-relaxed">
                Your ultimate destination for premium automobile parts, accessories, and expert services.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <a
                  href="/products"
                  className="group bg-white text-blue-700 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold shadow-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Shop Now
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </a>
                {/* <a
                  href="/productlist"
                  className="bg-transparent border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold hover:bg-white hover:text-blue-700 transition-all duration-300 text-center"
                >
                  Our Products
                </a> */}
              </div>
            </div>

            {/* Right Image */}
            <div className="relative px-6 lg:px-0 py-8 md:py-0 order-1 lg:order-2">
              <div className="relative h-64 md:h-96 lg:h-full lg:min-h-[500px] rounded-2xl lg:rounded-none lg:rounded-l-3xl overflow-hidden shadow-2xl">
                {/* Car Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ 
                    backgroundImage: `url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200')`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-transparent"></div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 md:w-32 md:h-32 bg-yellow-300 rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -top-6 -right-6 w-32 h-32 md:w-40 md:h-40 bg-blue-300 rounded-full opacity-20 blur-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Banner */}
      <div className="bg-white border-b border-gray-200 py-4 md:py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="flex items-center justify-center md:justify-start gap-3 p-3 md:p-0">
              <div className="bg-green-100 p-2 md:p-3 rounded-full flex-shrink-0">
                <Zap className="text-green-600" size={20} />
              </div>
              <div>
                <p className="font-bold text-sm md:text-base text-gray-900">Fast Delivery</p>
                <p className="text-xs md:text-sm text-gray-600">2-3 Days Shipping</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3 p-3 md:p-0">
              <div className="bg-blue-100 p-2 md:p-3 rounded-full flex-shrink-0">
                <Shield className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="font-bold text-sm md:text-base text-gray-900">100% Genuine</p>
                <p className="text-xs md:text-sm text-gray-600">Authentic Products</p>
              </div>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-3 p-3 md:p-0">
              <div className="bg-purple-100 p-2 md:p-3 rounded-full flex-shrink-0">
                <Clock className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="font-bold text-sm md:text-base text-gray-900">24/7 Support</p>
                <p className="text-xs md:text-sm text-gray-600">Always Here to Help</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section with Background Pattern */}
      <div className="relative py-16 md:py-20 overflow-hidden">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
          }}
        />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">Browse Categories</h2>
            <p className="text-gray-600 text-base md:text-lg">Find exactly what you need for your vehicle</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {/* Category 1 */}
            <div className="group bg-gradient-to-br from-blue-50 to-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="bg-blue-600 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Car className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-sm md:text-lg mt-3 md:mt-4 text-center text-gray-900">Vehicles</h3>
              <p className="text-xs md:text-sm text-gray-600 text-center mt-1">New & Used</p>
            </div>

            {/* Category 2 */}
            <div className="group bg-gradient-to-br from-orange-50 to-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="bg-orange-600 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Wrench className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-sm md:text-lg mt-3 md:mt-4 text-center text-gray-900">Spare Parts</h3>
              <p className="text-xs md:text-sm text-gray-600 text-center mt-1">OEM Quality</p>
            </div>

            {/* Category 3 */}
            <div className="group bg-gradient-to-br from-purple-50 to-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="bg-purple-600 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <ShoppingCart className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-sm md:text-lg mt-3 md:mt-4 text-center text-gray-900">Accessories</h3>
              <p className="text-xs md:text-sm text-gray-600 text-center mt-1">Premium Range</p>
            </div>

            {/* Category 4 */}
            <div className="group bg-gradient-to-br from-green-50 to-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="bg-green-600 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Fuel className="text-white" size={24} />
              </div>
              <h3 className="font-bold text-sm md:text-lg mt-3 md:mt-4 text-center text-gray-900">Oils & Fluids</h3>
              <p className="text-xs md:text-sm text-gray-600 text-center mt-1">Top Brands</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products with Background */}
      <div className="relative bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3 md:mb-4">Featured Products</h2>
            <p className="text-gray-600 text-base md:text-lg">Hand-picked deals just for you</p>
          </div>

        <ProductFeatures/>
          <div className="text-center mt-8 md:mt-12">
            <a
              href="/products"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold hover:bg-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-sm md:text-base"
            >
              View All Products
              <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}