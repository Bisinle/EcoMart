import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserProfileContainer, UserName, UserDetail } from "./Profile";
import moment from 'moment';

// function UserProfile({userId}) {
function UserProfile() {
  const userId = 4;
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://127.0.0.1:5556/customer/${userId}`)
      .then((response) => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setIsLoading(false);
      });

    axios
      .get(`http://127.0.0.1:5556/orders/customer/${userId}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    axios
      .get(`http://127.0.0.1:5556/products/customer/${userId}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const totalSpent = orders.reduce((total, order) => total + order.amount, 0);

  const categories = products.map((product) => product.category);
  const mostLikedCategory = categories
    .sort(
      (a, b) =>
        categories.filter((v) => v === a).length -
        categories.filter((v) => v === b).length
    )
    .pop();

  return (
    <UserProfileContainer>
      <UserName>
        {user.first_name} {user.last_name}
      </UserName>
      <UserDetail>Email: {user.email}</UserDetail>
      <UserDetail>Phone number: {user.phone_number}</UserDetail>
      <UserDetail>
      Joined: {moment(user.joined).format('MMMM Do YYYY')}
      </UserDetail>
      <UserDetail>Products bought: {orders.length}</UserDetail>
      <UserDetail>Total spent: ${totalSpent}</UserDetail>
      <UserDetail>Most liked category: {mostLikedCategory}</UserDetail>
    </UserProfileContainer>
  );
}

export default UserProfile;
