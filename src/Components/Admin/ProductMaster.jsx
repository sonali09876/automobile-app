import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

const categories = [
  'Engine Parts',
  'Body Parts',
  'Accessories',
  'Electrical',
  'Tires',
];

export default function ProductMaster() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productName: '',
    category: '',
    sku: '',
    price: '',
    description: '',
    image: null,
    imagePreview: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({
          ...form,
          image: file,
          imagePreview: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setForm({
      ...form,
      image: null,
      imagePreview: null,
    });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (
      !form.productName ||
      !form.category ||
      !form.sku ||
      !form.price
    ) {
      alert('Please fill all required fields');
      return;
    }
    setProducts([...products, { ...form }]);
    setForm({
      productName: '',
      category: '',
      sku: '',
      price: '',
      description: '',
      image: null,
      imagePreview: null,
    });
  };

  const handleDeleteProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 sm:px-10">
            <h1 className="text-3xl font-bold text-white">Automobile Product Master</h1>
            <p className="text-blue-100 mt-2">Add and manage your automobile products</p>
          </div>

          {/* Form Section */}
          <div className="p-6 sm:p-10">
            <form onSubmit={handleAddProduct} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="productName"
                      value={form.productName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="Enter product name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        SKU <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="sku"
                        value={form.sku}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="SKU-001"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Price (USD) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      rows="4"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                      placeholder="Optional product description"
                    />
                  </div>
                </div>

                {/* Right Column - Image Upload */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Product Image
                    </label>
                    
                    {!form.imagePreview ? (
                      <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-12 h-12 mb-4 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500 font-semibold">
                            Click to upload image
                          </p>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, JPEG (MAX. 5MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    ) : (
                      <div className="relative w-full h-64 border-2 border-gray-300 rounded-lg overflow-hidden group">
                        <img
                          src={form.imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="bg-red-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 hover:bg-red-600"
                          >
                            <X size={24} />
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {form.image && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg flex items-center gap-3">
                        <ImageIcon className="text-blue-600" size={20} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {form.image.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(form.image.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Product List */}
        {products.length > 0 && (
          <div className="mt-8 bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="px-6 py-5 sm:px-10 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Product List</h2>
              <p className="text-gray-600 mt-1">{products.length} product(s) added</p>
            </div>
            
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {products.map((p, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {p.imagePreview ? (
                          <img
                            src={p.imagePreview}
                            alt={p.productName}
                            className="w-16 h-16 object-cover rounded-lg shadow"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                            <ImageIcon className="text-gray-400" size={24} />
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{p.productName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{p.sku}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        ${parseFloat(p.price).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {p.description || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDeleteProduct(index)}
                          className="text-red-600 hover:text-red-800 font-medium text-sm transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden divide-y divide-gray-200">
              {products.map((p, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex gap-4">
                    {p.imagePreview ? (
                      <img
                        src={p.imagePreview}
                        alt={p.productName}
                        className="w-20 h-20 object-cover rounded-lg shadow flex-shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="text-gray-400" size={28} />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{p.productName}</h3>
                      <span className="inline-block px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full mb-2">
                        {p.category}
                      </span>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">SKU:</span> {p.sku}</p>
                        <p><span className="font-medium">Price:</span> ${parseFloat(p.price).toFixed(2)}</p>
                        {p.description && (
                          <p className="text-xs mt-2">{p.description}</p>
                        )}
                      </div>
                      <button
                        onClick={() => handleDeleteProduct(index)}
                        className="mt-3 text-red-600 hover:text-red-800 font-medium text-sm transition"
                      >
                        Delete Product
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}