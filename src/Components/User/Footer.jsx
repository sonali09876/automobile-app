import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row justify-between gap-10">
        
        <div className="md:w-1/4">
          <h3 className="text-2xl font-bold text-orange-500 mb-4">AutoDrive</h3>
          <p className="text-gray-400">
            Trusted partner for quality vehicles and parts. Drive your dreams with us!
          </p>
          <div className="flex gap-4 mt-5 text-orange-500 text-lg">
            <a href="#" aria-label="Facebook" className="hover:text-white transition"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter" className="hover:text-white transition"><FaTwitter /></a>
            <a href="#" aria-label="Instagram" className="hover:text-white transition"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white transition"><FaLinkedinIn /></a>
          </div>
        </div>

        <div className="md:w-1/4">
          <h4 className="text-xl font-semibold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-orange-500 transition">Home</a></li>
            <li><a href="/importdata" className="hover:text-orange-500 transition">Directory</a></li>
           
            <li><a href="/contact" className="hover:text-orange-500 transition">Contact</a></li>
          </ul>
        </div>

        <div className="md:w-1/4">
          <h4 className="text-xl font-semibold mb-4 text-white">Contact Us</h4>
          <p><span className="font-semibold">Address:</span> 123 Drive St., Motor City, USA</p>
          <p><span className="font-semibold">Phone:</span> +1 (234) 567-8901</p>
          <p><span className="font-semibold">Email:</span> support@autodrive.com</p>
        </div>

      </div>
      <div className="text-center text-gray-500 mt-10 border-t border-gray-800 pt-6 text-sm">
        &copy; {new Date().getFullYear()} AutoDrive. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
