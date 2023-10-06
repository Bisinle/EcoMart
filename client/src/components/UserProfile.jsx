import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserProfileContainer, UserName, UserDetail } from './Profile';

function UserProfile({userId}) {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5555/customer/${userId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

    axios.get(`https://ecomart-x0ur.onrender.com/orders/${userId}`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

    axios.get(`c`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

      if (!user || !orders.length || !products.length) {
        return <div>Loading...</div>;
      }
    
      const totalSpent = orders.reduce((total, order) => total + order.amount, 0);
    
      const categories = products.map(product => product.category);
      const mostLikedCategory = categories.sort((a,b) =>
            categories.filter(v => v===a).length
          - categories.filter(v => v===b).length
        ).pop();
    
      return (
        <UserProfileContainer>
    <UserName>{user.first_name} {user.last_name}</UserName>
    <UserDetail>Email: {user.email}</UserDetail>
    <UserDetail>Phone number: {user.phone_number}</UserDetail>
    <UserDetail>Joined: {new Date(user.joined).toLocaleDateString()}</UserDetail>
    <UserDetail>Products bought: {orders.length}</UserDetail>
    <UserDetail>Total spent: ${totalSpent}</UserDetail>
    <UserDetail>Most liked category: {mostLikedCategory}</UserDetail>
  </UserProfileContainer>
      ); 

}

export default UserProfile;