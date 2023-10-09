import React from "react";
import "./Cart.css";
import { BsTrash } from "react-icons/bs";
import { useAppContext } from "../MyContext";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Lottie from "react-lottie";
import animationData from "../assets/animation_lndl5pze.json";

function Cart({ showCart, setShowCart }) {
  const { cartCount, setCartCount, products, setProducts, setQuantity, quantity, userId } = useAppContext();

  const handleIncrease = (index) => {
    const newQuantity = [...quantity];
    newQuantity[index]++;
    setQuantity(newQuantity);
  };

  const handleDecrease = (index) => {
    if (quantity[index] > 1) {
      const newQuantity = [...quantity];
      newQuantity[index]--;
      setQuantity(newQuantity);
    }
  };

  const handleRemove = (index) => {
    const newQuantity = [...quantity];
    newQuantity.splice(index, 1);
    setQuantity(newQuantity);

    const newCartCount = [...cartCount];
    newCartCount.splice(index, 1);
    setCartCount(newCartCount);

    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const checkOutUrl = 'https://ecomart-x0ur.onrender.com/orders'
  // const userId = localStorage.getItem("user_role");
  // console.log(userId)

  const handleCheckout = async () => {
    console.log('Checking out for user ID:', userId);
    try {
      const orders = products.map((product, index) =>
       ({
        customer_id: userId,
        item_price: parseFloat(product.price),
        item_quantity: quantity[index],
        amount: product.amount,
        address: "Ngong lane, Ngong Road, Nairobi"
      }));
      console.log(userId)
      const response = await axios.post(checkOutUrl, orders);
      console.log(response.data);

      setProducts([]);
      setCartCount([]);
      setQuantity([]);

      localStorage.removeItem('cart');

      setShowCart(false);
      toast.success('Order placed successfully!');

    } catch (error) {
      console.error(error);

      toast.error('Order failed. Please try again.');
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  if (!showCart) return null;

  return (
    <div className="frame">
      <button className="close-button" onClick={() => setShowCart(false)}>
        X
      </button>
      <h1 className="text-wrapper">Shopping cart</h1>
      <div className="group">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div key={index} className="group-2">
              <img className="img" alt={product.name} src={product.image} />
              <div className="group-3">
                <h2>{product.name}</h2>
              </div>
              <div className="group-4">
                <button onClick={() => handleDecrease(index)}>-</button>
                <p>{quantity[index]}</p>
                <button onClick={() => handleIncrease(index)}>+</button>
              </div>
              <p className="price">$ {parseFloat(product.price) * quantity[index]}</p>
              <button
                className="remove-button clickable-element"
                onClick={() => handleRemove(index)}
              >
                <BsTrash />
              </button>
            </div>
          ))
        ) : (
          <div>
            <Lottie options={defaultOptions} height={400} width={400} />
            <h2>Your shopping cart is empty. Start adding products!</h2>
          </div>
        )}
      </div>
  
      <div className="summary">
        <p>Total items: {quantity.reduce((a, b) => a + b, 0)}</p>
        <p>
          Subtotal: $
          {products
            .map(
              (product, index) => parseFloat(product.price) * quantity[index]
            )
            .reduce((a, b) => a + b, 0)
            .toFixed(2)}
        </p>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
  
      
    </div>
  );
}

export default Cart;
