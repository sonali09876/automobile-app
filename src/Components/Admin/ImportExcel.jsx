import React, { useState, useEffect, useCallback, useRef } from 'react';
import * as XLSX from 'xlsx';
import httpClient from '../../axios';
import { useNavigate } from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
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
  ChevronsRight,
  ChevronsLeft,
   Image,
  Crop,
  RotateCw,
  ZoomIn,
  ZoomOut,
  ImageIcon,
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
  onSelectFile,
  imageSrc,
  setImageSrc,
  crop,
  setCrop,
  
  setCompletedCrop,
  zoom,
  setZoom,
  imgRef,
  onImageLoad,
  applyCrop,
}) => {
  if (!showProductPopup) return null;


   return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Car size={28} />
            {isEditMode ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h2>
          <button
            onClick={() => setShowProductPopup(false)}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
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

          {/* Image upload + crop */}
          <div className='mt-4 space-y-3'>
            <label className='block text-sm font-semibold text-gray-700 mb-1'>
              Vehicle Image
            </label>

            <div className='flex items-center gap-3'>
              <label className='inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer text-sm font-medium text-gray-800 border border-dashed border-gray-300'>
                <ImageIcon size={18} />
                <span>Select image</span>
                <input
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={onSelectFile}
                />
              </label>

              {productForm.image && (
                <div className='flex items-center gap-2'>
                  <img
                    src={productForm.image}
                    // alt='Preview'
                    className='w-16 h-16 rounded-md object-cover border'
                  />
                  {/* <button
                    type='button'
                    onClick={() =>
                      setProductForm((prev) => ({ ...prev, image: '' }))
                    }
                    className='text-xs text-red-600 hover:underline'
                  >
                    Remove
                  </button> */}
                </div>
              )}
            </div>

            {imageSrc && (
              <div className='mt-3 border rounded-lg p-3 bg-gray-50'>
                <div className='flex items-center justify-between mb-2'>
                  <div className='flex items-center gap-2 text-sm font-medium text-gray-700'>
                    <Crop size={16} />
                    <span>Crop Image</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <button
                      type='button'
                      onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                      className='p-1 rounded-md border text-gray-600 hover:bg-white'
                    >
                      <ZoomOut size={14} />
                    </button>
                    <button
                      type='button'
                      onClick={() => setZoom((z) => Math.min(3, z + 0.1))}
                      className='p-1 rounded-md border text-gray-600 hover:bg-white'
                    >
                      <ZoomIn size={14} />
                    </button>
                    <button
                      type='button'
                      onClick={() => {
                        setCrop(undefined);
                        setCompletedCrop(null);
                      }}
                      className='p-1 rounded-md border text-gray-600 hover:bg-white'
                    >
                      <RotateCw size={14} />
                    </button>
                  </div>
                </div>

                <div className='max-h-[300px] overflow-auto bg-black/5 flex items-center justify-center'>
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={4 / 3}
                    keepSelection
                  >
                    <img
                      ref={imgRef}
                      alt='Crop source'
                      src={imageSrc}
                      style={{ transform: `scale(${zoom})` }}
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
                </div>

                <div className='flex justify-end gap-2 mt-3'>
                  <button
                    type='button'
                    onClick={() => {
                      setImageSrc(null);
                      setCrop(undefined);
                      setCompletedCrop(null);
                      setZoom(1);
                    }}
                    className='px-3 py-1.5 text-xs rounded-md border text-gray-700 hover:bg-white'
                  >
                    Cancel Crop
                  </button>
                  <button
                    type='button'
                    onClick={applyCrop}
                    className='px-3 py-1.5 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700'
                  >
                    Apply Crop
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className='flex gap-3 pt-4'>
            <button
              onClick={isEditMode ? handleUpdateProduct : handleAddProduct}
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


export default function AutomobileApp() {
  const navigate = useNavigate();
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
  productName: "",
  brand: "",
  model: "",
  year: "",
  price: "",
  color: "",
  fuelType: "",
  transmission: "",
  mileage: "",
  image: "",
});
const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 50, aspect: 4 / 3 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [zoom, setZoom] = useState(1);
  const imgRef = useRef(null);
  useEffect(() => {
    loadDataFromAPI();
  }, [pagination.page, pagination.limit]);
 // Image selection handler
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result);
        setZoom(1);
        setCrop({ unit: '%', width: 50, aspect: 4 / 3 });
        setCompletedCrop(null);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };
const applyCrop = async () => {
    if (!completedCrop || !imgRef.current) return;
    
    const canvas = document.createElement('canvas');
    const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
    const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
    
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(
      imgRef.current,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );
    
    const base64 = canvas.toDataURL('image/jpeg');
    setProductForm(prev => ({ ...prev, image: base64 }));
    setImageSrc(null);
    setCrop({ unit: '%', width: 50, aspect: 4 / 3 });
    setCompletedCrop(null);
    setZoom(1);
  };

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
      // loadDataFromLocal();
    } finally {
      setLoading(false);
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
        // saveDataToLocal(newData);
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
      image:'',
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
       image: productForm.image || "",
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
       image: productForm.image || "",
    };

    try {
      setUploading(true);
      const response = await httpClient.post(
        `/vehicles`,
        productData
      );

      if (response.data) {
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
        image: productForm.image,
      };

      const newData = [...automobiles, newProduct];
      setAutomobiles(newData);
      setFilteredData(newData);
      // saveDataToLocal(newData);
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
       image: productForm.image || "",
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
      // saveDataToLocal(updatedData);
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
        // saveDataToLocal(newData);
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
      await httpClient.delete('/vehicles');
      setApiMessage('✅ All data deleted!');

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

  const AdminPanel = () => (
    <div className='space-y-6'>
      <div className='bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg shadow-lg'>
        <h2 className='text-2xl font-bold mb-2 flex items-center gap-2'>
          <Upload size={28} />
          Product Master
        </h2>
        <p className='opacity-90'>
          Upload Excel data or add products manually
        </p>
      </div>

      {/* API Status Message */}
      {apiMessage && (
        <div
          className={`p-4 rounded-lg ${
            apiMessage.includes('✅')
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {apiMessage}
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div className='bg-white p-6 rounded-lg shadow-md border-2 border-dashed border-blue-300'>
          <label className='flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition p-6 rounded-lg'>
            {uploading ? (
              <div className='text-center'>
                <Loader
                  className='animate-spin mx-auto mb-3'
                  size={40}
                />
                <div className='w-full bg-gray-200 rounded-full h-2.5'>
                  <div
                    className='bg-blue-600 h-2.5 rounded-full transition-all duration-300'
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <span className='text-sm text-gray-600 mt-2'>
                  Uploading... {uploadProgress}%
                </span>
              </div>
            ) : (
              <>
                <Upload size={40} className='text-blue-600 mb-3' />
                <span className='text-lg font-semibold text-gray-700 mb-2'>
                  Upload Excel File
                </span>
                <span className='text-sm text-gray-500'>
                  (.xlsx, .xls, .csv format)
                </span>
                <input
                  type='file'
                  accept='.xlsx,.xls,.csv'
                  onChange={handleFileUpload}
                  className='hidden'
                  disabled={uploading}
                />
              </>
            )}
          </label>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center gap-4'>
          <button
            onClick={handleAddNewProduct}
            disabled={uploading}
            className='w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-4 rounded-lg font-semibold transition flex items-center justify-center gap-2'
          >
            <Plus size={24} />
            Add Product
          </button>
          <button
            onClick={downloadExcelSample}
            className='w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-semibold transition flex items-center justify-center gap-2'
          >
            <Download size={20} />
            Download Sample Excel
          </button>
        </div>
      </div>

      <div className='bg-white p-6 rounded-lg shadow-md'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-xl font-bold text-gray-800 flex items-center gap-2'>
            <Car size={24} />
            Database Records ({pagination.total})
            {loading && <Loader className='animate-spin' size={20} />}
          </h3>
          {automobiles.length > 0 && (
            <button
              onClick={handleClearAll}
              className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition'
            >
              <Trash2 size={18} />
              Clear All
            </button>
          )}
        </div>

        {loading ? (
          <div className='text-center py-12'>
            <Loader className='animate-spin mx-auto mb-4' size={40} />
            <p>Loading data from server...</p>
          </div>
        ) : automobiles.length === 0 ? (
          <div className='text-center py-12 text-gray-500'>
            <Car size={64} className='mx-auto mb-4 opacity-30' />
            <p className='text-lg'>No data available</p>
            <p className='text-sm'>
              Upload Excel file or add product manually
            </p>
          </div>
        ) : (
          <>
            <div className='overflow-x-auto'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='border p-3 text-left'>#</th>
                    {Object.keys(automobiles[0]).map((key) => (
                      <th key={key} className='border p-3 text-left'>
                        {key}
                      </th>
                    ))}
                    <th className='border p-3 text-left'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {automobiles.map((car, index) => (
                    <tr
                      key={car._id || index}
                      className='hover:bg-gray-50'
                    >
                      <td className='border p-3'>
                        {(pagination.page - 1) * pagination.limit +
                          index +
                          1}
                      </td>
                      {Object.values(car).map((value, i) => (
                        <td key={i} className='border p-3'>
                          {value}
                        </td>
                      ))}
                      <td className='border p-3'>
                        <div className='flex gap-2'>
                          <button
                            onClick={() => handleEdit(car)}
                            className='bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1'
                          >
                            <Edit size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(car._id || index)
                            }
                            className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1'
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ✅ Pagination Controls */}
            <PaginationControls />
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className='min-h-screen bg-gray-100 p-6'>
      <div className='max-w-7xl mx-auto'>
        {/* View toggle buttons */}
        <div className='flex gap-4 mb-6'>
          <button
            onClick={() => setView('admin')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
              view === 'admin'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Users size={20} />
            Admin Panel
          </button>
        </div>

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
