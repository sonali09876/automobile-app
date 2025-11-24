import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function ProductFeatures() {
  const [products] = useState([
    {
      productName: "Premium Engine Oil",
      category: "Oils & Fluids",
      sku: "ENG-001",
      price: "₹799",
      description: "High quality synthetic oil for superior engine protection.",
      image: "https://images.unsplash.com/photo-1601924638867-3ec2d63d8490?w=600",
      imagePreview: null,
    },
    {
      productName: "Ceramic Brake Pads",
      category: "Spare Parts",
      sku: "BRK-002",
      price: "₹1,299",
      description: "Durable ceramic brake pads with excellent stopping power.",
      image: "https://images.unsplash.com/photo-1620294075783-7b5a9b3a7c33?w=600",
      imagePreview: null,
    },
    {
      productName: "All-Season Tyre",
      category: "Vehicles",
      sku: "TYR-003",
      price: "₹3,200",
      description: "Premium all-weather tyre with exceptional grip and durability.",
      image: "https://images.unsplash.com/photo-1607860108855-852e30a3c811?w=600",
      imagePreview: null,
    },
    {
      productName: "Car Cleaning Kit",
      category: "Accessories",
      sku: "ACC-004",
      price: "₹699",
      description: "Complete kit for sparkling clean interiors and exteriors.",
      image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=600",
      imagePreview: null,
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  // Handler to select a product to view details
  function handleViewDetails(product) {
    setSelectedProduct(product);
  }

  // Handler to go back to the product list
  function handleBack() {
    setSelectedProduct(null);
  }

  if (selectedProduct) {
    // Detailed view of selected product
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <button
          className="mb-6 text-blue-700 font-semibold underline"
          onClick={handleBack}
        >
          &larr; Back to Products
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 w-full md:w-1/2 h-64 md:h-auto bg-gray-200 rounded-2xl overflow-hidden">
            {selectedProduct.image || selectedProduct.imagePreview ? (
              <img
                src={selectedProduct.image || selectedProduct.imagePreview}
                alt={selectedProduct.productName || "Product image"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Image Available
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">
              {selectedProduct.productName || "Product Name Unavailable"}
            </h2>
            <p className="text-lg mb-2 text-gray-600">
              Category: {selectedProduct.category || "Category Unavailable"}
            </p>
            <p className="mb-2 text-gray-500">SKU: {selectedProduct.sku || "N/A"}</p>
            <p className="text-2xl font-bold text-blue-600 mb-6">
              {selectedProduct.price || "-"}
            </p>
            <p className="text-gray-700">{selectedProduct.description || "No description provided."}</p>
          </div>
        </div>
      </div>
    );
  }

  // Default view: grid of product cards
  return (
    <div className="bg-gray-50 py-16 px-6 md:px-12 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl font-extrabold mb-10 text-gray-900">
        Product Features
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden cursor-pointer group"
          >
            <div className="relative h-52 overflow-hidden rounded-t-3xl bg-gray-200">
              {product.image || product.imagePreview ? (
                <img
                  src={product.image || product.imagePreview}
                  alt={product.productName || "Product image"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                  No Image Available
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 truncate">
                {product.productName || "Product Name Unavailable"}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {product.category || "Category Unavailable"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                SKU: {product.sku || "N/A"}
              </p>
              <p className="text-gray-700 mt-3 text-sm">
                {product.description || "No description provided."}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-blue-600 font-bold text-xl">
                  {product.price || "-"}
                </span>
                <button
                  className="inline-flex items-center gap-1 text-blue-700 font-semibold text-sm hover:underline focus:outline-none"
                  onClick={() => handleViewDetails(product)}
                >
                  View Details <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
