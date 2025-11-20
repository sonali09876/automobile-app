import React, { useState } from "react";
import { ShoppingCart, Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Car Engine Oil",
    price: "₹799",
    image: "https://images.unsplash.com/photo-1601924638867-3ec2d63d8490?w=600",
    description: "High performance engine oil suitable for all car models.",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Brake Pads",
    price: "₹1299",
    image: "https://images.unsplash.com/photo-1620294075783-7b5a9b3a7c33?w=600",
    description: "Long-lasting brake pads with superior stopping power.",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Car Battery",
    price: "₹4500",
    image: "https://images.unsplash.com/photo-1613401452089-1996a19f6c2b?w=600",
    description: "Heavy-duty battery with long backup and reliability.",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Car Tyre",
    price: "₹3200",
    image: "https://images.unsplash.com/photo-1607860108855-852e30a3c811?w=600",
    description: "Durable tyre with excellent road grip.",
    rating: 4.7,
  },
];

export default function ProductList() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* PAGE HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-red-600 py-16 px-4">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Automobile Products
          </h1>
          <p className="text-xl text-orange-100 max-w-2xl mx-auto">
            Premium quality parts for your vehicle
          </p>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="group relative bg-slate-800 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2"
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-slate-700">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                
                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-orange-600/90 flex items-center justify-center transition-opacity duration-300 ${
                    hoveredId === p.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold flex items-center gap-2 transform transition-transform hover:scale-105">
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-1 bg-orange-600 px-2 py-1 rounded-full">
                    <Star size={14} fill="white" className="text-white" />
                    <span className="text-white text-sm font-semibold">
                      {p.rating}
                    </span>
                  </div>
                </div>
                
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  {p.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-orange-400">
                    {p.price}
                  </span>
                  <button className="bg-slate-700 hover:bg-orange-600 text-white p-3 rounded-full transition-colors duration-300">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="max-w-7xl mx-auto px-4 pb-16 text-center">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Help Finding Parts?
          </h2>
          <p className="text-orange-100 mb-8 text-lg">
            Our experts are ready to assist you with your automobile needs
          </p>
          <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-50 transition-colors">
            Contact Us Today
          </button>
        </div>
      </div>
    </div>
  );
}