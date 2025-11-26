import React, { useState, useEffect } from "react";
import { Mail, MapPin, Phone, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../redux/userSlice";

const ProfilePage = () => {
  // Get user data from Redux store
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Local state for edit mode and form data
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  // Sync formData with user on changes to user
  useEffect(() => {
    setFormData(user);
  }, [user]);

  // Show message if no user data (not logged in)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-lg">
          Please sign up or log in to view your profile.
        </p>
      </div>
    );
  }

  // Handle input changes in the form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile: update Redux store and exit edit mode
  const handleSave = () => {
    dispatch(loginUser(formData));
    setIsEditing(false);
  };

  // Cancel editing: reset formData to current user data and exit edit mode
  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
        {!isEditing ? (
          <>
            {/* Profile view */}
            <div className="flex flex-col items-center text-center mb-6">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-600 mt-2">{user.bio}</p>
            </div>

            <div className="space-y-4 mt-8">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail size={20} className="text-blue-600" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Phone size={20} className="text-blue-600" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin size={20} className="text-blue-600" />
                <span>{user.location}</span>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full mt-8 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <>
            {/* Edit mode */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Cancel editing"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <label className="block">
                <span className="text-sm text-gray-600">Avatar URL</span>
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-600">Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-600">Bio</span>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-600">Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-600">Phone</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <label className="block">
                <span className="text-sm text-gray-600">Location</span>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </label>

              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
