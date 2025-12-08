import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, CheckCircle, AlertCircle, X } from 'lucide-react';
import httpClient from '../../axios';

function EditModal({ isOpen, onClose, formData, handleChange, handleSubmit, loading }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        <h3 className="text-xl font-semibold mb-4">Edit Info</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                handleChange({ target: { name: 'isActive', value: e.target.checked } })
              }
              className="mr-2"
              id="modal-active"
            />
            <label htmlFor="modal-active" className="text-sm font-medium text-gray-700">
              Active Status
            </label>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminInfoMaster() {
  const [infoList, setInfoList] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    phoneNumber: '',
    address: '',
    isActive: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    fetchInfo();
  }, []);

  const fetchInfo = async () => {
    try {
      setLoading(true);
      const response = await httpClient.get('/info');
      setInfoList(response.data.data || []);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch info:', error);
      setInfoList([]);
      setError('Failed to load info data.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'isActive') {
      setFormData({ ...formData, [name]: !!value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (error) setError(null);
  };

  const handleSubmit = async () => {
    setError(null);
    setSuccess(false);
    setModalLoading(true);
    try {
      if (isEditing && editingId) {
        await httpClient.put(`/info/${editingId}`, formData);
        setSuccess(true);
        setIsEditing(false);
        setEditingId(null);
        setIsModalOpen(false);
      } else {
        const response = await httpClient.post('/info', formData);
        setInfoList((prev) => [...prev, response.data]);
        setSuccess(true);
      }
      setFormData({ email: '', phoneNumber: '', address: '', isActive: true });
      fetchInfo();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to submit info:', error);
      setError('Failed to submit info.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      email: item.email,
      phoneNumber: item.phoneNumber || item.phone || '',
      address: item.address,
      isActive: item.isActive,
    });
    setIsEditing(true);
    setEditingId(item._id);
    setIsModalOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this info?')) return;

    try {
      await httpClient.delete(`/info/${id}`);
      fetchInfo();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to delete info:', err);
      setError('Failed to delete info.');
    }
  };

  const handleToggleActive = async (item) => {
    try {
      await httpClient.put(`/info/${item._id}`, {
        email: item.email,
        phoneNumber: item.phoneNumber || item.phone || '',
        address: item.address,
        isActive: !item.isActive,
      });
      setInfoList(
        infoList.map((i) =>
          i._id === item._id ? { ...i, isActive: !i.isActive } : i
        )
      );
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to toggle status:', err);
      setError('Failed to update status.');
    }
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({ email: '', phoneNumber: '', address: '', isActive: true });
    setIsModalOpen(false);
  };
  if (loading) {
    return (
      <div className="p-4 sm:p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-800 flex items-center gap-2">
          Info Master
        </h1>
        
        {error && (
          <div className="flex items-start bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 mb-4 sm:mb-6 rounded-r-lg shadow-sm animate-pulse">
            <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm sm:text-base">{error}</span>
          </div>
        )}
        {success && (
          <div className="flex items-start bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 mb-4 sm:mb-6 rounded-r-lg shadow-sm animate-pulse">
            <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm sm:text-base">
              {isEditing ? 'Info updated successfully!' : 'Info added successfully!'}
            </span>
          </div>
        )}

       
        {!isModalOpen && (
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg mb-6 border border-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2 text-gray-800">
              <>
                <span className="text-blue-600">➕</span> Add New Info
              </>
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="contact@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="9876543210"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                    transition-all text-sm sm:text-base"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Plot 12, MG Road"
                    value={formData.address}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-700">Active Status</span>
                </label>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                Add Info
              </button>
            </div>
          </div>
        )}

        {/* Info Table / Cards */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">All Admin Info</h2>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
              {infoList.length} {infoList.length === 1 ? 'Entry' : 'Entries'}
            </span>
          </div>

          {Array.isArray(infoList) && infoList.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <th className="p-4 text-left font-semibold text-gray-700 text-sm">Email</th>
                      <th className="p-4 text-left font-semibold text-gray-700 text-sm">Mobile</th>
                      <th className="p-4 text-left font-semibold text-gray-700 text-sm">Address</th>
                      <th className="p-4 text-center font-semibold text-gray-700 text-sm w-20">Status</th>
                      <th className="p-4 text-center font-semibold text-gray-700 text-sm w-40">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {infoList.map((item, index) => (
                      <tr
                        key={item._id}
                        className={`border-b hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        }`}
                      >
                        <td className="p-4 text-sm">{item.email}</td>
                        <td className="p-4 text-sm">{item.phoneNumber || item.phone || 'N/A'}</td>
                        <td className="p-4 text-sm max-w-xs truncate" title={item.address}>
                          {item.address}
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {item.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-xs transition-all hover:shadow-md"
                              title="Edit"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => handleToggleActive(item)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:shadow-md ${
                                item.isActive
                                  ? 'bg-red-500 hover:bg-red-600 text-white'
                                  : 'bg-green-500 hover:bg-green-600 text-white'
                              }`}
                              title={item.isActive ? 'Deactivate' : 'Activate'}
                            >
                              {item.isActive ? 'Off' : 'On'}
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-xs transition-all hover:shadow-md"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden space-y-4">
                {infoList.map((item) => (
                  <div
                    key={item._id}
                    className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 text-sm mb-1">{item.email}</div>
                        <div className="text-gray-600 text-sm">{item.phoneNumber || item.phone || 'N/A'}</div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                          item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {item.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="text-gray-700 text-sm mb-3 line-clamp-2" title={item.address}>
                      📍 {item.address}
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex-1 flex items-center justify-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                      <button
                        onClick={() => handleToggleActive(item)}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          item.isActive
                            ? 'bg-red-500 hover:bg-red-600 text-white'
                            : 'bg-green-500 hover:bg-green-600 text-white'
                        }`}
                      >
                        {item.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-500 text-lg mb-2">No info found</p>
              <p className="text-gray-400 text-sm">Add your first entry using the form above</p>
            </div>
          )}
        </div>
      </div>

      <EditModal
        isOpen={isModalOpen}
        onClose={handleCancelEdit}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={modalLoading}
      />
    </div>
  );
}
