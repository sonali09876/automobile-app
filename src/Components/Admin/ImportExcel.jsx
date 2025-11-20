import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Upload, Car, Users, Trash2, Eye, Filter, Plus, X, Edit } from 'lucide-react';

export default function AutomobileApp() {
  const [view, setView] = useState('admin');
  const [automobiles, setAutomobiles] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProductPopup, setShowProductPopup] = useState(false);
  const [productForm, setProductForm] = useState({
    productName: '',
    brand: '',
    model: '',
    year: '',
    price: '',
    color: '',
    fuelType: '',
    transmission: '',
    mileage: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await window.storage.get('automobile-data');
      if (result && result.value) {
        const data = JSON.parse(result.value);
        setAutomobiles(data);
        setFilteredData(data);
      }
    } catch (error) {
      console.log('No existing data found');
    }
  };

  const saveData = async (data) => {
    try {
      await window.storage.set('automobile-data', JSON.stringify(data));
    } catch (error) {
      alert('Error saving data: ' + error.message);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const newData = [...automobiles, ...jsonData];
        setAutomobiles(newData);
        setFilteredData(newData);
        saveData(newData);
        alert(`${jsonData.length} records added successfully!`);
      } catch (error) {
        alert('Error reading Excel file: ' + error.message);
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleDelete = (index) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      const newData = automobiles.filter((_, i) => i !== index);
      setAutomobiles(newData);
      setFilteredData(newData);
      saveData(newData);
    }
  };

  const handleClearAll = async () => {
    if (window.confirm('Delete all data?')) {
      setAutomobiles([]);
      setFilteredData([]);
      try {
        await window.storage.delete('automobile-data');
        alert('All data deleted!');
      } catch (error) {
        alert('Error deleting data: ' + error.message);
      }
    }
  };

  const handleProductFormChange = (e) => {
    setProductForm({
      ...productForm,
      [e.target.name]: e.target.value
    });
  };

  const handleAddProduct = () => {
    if (!productForm.productName || !productForm.brand || !productForm.model) {
      alert('Please fill in Product Name, Brand, and Model');
      return;
    }

    const newProduct = {
      'Product Name': productForm.productName,
      'Brand': productForm.brand,
      'Model': productForm.model,
      'Year': productForm.year,
      'Price': productForm.price,
      'Color': productForm.color,
      'Fuel Type': productForm.fuelType,
      'Transmission': productForm.transmission,
      'Mileage': productForm.mileage
    };

    const newData = [...automobiles, newProduct];
    setAutomobiles(newData);
    setFilteredData(newData);
    saveData(newData);
    
    setProductForm({
      productName: '',
      brand: '',
      model: '',
      year: '',
      price: '',
      color: '',
      fuelType: '',
      transmission: '',
      mileage: ''
    });
    setShowProductPopup(false);
    alert('Product added successfully!');
  };

  const downloadExcelSample = () => {
    const sampleData = [
      {
        'Product Name': 'Maruti Swift',
        'Brand': 'Maruti Suzuki',
        'Model': 'Swift VXI',
        'Year': '2023',
        'Price': '850000',
        'Color': 'Red',
        'Fuel Type': 'Petrol',
        'Transmission': 'Manual',
        'Mileage': '22 kmpl'
      },
      {
        'Product Name': 'Hyundai Creta',
        'Brand': 'Hyundai',
        'Model': 'Creta SX',
        'Year': '2024',
        'Price': '1450000',
        'Color': 'White',
        'Fuel Type': 'Diesel',
        'Transmission': 'Automatic',
        'Mileage': '18 kmpl'
      },
      {
        'Product Name': 'Tata Nexon',
        'Brand': 'Tata Motors',
        'Model': 'Nexon XZ+',
        'Year': '2023',
        'Price': '1250000',
        'Color': 'Blue',
        'Fuel Type': 'Petrol',
        'Transmission': 'AMT',
        'Mileage': '20 kmpl'
      },
      {
        'Product Name': 'Honda City',
        'Brand': 'Honda',
        'Model': 'City VX',
        'Year': '2024',
        'Price': '1550000',
        'Color': 'Silver',
        'Fuel Type': 'Petrol',
        'Transmission': 'CVT',
        'Mileage': '19 kmpl'
      },
      {
        'Product Name': 'Mahindra XUV700',
        'Brand': 'Mahindra',
        'Model': 'XUV700 AX7',
        'Year': '2023',
        'Price': '2100000',
        'Color': 'Black',
        'Fuel Type': 'Diesel',
        'Transmission': 'Automatic',
        'Mileage': '16 kmpl'
      }
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Automobiles');
    XLSX.writeFile(wb, 'automobile_sample_data.xlsx');
  };

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredData(automobiles);
    } else {
      const filtered = automobiles.filter(car =>
        Object.values(car).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, automobiles]);

  const ProductPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Plus size={24} />
            Add New Product
          </h3>
          <button
            onClick={() => setShowProductPopup(false)}
            className="hover:bg-blue-700 p-2 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="productName"
                value={productForm.productName}
                onChange={handleProductFormChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Brand <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="brand"
                value={productForm.brand}
                onChange={handleProductFormChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter brand"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Model <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="model"
                value={productForm.model}
                onChange={handleProductFormChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter model"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Year
              </label>
              <input
                type="text"
                name="year"
                value={productForm.year}
                onChange={handleProductFormChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter year"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={productForm.price}
                onChange={handleProductFormChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter price"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Color
              </label>
              <input
                type="text"
                name="color"
                value={productForm.color}
                onChange={handleProductFormChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter color"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fuel Type
              </label>
              <select
                name="fuelType"
                value={productForm.fuelType}
                onChange={handleProductFormChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select fuel type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Transmission
              </label>
              <select
                name="transmission"
                value={productForm.transmission}
                onChange={handleProductFormChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select transmission</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
                <option value="AMT">AMT</option>
                <option value="CVT">CVT</option>
                <option value="DCT">DCT</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mileage
              </label>
              <input
                type="text"
                name="mileage"
                value={productForm.mileage}
                onChange={handleProductFormChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Enter mileage (e.g., 20 kmpl)"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleAddProduct}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <Plus size={20} />
              Add Product
            </button>
            <button
              onClick={() => setShowProductPopup(false)}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AdminPanel = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Upload size={28} />
         Product Master
        </h2>
        <p className="opacity-90">Upload Excel data or add products manually</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-dashed border-blue-300">
          <label className="flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition p-6 rounded-lg">
            <Upload size={40} className="text-blue-600 mb-3" />
            <span className="text-lg font-semibold text-gray-700 mb-2">Upload Excel File</span>
            <span className="text-sm text-gray-500">(.xlsx, .xls , .csv format)</span>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center gap-4">
          <button
            onClick={() => setShowProductPopup(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold transition flex items-center justify-center gap-2"
          >
            <Plus size={24} />
            Add Product
          </button>
          <button
            onClick={downloadExcelSample}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-semibold transition"
          >
            Download Sample Excel
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Car size={24} />
            Database Records ({automobiles.length})
          </h3>
          {automobiles.length > 0 && (
            <button
              onClick={handleClearAll}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <Trash2 size={18} />
              Clear All
            </button>
          )}
        </div>

        {automobiles.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Car size={64} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">No data available</p>
            <p className="text-sm">Upload Excel file or add product manually</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-3 text-left">#</th>
                  {Object.keys(automobiles[0]).map((key) => (
                    <th key={key} className="border p-3 text-left">{key}</th>
                  ))}
                  <th className="border p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {automobiles.map((car, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-3">{index + 1}</td>
                    {Object.values(car).map((value, i) => (
                      <td key={i} className="border p-3">{value}</td>
                    ))}
                    <td className="border p-3">
                      <button
                        onClick={() => handleDelete(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const UserPanel = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Eye size={28} />
          User Panel - Automobile Database
        </h2>
        <p className="opacity-90">View all automobile data</p>
      </div>

      {automobiles.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search in any field..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Car size={24} />
            Automobile Data ({filteredData.length})
          </h3>
        </div>

        {filteredData.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Car size={64} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">
              {automobiles.length === 0 ? 'No data available' : 'No results found'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-100">
                  <th className="border p-3 text-left">#</th>
                  {Object.keys(filteredData[0]).map((key) => (
                    <th key={key} className="border p-3 text-left">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((car, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border p-3">{index + 1}</td>
                    {Object.values(car).map((value, i) => (
                      <td key={i} className="border p-3">{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {view === 'admin' ? <AdminPanel /> : <UserPanel />}
      </div>

      {showProductPopup && <ProductPopup />}
    </div>
  );
}