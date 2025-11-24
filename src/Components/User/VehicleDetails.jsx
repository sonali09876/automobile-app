import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import httpClient from '../../axios';
import { ArrowLeft, Calendar, Droplet, Gauge, Palette, DollarSign, Car, Settings } from 'lucide-react';

export default function VehicleDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await httpClient.get(`/vehicles/${id}`);
        setVehicle(res.data.data || null);
      } catch (err) {
        setVehicle(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Car className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Vehicle Not Found</h2>
          <p className="text-gray-600 mb-6">The vehicle you're looking for doesn't exist or has been removed.</p>
          <Link to="/vehicles" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Vehicles
          </Link>
        </div>
      </div>
    );
  }

  const specs = [
    { icon: Car, label: 'Brand', value: vehicle.brand },
    { icon: Settings, label: 'Model', value: vehicle.model },
    { icon: Calendar, label: 'Year', value: vehicle.year },
    { icon: DollarSign, label: 'Price', value: vehicle.price },
    { icon: Palette, label: 'Color', value: vehicle.color },
    { icon: Droplet, label: 'Fuel Type', value: vehicle.fuelType },
    { icon: Settings, label: 'Transmission', value: vehicle.transmission },
    { icon: Gauge, label: 'Mileage', value: `${vehicle.mileage} km/l` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
     
       

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 sm:p-10">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {vehicle.productName || 'Unnamed Vehicle'}
                </h1>
                <p className="text-blue-100 text-lg">
                  {vehicle.brand} {vehicle.model} • {vehicle.year}
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/30">
                <p className="text-blue-100 text-sm font-medium">Price</p>
                <p className="text-white text-2xl font-bold">{vehicle.price}</p>
              </div>
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="p-8 sm:p-10">
            {/* <h2 className="text-2xl font-bold text-gray-800 mb-6">Specifications</h2> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {specs.map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 rounded-lg p-2 group-hover:bg-blue-200 transition-colors">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-500 font-medium mb-1">{spec.label}</p>
                        <p className="text-gray-900 font-semibold text-lg truncate">{spec.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            
          </div>
        </div>

        
      </div>
    </div>
  );
}