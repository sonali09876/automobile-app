import React, { useState, useEffect, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../axios';
import {
  Upload,
  Car,
  Users,
  Trash2,
  Eye,
  Filter,
  Plus,
  X,
  Edit,
  Download,
  Loader,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Fuel,
  Gauge,
  Calendar,
  Palette,
  Cog,
  IndianRupee,
} from 'lucide-react';

// ✅ Move ProductPopup outside the main component to prevent re-renders
const ProductPopup = ({
  showProductPopup,
  setShowProductPopup,
  productForm,
  handleProductFormChange,
  handleAddProduct,
  handleUpdateProduct,
  uploading,
  isEditMode,
  currentEditingId,
}) => {
  if (!showProductPopup) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <div className='bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0'>
          <h3 className='text-xl font-bold flex items-center gap-2'>
            <Plus size={24} />
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button
            onClick={() => setShowProductPopup(false)}
            className='hover:bg-blue-700 p-2 rounded-full transition'
            disabled={uploading}
          >
            <X size={24} />
          </button>
        </div>

        <div className='p-6 space-y-4'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Product Name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='productName'
                value={productForm.productName}
                onChange={handleProductFormChange}
                className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                placeholder='Enter product name'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Brand <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='brand'
                value={productForm.brand}
                onChange={handleProductFormChange}
                className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                placeholder='Enter brand'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Model <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                name='model'
                value={productForm.model}
                onChange={handleProductFormChange}
                className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                placeholder='Enter model'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Year
              </label>
              <input
                type='number'
                name='year'
                value={productForm.year}
                onChange={handleProductFormChange}
                className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                placeholder='Enter year'
                min='1900'
                max='2030'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Price
              </label>
              <input
                type='number'
                name='price'
                value={productForm.price}
                onChange={handleProductFormChange}
                className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                placeholder='Enter price'
                min='0'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Color
              </label>
              <input
                type='text'
                name='color'
                value={productForm.color}
                onChange={handleProductFormChange}
                className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                placeholder='Enter color'
              />
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Fuel Type
              </label>
              <select
                name='fuelType'
                value={productForm.fuelType}
                onChange={handleProductFormChange}
                className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
              >
                <option value=''>Select fuel type</option>
                <option value='Petrol'>Petrol</option>
                <option value='Diesel'>Diesel</option>
                <option value='Electric'>Electric</option>
                <option value='Hybrid'>Hybrid</option>
                <option value='CNG'>CNG</option>
                <option value='LPG'>LPG</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Transmission
              </label>
              <select
                name='transmission'
                value={productForm.transmission}
                onChange={handleProductFormChange}
                className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
              >
                <option value=''>Select transmission</option>
                <option value='Manual'>Manual</option>
                <option value='Automatic'>Automatic</option>
                <option value='Semi-Automatic'>Semi-Automatic</option>
              </select>
            </div>

            <div className='md:col-span-2'>
              <label className='block text-sm font-semibold text-gray-700 mb-2'>
                Mileage
              </label>
              <input
                type='number'
                name='mileage'
                value={productForm.mileage}
                onChange={handleProductFormChange}
                className='w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
                placeholder='Enter mileage'
                min='0'
                step='0.1'
              />
            </div>
          </div>

          <div className='flex gap-3 pt-4'>
            <button
              onClick={
                isEditMode ? handleUpdateProduct : handleAddProduct
              }
              disabled={uploading}
              className='flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2'
            >
              {uploading ? (
                <Loader className='animate-spin' size={20} />
              ) : (
                <Plus size={20} />
              )}
              {uploading
                ? isEditMode
                  ? 'Updating...'
                  : 'Adding...'
                : isEditMode
                ? 'Update Product'
                : 'Add Product'}
            </button>
            <button
              onClick={() => setShowProductPopup(false)}
              disabled={uploading}
              className='flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold transition'
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ImportData() {
  const [view, setView] = useState('admin');
  const [automobiles, setAutomobiles] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProductPopup, setShowProductPopup] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  // ✅ Edit functionality state
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState(null);

  // ✅ Pagination state
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  // ✅ FIXED: Proper useState for productForm
  const [productForm, setProductForm] = useState({
    productName: '',
    brand: '',
    model: '',
    year: '',
    price: '',
    color: '',
    fuelType: '',
    transmission: '',
    mileage: '',
  });
 const navigate = useNavigate();
  useEffect(() => {
    loadDataFromAPI();
  }, [pagination.page, pagination.limit]);

  // Load data from backend API with pagination
  const loadDataFromAPI = async () => {
    try {
      setLoading(true);
      const response = await httpClient.get(`/vehicles`, {
        params: {
          page: pagination.page,
          limit: pagination.limit,
        },
      });

      setAutomobiles(response.data.data || []);
      setFilteredData(response.data.data || []);

      // ✅ Update pagination from backend response
      if (response.data.pagination) {
        setPagination((prev) => ({
          ...prev,
          ...response.data.pagination,
        }));
      }
    } catch (error) {
      console.error('Error loading data from API:', error);
      setApiMessage('Error loading data from server');
      // Fallback to local storage if API fails
      loadDataFromLocal();
    } finally {
      setLoading(false);
    }
  };

  // Fallback to local storage
  const loadDataFromLocal = async () => {
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

  // Save data to local storage (fallback)
  const saveDataToLocal = async (data) => {
    try {
      await window.storage.set(
        'automobile-data',
        JSON.stringify(data)
      );
    } catch (error) {
      console.error('Error saving data locally:', error);
    }
  };

  // ✅ Pagination handlers
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  const handleLimitChange = (newLimit) => {
    setPagination((prev) => ({
      ...prev,
      limit: parseInt(newLimit),
      page: 1, // Reset to first page when changing limit
    }));
  };

  // Excel Upload with API
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);
    setApiMessage('');

    const formData = new FormData();
    formData.append('excelFile', file);

    try {
      const response = await httpClient.post(
        `/vehicles/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      if (response.data.success) {
        setApiMessage(
          `✅ ${response.data.message} - Processed: ${response.data.summary.successfullyProcessed}, Failed: ${response.data.summary.failedRecords}`
        );

        // Reload data from server and reset to first page
        setPagination((prev) => ({ ...prev, page: 1 }));
        await loadDataFromAPI();

        // Show errors if any
        if (response.data.errors && response.data.errors.length > 0) {
          const errorMessages = response.data.errors
            .map((err) => `Row ${err.row}: ${err.error}`)
            .join('\n');
          alert(`Some records failed:\n${errorMessages}`);
        }
      } else {
        setApiMessage(`❌ ${response.data.message}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Upload failed';
      setApiMessage(`❌ ${errorMessage}`);

      // Fallback: Process file locally
      processFileLocally(file);
    } finally {
      setUploading(false);
      setUploadProgress(0);
      // Clear file input
      e.target.value = '';
    }
  };

  // Fallback local file processing
  const processFileLocally = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const workbook = XLSX.read(event.target.result, {
          type: 'binary',
        });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const newData = [...automobiles, ...jsonData];
        setAutomobiles(newData);
        setFilteredData(newData);
        saveDataToLocal(newData);
        setApiMessage(
          `✅ ${jsonData.length} records added locally (fallback mode)`
        );
      } catch (error) {
        setApiMessage(
          `❌ Error reading Excel file: ${error.message}`
        );
      }
    };
    reader.readAsBinaryString(file);
  };

  // ✅ FIXED: Use useCallback for form handler to prevent re-renders
  const handleProductFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // ✅ Reset form function
  const resetForm = () => {
    setProductForm({
      productName: '',
      brand: '',
      model: '',
      year: '',
      price: '',
      color: '',
      fuelType: '',
      transmission: '',
      mileage: '',
    });
    setIsEditMode(false);
    setCurrentEditingId(null);
  };

  // ✅ Open popup for adding new product
  const handleAddNewProduct = () => {
    resetForm();
    setShowProductPopup(true);
  };

  // ✅ Open popup for editing product
  const handleEdit = (vehicle) => {
    setProductForm({
      productName:
        vehicle.productName || vehicle['Product Name'] || '',
      brand: vehicle.brand || vehicle['Brand'] || '',
      model: vehicle.model || vehicle['Model'] || '',
      year: vehicle.year || vehicle['Year'] || '',
      price: vehicle.price || vehicle['Price'] || '',
      color: vehicle.color || vehicle['Color'] || '',
      fuelType: vehicle.fuelType || vehicle['Fuel Type'] || '',
      transmission:
        vehicle.transmission || vehicle['Transmission'] || '',
      mileage: vehicle.mileage || vehicle['Mileage'] || '',
    });
    setIsEditMode(true);
    setCurrentEditingId(vehicle._id);
    setShowProductPopup(true);
  };

  // Add single product via API
  const handleAddProduct = async () => {
    if (
      !productForm.productName ||
      !productForm.brand ||
      !productForm.model
    ) {
      alert('Please fill in Product Name, Brand, and Model');
      return;
    }

    const productData = {
      productName: productForm.productName,
      brand: productForm.brand,
      model: productForm.model,
      year: parseInt(productForm.year) || 2023,
      price: parseFloat(productForm.price) || 0,
      color: productForm.color,
      fuelType: productForm.fuelType,
      transmission: productForm.transmission,
      mileage: parseFloat(productForm.mileage) || 0,
    };

    try {
      setUploading(true);
      const response = await httpClient.post(
        `/vehicles`,
        productData
      );

      if (response.data.success) {
        // Reload data from server and reset to first page
        setPagination((prev) => ({ ...prev, page: 1 }));
        await loadDataFromAPI();
        setApiMessage('✅ Product added successfully!');

        resetForm();
        setShowProductPopup(false);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setApiMessage(
        `❌ Error adding product: ${
          error.response?.data?.message || error.message
        }`
      );

      // Fallback: Add locally
      const newProduct = {
        'Product Name': productForm.productName,
        Brand: productForm.brand,
        Model: productForm.model,
        Year: productForm.year,
        Price: productForm.price,
        Color: productForm.color,
        'Fuel Type': productForm.fuelType,
        Transmission: productForm.transmission,
        Mileage: productForm.mileage,
      };

      const newData = [...automobiles, newProduct];
      setAutomobiles(newData);
      setFilteredData(newData);
      saveDataToLocal(newData);
      setShowProductPopup(false);
      setApiMessage('✅ Product added locally (fallback mode)');
      resetForm();
    } finally {
      setUploading(false);
    }
  };

  // ✅ Update product via API
  const handleUpdateProduct = async () => {
    if (
      !productForm.productName ||
      !productForm.brand ||
      !productForm.model
    ) {
      alert('Please fill in Product Name, Brand, and Model');
      return;
    }

    const productData = {
      productName: productForm.productName,
      brand: productForm.brand,
      model: productForm.model,
      year: parseInt(productForm.year) || 2023,
      price: parseFloat(productForm.price) || 0,
      color: productForm.color,
      fuelType: productForm.fuelType,
      transmission: productForm.transmission,
      mileage: parseFloat(productForm.mileage) || 0,
    };

    try {
      setUploading(true);
      const response = await httpClient.put(
        `/vehicles/${currentEditingId}`,
        productData
      );

      if (response.data.success) {
        await loadDataFromAPI();
        setApiMessage('✅ Product updated successfully!');

        resetForm();
        setShowProductPopup(false);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setApiMessage(
        `❌ Error updating product: ${
          error.response?.data?.message || error.message
        }`
      );

      // Fallback: Update locally
      const updatedData = automobiles.map((item) =>
        item._id === currentEditingId
          ? { ...item, ...productData }
          : item
      );
      setAutomobiles(updatedData);
      setFilteredData(updatedData);
      saveDataToLocal(updatedData);
      setApiMessage('✅ Product updated locally (fallback mode)');
      resetForm();
      setShowProductPopup(false);
    } finally {
      setUploading(false);
    }
  };

  // Delete product via API
  const handleDelete = async (vehicleId) => {
    if (
      !window.confirm('Are you sure you want to delete this record?')
    )
      return;

    try {
      // If we have MongoDB IDs from API, use API delete
      if (vehicleId && typeof vehicleId === 'string') {
        await httpClient.delete(`/vehicles/${vehicleId}`);
        setApiMessage('✅ Record deleted successfully!');
      } else {
        // Fallback: local delete by index
        const newData = automobiles.filter(
          (_, index) => index !== vehicleId
        );
        setAutomobiles(newData);
        setFilteredData(newData);
        saveDataToLocal(newData);
        setApiMessage('✅ Record deleted locally');
      }

      // Reload data - might need to adjust page if last item on page is deleted
      await loadDataFromAPI();
    } catch (error) {
      console.error('Delete error:', error);
      setApiMessage(`❌ Error deleting record: ${error.message}`);
    }
  };

  // Clear all data
  const handleClearAll = async () => {
    if (
      !window.confirm(
        'Delete all data? This will remove all records from the database.'
      )
    )
      return;

    try {
      // Note: You might want to add a bulk delete endpoint in your API
      // For now, we'll clear locally and reload
      setAutomobiles([]);
      setFilteredData([]);
      await window.storage.delete('automobile-data');
      setApiMessage('✅ All local data deleted!');

      // Reload from API to see if server data is still there
      await loadDataFromAPI();
    } catch (error) {
      setApiMessage(`❌ Error clearing data: ${error.message}`);
    }
  };

  // Download sample Excel file
  const downloadExcelSample = () => {
    const sampleData = [
      {
        productName: 'Maruti Swift',
        brand: 'Maruti Suzuki',
        model: 'Swift VXI',
        year: 2023,
        price: 850000,
        color: 'Red',
        fuelType: 'Petrol',
        transmission: 'Manual',
        mileage: 22.0,
      },
      {
        productName: 'Hyundai Creta',
        brand: 'Hyundai',
        model: 'Creta SX',
        year: 2024,
        price: 1450000,
        color: 'White',
        fuelType: 'Diesel',
        transmission: 'Automatic',
        mileage: 18.5,
      },
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Vehicles');
    XLSX.writeFile(wb, 'vehicle_sample_data.xlsx');
  };

  // Search functionality
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredData(automobiles);
    } else {
      const filtered = automobiles.filter((car) =>
        Object.values(car).some((val) =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, automobiles]);

  // ✅ Pagination Component - also moved outside to prevent re-renders
  const PaginationControls = () => (
    <div className='flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 p-4 bg-gray-50 rounded-lg'>
      <div className='flex items-center gap-4'>
        <span className='text-sm text-gray-700'>
          Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
          {Math.min(
            pagination.page * pagination.limit,
            pagination.total
          )}{' '}
          of {pagination.total} entries
        </span>

        <select
          value={pagination.limit}
          onChange={(e) => handleLimitChange(e.target.value)}
          className='px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <option value='5'>5 per page</option>
          <option value='10'>10 per page</option>
          <option value='20'>20 per page</option>
          <option value='50'>50 per page</option>
        </select>
      </div>

      <div className='flex items-center gap-2'>
        <button
          onClick={() => handlePageChange(1)}
          disabled={pagination.page === 1}
          className='p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition'
        >
          <ChevronsLeft size={16} />
        </button>

        <button
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
          className='p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition'
        >
          <ChevronLeft size={16} />
        </button>

        <div className='flex items-center gap-1'>
          {Array.from(
            { length: Math.min(5, pagination.pages) },
            (_, i) => {
              let pageNum;
              if (pagination.pages <= 5) {
                pageNum = i + 1;
              } else if (pagination.page <= 3) {
                pageNum = i + 1;
              } else if (pagination.page >= pagination.pages - 2) {
                pageNum = pagination.pages - 4 + i;
              } else {
                pageNum = pagination.page - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition ${
                    pagination.page === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              );
            }
          )}
        </div>

        <button
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page === pagination.pages}
          className='p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition'
        >
          <ChevronRight size={16} />
        </button>

        <button
          onClick={() => handlePageChange(pagination.pages)}
          disabled={pagination.page === pagination.pages}
          className='p-2 rounded-md border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition'
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  );

  // ✅ Enhanced Card component for each vehicle
  const VehicleCard = ({ vehicle, index }) => {
    const getFuelColor = (fuelType) => {
      const colors = {
        Petrol: 'bg-orange-100 text-orange-800 border-orange-200',
        Diesel: 'bg-blue-100 text-blue-800 border-blue-200',
        Electric: 'bg-green-100 text-green-800 border-green-200',
        Hybrid: 'bg-purple-100 text-purple-800 border-purple-200',
        CNG: 'bg-teal-100 text-teal-800 border-teal-200',
        LPG: 'bg-red-100 text-red-800 border-red-200',
      };
      return (
        colors[fuelType] ||
        'bg-gray-100 text-gray-800 border-gray-200'
      );
    };

    const getTransmissionColor = (transmission) => {
      const colors = {
        Manual: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        Automatic: 'bg-pink-100 text-pink-800 border-pink-200',
        'Semi-Automatic':
          'bg-yellow-100 text-yellow-800 border-yellow-200',
      };
      return (
        colors[transmission] ||
        'bg-gray-100 text-gray-800 border-gray-200'
      );
    };

    return (
      <div className='bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1'>
        {/* Header with gradient background */}
        <div className='bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white'>
          <div className='flex justify-between items-start'>
            <div>
              <h3 className='text-lg font-bold truncate'>
                {vehicle.productName ||
                  vehicle['Product Name'] ||
                  'Unnamed Vehicle'}
              </h3>
              <p className='text-blue-100 text-sm opacity-90'>
                {vehicle.brand || vehicle['Brand'] || 'N/A'} •{' '}
                {vehicle.model || vehicle['Model'] || 'N/A'}
              </p>
            </div>
            <span className='bg-white bg-opacity-20 text-white text-xs font-medium px-2 py-1 rounded-full'>
              #{(pagination.page - 1) * pagination.limit + index + 1}
            </span>
          </div>
        </div>

        {/* Price Badge */}
        <div className='px-4 pt-3'>
          <div className='bg-gradient-to-r from-emerald-500 to-green-600 text-white text-lg font-bold px-3 py-2 rounded-lg text-center'>
            <IndianRupee size={18} className='inline mr-1' />
            {vehicle.price || vehicle['Price']
              ? `${(
                  vehicle.price || vehicle['Price']
                ).toLocaleString()}`
              : 'Price N/A'}
          </div>
        </div>

        {/* Specifications Grid */}
        <div className='p-4'>
          <div className='grid grid-cols-2 gap-3 mb-4'>
            <div className='flex items-center gap-2 text-sm'>
              <Calendar size={16} className='text-gray-500' />
              <div>
                <div className='text-gray-600 text-xs'>Year</div>
                <div className='font-semibold text-gray-800'>
                  {vehicle.year || vehicle['Year'] || 'N/A'}
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2 text-sm'>
              <Palette size={16} className='text-gray-500' />
              <div>
                <div className='text-gray-600 text-xs'>Color</div>
                <div className='font-semibold text-gray-800'>
                  {vehicle.color || vehicle['Color'] || 'N/A'}
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2 text-sm'>
              <Fuel size={16} className='text-gray-500' />
              <div>
                <div className='text-gray-600 text-xs'>Fuel</div>
                <div className='font-semibold text-gray-800'>
                  {vehicle.fuelType || vehicle['Fuel Type'] || 'N/A'}
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2 text-sm'>
              <Cog size={16} className='text-gray-500' />
              <div>
                <div className='text-gray-600 text-xs'>
                  Transmission
                </div>
                <div className='font-semibold text-gray-800'>
                  {vehicle.transmission ||
                    vehicle['Transmission'] ||
                    'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Mileage */}
          <div className='bg-gray-50 rounded-lg p-3 mb-4'>
            <div className='flex items-center justify-center gap-2'>
              <Gauge size={18} className='text-blue-600' />
              <span className='text-sm font-semibold text-gray-700'>
                Mileage:
              </span>
              <span className='text-lg font-bold text-blue-700'>
                {vehicle.mileage || vehicle['Mileage']
                  ? `${vehicle.mileage || vehicle['Mileage']} km/l`
                  : 'N/A'}
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className='flex flex-wrap gap-2 mb-4'>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full border ${getFuelColor(
                vehicle.fuelType || vehicle['Fuel Type']
              )}`}
            >
              {vehicle.fuelType || vehicle['Fuel Type'] || 'Fuel'}
            </span>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full border ${getTransmissionColor(
                vehicle.transmission || vehicle['Transmission']
              )}`}
            >
              {vehicle.transmission ||
                vehicle['Transmission'] ||
                'Transmission'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className='flex gap-2 pt-3 border-t border-gray-200'>
        {/* ...existing Edit and Delete buttons... */}

        <button
          type='button'
          onClick={() => navigate(`/vehicles/${vehicle._id || index}`)}
          className='flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition-all duration-200'
        >
          <Eye size={16} />
          View Details
        </button>
      </div>
    </div>
      </div>
    );
  };

  const AdminPanel = () => (
    <div className='space-y-6'>
      {/* API Status Message */}
      {apiMessage && (
        <div
          className={`p-4 rounded-lg ${
            apiMessage.includes('✅')
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          {apiMessage}
        </div>
      )}

      <div className='bg-white p-6 rounded-xl shadow-md border border-gray-200'>
        <div className='flex justify-between items-center mb-6'>
          <h3 className='text-2xl font-bold text-gray-800 flex items-center gap-3'>
            <div className='bg-blue-100 p-2 rounded-lg'>
              <Car size={28} className='text-blue-600' />
            </div>
            <div>
              Vehicle Inventory
              <div className='text-sm font-normal text-gray-600 mt-1'>
                {pagination.total} records found
              </div>
            </div>
            {loading && <Loader className='animate-spin' size={20} />}
          </h3>
        </div>

        {loading ? (
          <div className='text-center py-12'>
            <Loader className='animate-spin mx-auto mb-4' size={40} />
            <p className='text-gray-600'>
              Loading data from server...
            </p>
          </div>
        ) : automobiles.length === 0 ? (
          <div className='text-center py-12 text-gray-500'>
            <Car size={64} className='mx-auto mb-4 opacity-30' />
            <p className='text-lg font-semibold'>
              No vehicles available
            </p>
            <p className='text-sm mt-2'>
              Upload Excel file or add vehicle manually to get started
            </p>
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {automobiles.map((car, index) => (
                <VehicleCard
                  key={car._id || index}
                  vehicle={car}
                  index={index}
                />
              ))}
            </div>

            {/* ✅ Pagination Controls */}
            <PaginationControls />
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6'>
      <div className='max-w-7xl mx-auto'>
        {view === 'admin' ? <AdminPanel /> : ''}
      </div>

      {/* ✅ Use the external ProductPopup component */}
      <ProductPopup
        showProductPopup={showProductPopup}
        setShowProductPopup={setShowProductPopup}
        productForm={productForm}
        handleProductFormChange={handleProductFormChange}
        handleAddProduct={handleAddProduct}
        handleUpdateProduct={handleUpdateProduct}
        uploading={uploading}
        isEditMode={isEditMode}
        currentEditingId={currentEditingId}
      />
    </div>
  );
}
