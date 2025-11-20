import React, { useState } from "react";
import { ShoppingCart, Star, Plus, X, Upload } from "lucide-react";

const initialProducts = [
  {
    id: 1,
    name: "Car Engine Oil",
    price: "₹799",
    category: "Lubricants",
    sku: "ENG-OIL-001",
    image: "https://images.unsplash.com/photo-1601924638867-3ec2d63d8490?w=600",
    description: "High performance engine oil suitable for all car models.",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Brake Pads",
    price: "₹1299",
    category: "Braking System",
    sku: "BRK-PAD-002",
    image: "https://images.unsplash.com/photo-1620294075783-7b5a9b3a7c33?w=600",
    description: "Long-lasting brake pads with superior stopping power.",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Car Battery",
    price: "₹4500",
    category: "Electrical",
    sku: "BAT-PWR-003",
    image: "https://images.unsplash.com/photo-1613401452089-1996a19f6c2b?w=600",
    description: "Heavy-duty battery with long backup and reliability.",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Car Tyre",
    price: "₹3200",
    category: "Tyres & Wheels",
    sku: "TYR-STD-004",
    image: "https://images.unsplash.com/photo-1607860108855-852e30a3c811?w=600",
    description: "Durable tyre with excellent road grip.",
    rating: 4.7,
  },
];

export default function ProductList() {
  const [products, setProducts] = useState(initialProducts);
  const [hoveredId, setHoveredId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    sku: "",
    price: "",
    description: "",
    image: null,
    imagePreview: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: products.length + 1,
      name: formData.productName,
      price: `₹${formData.price}`,
      category: formData.category,
      sku: formData.sku,
      image:
        formData.imagePreview ||
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600",
      description: formData.description,
      rating: 4.5,
    };

    setProducts((prev) => [...prev, newProduct]);
    setFormData({
      productName: "",
      category: "",
      sku: "",
      price: "",
      description: "",
      image: null,
      imagePreview: null,
    });
    setShowAddForm(false);
  };

  const handleCancel = () => {
    setFormData({
      productName: "",
      category: "",
      sku: "",
      price: "",
      description: "",
      image: null,
      imagePreview: null,
    });
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      {/* Page Header */}
      <header className="relative z-10">
        <div className="relative bg-gradient-to-r from-orange-500 via-red-600 to-pink-600 py-12 md:py-16 text-center shadow-xl">
          <div className="absolute inset-0 bg-black/20" />
          <h1 className="relative text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg mb-3">
            Automobile Products
          </h1>
          <p className="relative text-xl md:text-2xl text-orange-100 max-w-2xl mx-auto drop-shadow font-medium">
            Premium quality parts for your vehicle
          </p>
        </div>
      </header>

      {/* Add Product Button */}
      <div className="flex flex-col items-end max-w-7xl mx-auto w-full px-4 mt-8">
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-orange-600 to-red-500 hover:from-red-600 hover:to-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <Plus size={20} />
          Add New Product
        </button>
      </div>

      {/* Add Product Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[60] p-4 backdrop-blur">
          <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg animate-fadeIn">
            <div className="sticky top-0 bg-gradient-to-r from-orange-600 to-red-600 p-6 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-extrabold text-white">Add New Product</h2>
              <button
                onClick={handleCancel}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div>
                <label className="block text-white font-semibold mb-2">Product Name *</label>
                <input
                  type="text"
                  name="productName"
                  onChange={handleInputChange}
                  value={formData.productName}
                  required
                  placeholder="Enter product name"
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Category *</label>
                <input
                  type="text"
                  name="category"
                  onChange={handleInputChange}
                  value={formData.category}
                  required
                  placeholder="e.g., Lubricants, Braking System"
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">SKU *</label>
                <input
                  type="text"
                  name="sku"
                  onChange={handleInputChange}
                  value={formData.sku}
                  required
                  placeholder="e.g., ENG-OIL-001"
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  onChange={handleInputChange}
                  value={formData.price}
                  min="0"
                  required
                  placeholder="Enter price"
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Description *</label>
                <textarea
                  name="description"
                  onChange={handleInputChange}
                  value={formData.description}
                  required
                  rows="3"
                  placeholder="Enter product description"
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Product Image</label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 bg-slate-700 text-white rounded-lg px-4 py-3 cursor-pointer hover:bg-slate-600 transition-colors flex items-center justify-center gap-2">
                    <Upload size={20} />
                    <span>
                      {formData.image ? formData.image.name : "Choose Image"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
                {formData.imagePreview && (
                  <div className="mt-4">
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-orange-400 shadow"
                    />
                  </div>
                )}
              </div>
              <div className="flex gap-4 pt-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-600 to-red-500 hover:from-red-700 hover:to-orange-500 text-white font-semibold py-3 rounded-lg transition-all"
                >
                  Add Product
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-10 md:py-16">
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="group relative bg-slate-800 rounded-3xl overflow-hidden shadow-xl ring-1 ring-slate-700 hover:ring-orange-400 hover:shadow-orange-400/20 transition-all duration-300"
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Product Image Section */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-800/30 to-transparent opacity-40"></div>
                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-300 bg-gradient-to-b from-orange-500/80 to-pink-500/80 ${
                    hoveredId === p.id ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <button className="bg-white/90 text-orange-600 px-6 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition-transform">
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>
              </div>
              {/* Card Content */}
              <div className="p-6 flex flex-col gap-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-extrabold text-xl text-white group-hover:text-orange-400 truncate">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-1 bg-orange-600 px-2 py-1 rounded-full">
                    <Star size={16} fill="white" className="text-white" />
                    <span className="text-white text-sm font-bold">{p.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-slate-700 text-orange-300 rounded px-2 py-1 text-xs font-semibold">
                    {p.category}
                  </span>
                  <span className="bg-gray-600 text-white/80 rounded px-2 py-1 text-xs">
                    {p.sku}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-4">{p.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl md:text-3xl font-extrabold text-orange-400">
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
      </main>

      {/* Footer CTA */}
      <footer className="max-w-7xl mx-auto w-full px-4 pb-14 text-center mt-auto">
        <div className="bg-gradient-to-r from-orange-600 to-pink-500 rounded-2xl p-10 md:p-16 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow">
            Need Help Finding Parts?
          </h2>
          <p className="text-orange-100 mb-8 text-lg font-medium">
            Our experts are ready to assist you with your automobile needs
          </p>
          <button className="bg-white text-orange-600 px-8 py-4 rounded-full font-extrabold text-lg hover:bg-orange-100 transition-colors shadow-lg">
            Contact Us Today
          </button>
        </div>
      </footer>
    </div>
  );
}

/* Tailwind CSS keyframes (put this in your tailwind.config.js for fadeIn) */
// theme: {
//   extend: {
//     animation: {
//       fadeIn: "fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//     },
//     keyframes: {
//       fadeIn: {
//         "0%": { opacity: 0, transform: "scale(0.95)" },
//         "100%": { opacity: 1, transform: "scale(1)" },
//       },
//     },
//   },
// },
