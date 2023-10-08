import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppContext } from "../MyContext";

const VendorDashboard = () => {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [editingVendor, setEditingVendor] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const { isLogedin, setIsLogedin, jwtToken, setJwtToken } = useAppContext();
  const token = localStorage.getItem("access_token");
  console.log(token);

  const [newVendor, setNewVendor] = useState({
    // Initialize with default values for a new vendor
    first_name: "",
    last_name: "",
    company: "",
    email: "",
    phone_number: "",
  });
  useEffect(() => {
    fetch(`http://127.0.0.1:5555/vendor`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          console.log(res);
          throw new Error(" response was not ok");
        }
        return res.json();
      })
      .then((response) => {
        console.log(response); // Handle the successful response here
        setVendors(response);
        // navigate("/login");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, [isUpdated]);

  useEffect(() => {
    const results = vendors.filter((vendor) =>
      `${vendor.first_name} ${vendor.last_name}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredVendors(results);
  }, [searchTerm, vendors]);

  // const updateVendor = (updatedVendor) => {
  //   const updatedVendors = vendors.map((v) =>
  //     v.id === updatedVendor.id ? updatedVendor : v
  //   );
  //   setVendors(updatedVendors);
  //   setEditingVendor(null); // Close the edit mode
  // };
  const updateVendor = async (updatedVendor) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.put(
        `http://127.0.0.1:5555/vendor`,
        { headers: headers },
        updatedVendor
      );

      if (response.data) {
        // const updatedVendors = vendors.map((v) =>
        //   v.id === updatedVendor.id ? response.data : v
        // );
        // setVendors(updatedVendors);
        console.log(response.data);
        setEditingVendor(null);
      }
    } catch (error) {
      console.error("Failed to update vendor:", error);
    }
  };

  // const editVendor = (vendor) => {
  //   setEditingVendor(vendor);
  // };
  //   const editVendor = async (vendor) => {
  //   try {
  //     const response = await axios.put(`/api/vendors/${vendor.id}`, vendor);
  //     if (response.data) {
  //       const updatedVendors = vendors.map((v) =>
  //         v.id === vendor.id ? response.data : v
  //       );
  //       setVendors(updatedVendors);
  //       setEditingVendor(null);  // Close the edit modal or UI
  //     }
  //   } catch (error) {
  //     console.error('Failed to edit vendor:', error);
  //   }
  // };

  const addNewVendor = () => {
    // Implement your API call to add a new vendor here
    // axios.post('/add-vendor-endpoint', newVendor)

    // Add the new vendor to the state
    setVendors([...vendors, newVendor]);

    // Clear the new vendor form
    setNewVendor({
      first_name: "",
      last_name: "",
      company: "",
      email: "",
      phone_number: "",
    });
  };

  // const addNewVendor = async () => {
  //   try {
  //     const response = await axios.post('/api/vendors', newVendor);
  //     if (response.data) {
  //       setVendors([...vendors, response.data]);
  //       setNewVendor({
  //         first_name: '',
  //         last_name: '',
  //         company: '',
  //         email: '',
  //         phone_number: '',
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Failed to add new vendor:', error);
  //   }
  // };

  const deleteVendor = (vendorId) => {
    // Implement your API call to delete the vendor here
    // axios.delete(`/delete-vendor-endpoint/${vendorId}`)

    // Remove the deleted vendor from the state
    const updatedVendors = vendors.filter((v) => v.id !== vendorId);
    setVendors(updatedVendors);
  };

  // const deleteVendor = async (vendorId) => {
  //   try {
  //     await axios.delete(`/api/vendors/${vendorId}`);
  //     const updatedVendors = vendors.filter((v) => v.id !== vendorId);
  //     setVendors(updatedVendors);
  //   } catch (error) {
  //     console.error('Failed to delete vendor:', error);
  //   }
  // };

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl mb-6 text-center font-bold text-blue-900">
          Vendor Dashboard
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

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Add New Vendor</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/5 p-2 mr-2 bg-white rounded-md border-2 border-blue-300 focus:border-blue-500 focus:outline-none"
              value={newVendor.first_name}
              onChange={(e) =>
                setNewVendor({ ...newVendor, first_name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/5 p-2 mr-2 bg-white rounded-md border-2 border-blue-300 focus:border-blue-500 focus:outline-none"
              value={newVendor.last_name}
              onChange={(e) =>
                setNewVendor({ ...newVendor, last_name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Company"
              className="w-1/5 p-2 mr-2 bg-white rounded-md border-2 border-blue-300 focus:border-blue-500 focus:outline-none"
              value={newVendor.company}
              onChange={(e) =>
                setNewVendor({ ...newVendor, company: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Email"
              className="w-1/5 p-2 mr-2 bg-white rounded-md border-2 border-blue-300 focus:border-blue-500 focus:outline-none"
              value={newVendor.email}
              onChange={(e) =>
                setNewVendor({ ...newVendor, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-1/5 p-2 bg-white rounded-md border-2 border-blue-300 focus:border-blue-500 focus:outline-none"
              value={newVendor.phone_number}
              onChange={(e) =>
                setNewVendor({ ...newVendor, phone_number: e.target.value })
              }
            />
          </div>
          <button
            onClick={addNewVendor}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-2 transition-colors duration-200"
          >
            Add Vendor
          </button>
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
              <input
                type="text"
                placeholder="First Name"
                className="block w-full p-2 mb-2 border rounded-md"
                value={editingVendor.first_name}
                onChange={(e) =>
                  setEditingVendor({
                    ...editingVendor,
                    first_name: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Last Name"
                className="block w-full p-2 mb-2 border rounded-md"
                value={editingVendor.last_name}
                onChange={(e) =>
                  setEditingVendor({
                    ...editingVendor,
                    last_name: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Company"
                className="block w-full p-2 mb-2 border rounded-md"
                value={editingVendor.company}
                onChange={(e) =>
                  setEditingVendor({
                    ...editingVendor,
                    company: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Email"
                className="block w-full p-2 mb-2 border rounded-md"
                value={editingVendor.email}
                onChange={(e) =>
                  setEditingVendor({ ...editingVendor, email: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="block w-full p-2 mb-2 border rounded-md"
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
