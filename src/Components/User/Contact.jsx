import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import httpClient from '../../axios';

const ContactMaster = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');
  const [contactInfo, setContactInfo] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response = await httpClient.get('/info');
        if (response.data.success && response.data.data.length > 0) {
          const info = response.data.data[0];
          setContactInfo([
            { icon: MapPin, title: 'Address', content: info.address },
            {
              icon: Phone,
              title: 'Phone',
              content: info.phoneNumber,
            },
            { icon: Mail, title: 'Email', content: info.email },
          ]);
        }
      } catch (err) {
        console.error('Failed to fetch contact info:', err);
      }
    };
    fetchInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, '')))
      newErrors.phone = 'Phone must be 10 digits';
    if (!formData.subject.trim())
      newErrors.subject = 'Subject is required';
    if (!formData.message.trim())
      newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10)
      newErrors.message = 'Message must be at least 10 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitStatus('error');
      return;
    }

    try {
      const response = await httpClient.post('/contacts', formData);
      if (response.data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        setTimeout(() => setSubmitStatus(''), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 py-14 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-14'>
          <h1 className='text-5xl font-extrabold text-gray-800 drop-shadow-sm mb-4 tracking-tight'>
            Get In Touch
          </h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed'>
            Have questions? We'd love to hear from you. Drop us a
            message and we’ll get back shortly.
          </p>
        </div>

        {/* Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-14'>
          {contactInfo.map((info, idx) => {
            const Icon = info.icon;
            return (
              <div
                key={idx}
                className='bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)] rounded-2xl p-7 
                 text-center hover:scale-105 transition-transform duration-300 border border-gray-100'
              >
                <div
                  className='w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 text-white 
                    rounded-full flex items-center justify-center mx-auto shadow-lg mb-4'
                >
                  <Icon className='w-8 h-8' />
                </div>
                <h3 className='text-xl font-semibold text-gray-800 mb-2'>
                  {info.title}
                </h3>
                <p className='text-gray-700 font-medium'>
                  {info.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* Form */}
        <div className='bg-white shadow-[0_8px_40px_rgba(0,0,0,0.07)] rounded-2xl p-10 border border-gray-100'>
          <h2 className='text-3xl font-bold text-gray-800 mb-6'>
            Send Us a Message
          </h2>

          {submitStatus === 'success' && (
            <div className='mb-6 p-4 bg-green-100 border-2 border-green-300 rounded-lg text-green-900 font-medium shadow-sm'>
              ✓ Thank you! Your message has been successfully sent.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className='mb-6 p-4 bg-red-100 border-2 border-red-300 rounded-lg text-red-900 font-medium shadow-sm'>
              ✗ Something went wrong. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label className='block text-gray-700 font-semibold mb-2'>
                Full Name *
              </label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all bg-gray-50 
                focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none 
                ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Enter your full name'
              />
              {errors.name && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.name}
                </p>
              )}
            </div>

            <div className='grid md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-gray-700 font-semibold mb-2'>
                  Email Address *
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all bg-gray-50
                  focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none
                  ${
                    errors.email
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder='your@email.com'
                />
                {errors.email && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className='block text-gray-700 font-semibold mb-2'>
                  Phone Number *
                </label>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border-2 rounded-xl transition-all bg-gray-50
                  focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none
                  ${
                    errors.phone
                      ? 'border-red-500'
                      : 'border-gray-300'
                  }`}
                  placeholder='1234567890'
                />
                {errors.phone && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className='block text-gray-700 font-semibold mb-2'>
                Subject *
              </label>
              <input
                type='text'
                name='subject'
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all bg-gray-50 
                focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none
                ${
                  errors.subject
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                placeholder='How can we help you?'
              />
              {errors.subject && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label className='block text-gray-700 font-semibold mb-2'>
                Message *
              </label>
              <textarea
                name='message'
                value={formData.message}
                onChange={handleChange}
                rows='5'
                className={`w-full px-4 py-3 border-2 rounded-xl transition-all bg-gray-50 
                focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none resize-none
                ${
                  errors.message
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                placeholder='Write your message here...'
              />
              {errors.message && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type='submit'
              className='w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
              font-semibold py-4 rounded-xl hover:from-blue-700 hover:to-indigo-700 
              transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl'
            >
              <Send className='w-5 h-5' />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactMaster;
