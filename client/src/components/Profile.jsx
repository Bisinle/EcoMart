import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';

const UserProfile = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://ecomart-x0ur.onrender.com/orders"
        );
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 p-6">
      <h1 className="text-4xl mb-10 text-center font-semibold text-black">
        Your Orders
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden p-6 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="mb-4">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-2">
                {user.first_name} {user.last_name}
              </div>
              <p className="text-gray-500">{user.email}</p>
              <p className="mt-1 text-gray-500">{user.phone_number}</p>
              <p className="mt-1 text-gray-500">
                Joined: {moment(user.joined).format('MMMM Do YYYY')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-black">Orders:</h4>
              {user.orders && user.orders.length === 0 ? (
                <ul>
                  {user.orders.map((order) => (
                    <li key={order.id} className="mt-2 text-gray-600">
                      <p>
                        <strong>Address:</strong> {order.address}
                      </p>
                      <p>
                        <strong>Item Price:</strong> ${order.item_price}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {order.item_quantity}
                      </p>
                      <p>
                        <strong>Order Date:</strong>{" "}
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                      <p className="font-semibold">
                        Total Amount:{" "}
                        <span className="text-indigo-700">
                          ${(order.item_quantity * order.item_price).toFixed(2)}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 italic">No orders yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
