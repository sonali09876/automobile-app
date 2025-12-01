import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, CheckCircle, AlertCircle, Save, X } from 'lucide-react';
import httpClient from '../../axios';

export default function AdminInfoMaster() {
  const [infoList, setInfoList] = useState([]);
  const [formData, setFormData] = useState({ 
    email: '', 
    phoneNumber: '', 
    address: '', 
    isActive: true 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        const response = await httpClient.get('/info');
        console.log('API response:', response.data);
        setInfoList(response.data.data || []);
      } catch (error) {
        console.error('Failed to fetch info:', error);
        setInfoList([]);
        setError('Failed to load info data.');
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  // Handle input change for main form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  // Handle edit input change
  const handleEditChange = (e, field) => {
    setInfoList(infoList.map(item => 
      item.id === editingId 
        ? { ...item, [field]: e.target.value }
        : item
    ));
  };

  // Handle toggle active status
  const handleToggleActive = (id) => {
    setInfoList(infoList.map(item => 
      item.id === id 
        ? { ...item, isActive: !item.isActive }
        : item
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (isEditing && editingId) {
      // Update existing info
      try {
        await httpClient.put(`/info/${editingId}`, formData);
        setIsEditing(false);
        setEditingId(null);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        // Refresh data
        const response = await httpClient.get('/info');
        setInfoList(response.data.data || []);
      } catch (error) {
        console.error('Failed to update info:', error);
        setError('Failed to update info.');
      }
    } else {
      // Add new info
      try {
        const response = await httpClient.post('/info', formData);
        setInfoList([...infoList, response.data]);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        // Reset form
        setFormData({ email: '', phoneNumber: '', address: '', isActive: true });
      } catch (error) {
        console.error('Failed to add info:', error);
        setError('Failed to add info.');
      }
    }
  };

  // Handle edit
  const handleEdit = (item) => {
    setFormData({
      email: item.email,
      phoneNumber: item.phoneNumber || item.phone || '',
      address: item.address,
      isActive: item.isActive
    });
    setIsEditing(true);
    setEditingId(item.id);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this info?')) return;

    try {
      await httpClient.delete(`/info/${id}`);
      setInfoList(infoList.filter((item) => item.id !== id));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to delete info:', error);
      setError('Failed to delete info.');
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({ email: '', phoneNumber: '', address: '', isActive: true });
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Info Master</h1>

      {/* Error & Success Messages */}
      {error && (
        <div className="flex items-start bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-6 rounded-lg">
          <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-start bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-6 rounded-lg">
          <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
          {isEditing ? 'Info updated successfully!' : 'Info added successfully!'}
        </div>
      )}

      {/* Add/Edit Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          {isEditing ? 'Edit Info' : 'Add New Info'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Mobile Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <div className="flex items-center space-x-3 md:col-span-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
            </label>
            {isEditing && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                <X size={16} /> Cancel
              </button>
            )}
          </div>
          <button
            type="submit"
            className="col-span-1 md:col-span-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
          >
            {isEditing ? 'Update Info' : 'Add Info'}
          </button>
        </form>
      </div>

      {/* Info Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-6">All Admin Info ({infoList.length})</h2>
        {Array.isArray(infoList) && infoList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-4 border-b font-semibold text-gray-700">Email</th>
                  <th className="p-4 border-b font-semibold text-gray-700">Mobile</th>
                  <th className="p-4 border-b font-semibold text-gray-700">Address</th>
                  <th className="p-4 border-b font-semibold text-gray-700 w-20">Status</th>
                  <th className="p-4 border-b font-semibold text-gray-700 text-center w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {infoList.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 border-b">{item.email}</td>
                    <td className="p-4 border-b">
                      {item.phoneNumber || item.phone || 'N/A'}
                    </td>
                    <td className="p-4 border-b max-w-xs truncate" title={item.address}>
                      {item.address}
                    </td>
                    <td className="p-4 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4 border-b text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleToggleActive(item.id)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                            item.isActive
                              ? 'bg-red-500 hover:bg-red-600 text-white'
                              : 'bg-green-500 hover:bg-green-600 text-white'
                          }`}
                          title={item.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {item.isActive ? 'Off' : 'On'}
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No info found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
