import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendorDashboard = () => {
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchVendorData() {
      try {
        // Fetch the vendor details.
        // NOTE: Replace with your API endpoint and add necessary headers or authentication if required.
        const response = await axios.get('/api/vendor/details');
        setVendor(response.data.vendor);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Failed to fetch vendor data:", error);
      }
    }

    fetchVendorData();
  }, []);

  return (
    <div className="p-8 bg-gray-200 min-h-screen">
      <div className="container mx-auto">
        <h2 className="text-3xl mb-4 text-center font-bold text-blue-800">Vendor Dashboard</h2>

        {vendor && (
          <div className="bg-white rounded-lg shadow-md mb-6 p-6">
            <h3 className="text-xl mb-3 text-blue-800 font-bold">Vendor Details:</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-2">
                <strong>Name:</strong> {vendor.name}
              </div>
              <div className="mb-2">
                <strong>Company:</strong> {vendor.company}
              </div>
              <div className="mb-2">
                <strong>Email:</strong> {vendor.email}
              </div>
              <div className="mb-2">
                <strong>Phone Number:</strong> {vendor.phone_number}
              </div>
            </div>
          </div>
        )}

        <h3 className="text-2xl mb-4 text-blue-800 font-bold">Products:</h3>
        {products.length > 0 ? (
          <ul className="space-y-4">
            {products.map(product => (
              <li key={product.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-bold text-blue-800">{product.prod_name}</h4>
                    <p className="text-gray-600">${product.price}</p>
                  </div>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                    Add to Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No products found</p>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
