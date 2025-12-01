import React, { useState, useEffect } from "react";
import { User, CheckCircle, AlertCircle, Trash2, Reply } from "lucide-react";
import httpClient from "../../axios";

const ContactMaster = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [replyBox, setReplyBox] = useState(null);
  const [replyText, setReplyText] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5;

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await httpClient.get("/contacts");
      setContacts(response.data.data);
    } catch (error) {
      setError("Failed to load contacts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  // Add contact
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await httpClient.post("/contacts", formData);

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      fetchContacts();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Error adding contact.");
    } finally {
      setLoading(false);
    }
  };

  // Reply to contact
  const handleReply = async (contactId) => {
    if (!replyText.trim()) return;

    try {
      await httpClient.post(`/contacts/reply/${contactId}`, {
        reply: replyText,
      });

      alert("Reply sent successfully!");
      setReplyBox(null);
      setReplyText("");
    } catch (error) {
      alert("Failed to send reply.");
    }
  };

  // Delete contact
  const handleDelete = async (contactId) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    try {
      await httpClient.delete(`/contacts/${contactId}`);
      setContacts(contacts.filter((c) => c.id !== contactId));
    } catch (error) {
      alert("Failed to delete contact.");
    }
  };

  // Calculate displayed contacts for current page
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = contacts.slice(indexOfFirstContact, indexOfLastContact);

  // Calculate total pages
  const totalPages = Math.ceil(contacts.length / contactsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
        Contact Messages (Admin)
      </h1>

      {error && (
        <div className="flex items-start bg-red-100 text-red-700 px-4 py-3 mb-4 rounded">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-start bg-green-100 text-green-700 px-4 py-3 mb-4 rounded">
          <CheckCircle className="w-5 h-5 mr-2" />
          Contact added successfully!
        </div>
      )}

      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <User size={20} className="text-blue-600" />
          Add Contact
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border p-2 rounded"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="border p-2 rounded"
            required
          />

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="border p-2 rounded col-span-3"
            required
          />

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            className="border p-2 rounded col-span-3"
            rows="4"
            required
          />

          <button
            type="submit"
            className="col-span-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add Contact"}
          </button>
        </form>
      </div>

      {contacts.length > 0 ? (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            All Contacts ({contacts.length})
          </h2>

          <div className="space-y-4">
            {currentContacts.map((contact) => (
              <div
                key={contact.id}
                className="border p-4 rounded-lg bg-gray-50 shadow-sm"
              >
                <p>
                  <strong>Name:</strong> {contact.name}
                </p>
                <p>
                  <strong>Email:</strong> {contact.email}
                </p>
                <p>
                  <strong>Phone:</strong> {contact.phone}
                </p>
                <p>
                  <strong>Subject:</strong> {contact.subject}
                </p>
                <p className="mt-2">
                  <strong>Message:</strong> {contact.message}
                </p>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() =>
                      setReplyBox(replyBox === contact.id ? null : contact.id)
                    }
                    className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    <Reply size={16} /> Reply
                  </button>

                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 rounded"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>

                {/* Reply Box */}
                {replyBox === contact.id && (
                  <div className="mt-3">
                    <textarea
                      rows="3"
                      className="w-full border p-2 rounded"
                      placeholder="Type your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <button
                      onClick={() => handleReply(contact.id)}
                      className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Send Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No contacts found.</p>
      )}
    </div>
  );
};

export default ContactMaster;
