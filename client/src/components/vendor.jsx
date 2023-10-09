import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../MyContext";

const VendorDashboard = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [editingVendor, setEditingVendor] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    // Fetch vendors when the component mounts or when isUpdated changes
    fetch(`https://ecomart-x0ur.onrender.com/vendor`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.log(res);
          throw new Error("Response was not ok");
        }
        return res.json();
      })
      .then((response) => {
        // console.log(response); // Handle the successful response here
        setVendors(response);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [isUpdated]);

  // Filter vendors based on the search term
  useEffect(() => {
    const results = vendors.filter((vendor) =>
      `${vendor.first_name} ${vendor.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredVendors(results);
  }, [searchTerm, vendors]);

  //update  vendor detail
  const updateVendor = async () => {
    try {
      if (!editingVendor) return;

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.put(
        `https://ecomart-x0ur.onrender.com/vendor`,
        editingVendor,
        { headers: headers }
      );

      if (response.data) {
        console.log(response.data);
        const updatedVendors = vendors.map((v) => {
          v.id === editingVendor.id ? response.data : v;
        });
        setVendors(updatedVendors);
        setEditingVendor(null);
        setIsUpdated(!isUpdated); // Trigger a re-fetch of vendors
      }
    } catch (error) {
      console.error("Failed to update vendor:", error);
    }
  };

  const editVendor = (vendor) => {
    setEditingVendor(vendor);
  };

  const deleteVendor = async (vendor_id) => {
    try {
      fetch(`https://ecomart-x0ur.onrender.com/vendor`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // setIsUpdated(!isUpdated); // Trigger a re-fetch of vendors
      const updatedVendors = vendors.filter((v) => v.id !== vendor_id);
      setVendors(updatedVendors);
    } catch (error) {
      console.error("Failed to delete vendor:", error);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl mb-6 text-center font-bold text-blue-900">
          Admin Dashboard
        </h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search for vendors..."
            className="w-full p-3 mb-4 bg-white rounded-md border border-blue-300 focus:border-blue-500 focus:outline-none transition duration-200 hover:shadow-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table className="min-w-full table-auto bg-white rounded-md shadow-md">
          <thead>
            <tr className="bg-blue-800 text-white">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor) => (
              <tr
                key={vendor.id}
                className={`bg-${vendor.id % 2 === 0 ? "gray-100" : "white"}`}
              >
                <td className="border px-4 py-2">
                  <img
                    src={vendor.image}
                    alt={`${vendor.first_name}'s avatar`}
                    className="h-12 w-12 rounded-full"
                  />
                </td>
                <td className="border px-4 py-2">
                  {vendor.first_name} {vendor.last_name}
                </td>
                <td className="border px-4 py-2">{vendor.company}</td>
                <td className="border px-4 py-2">{vendor.email}</td>
                <td className="border px-4 py-2">{vendor.phone_number}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => editVendor(vendor)}
                    className="text-blue-600 mx-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteVendor(vendor.id)}
                    className="text-red-600 mx-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingVendor && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-10 transition-all ease-in-out duration-300">
            <div className="bg-white p-6 rounded-lg shadow-xl w-3/4 md:w-1/2 lg:w-1/3">
              {/* Input fields for editing vendor information */}
              <label htmlFor="" className="block p-0">
                Company
              </label>
              <input
                type="text"
                placeholder="Company"
                className="block w-full p-5 mb-9 border border-blue-900 rounded-md"
                value={editingVendor.company}
                onChange={(e) =>
                  setEditingVendor({
                    ...editingVendor,
                    company: e.target.value,
                  })
                }
              />
              <label htmlFor="" className="block p-0">
                Phone-number
              </label>
              <input
                type="text"
                placeholder="Phone Number"
                className="block w-full p-5 mb-2 border border-blue-900 rounded-md"
                value={editingVendor.phone_number}
                onChange={(e) =>
                  setEditingVendor({
                    ...editingVendor,
                    phone_number: e.target.value,
                  })
                }
              />
              <button
                onClick={() => updateVendor(editingVendor)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Save
              </button>
              <button
                onClick={() => setEditingVendor(null)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md ml-2 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
