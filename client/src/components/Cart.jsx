import React from "react";
import "./Cart.css";
import {BsTrash} from "react-icons/bs"

export const Cart = ({ showCart, setShowCart }) => {
  const [quantity, setQuantity] = React.useState([1, 1, 1]);

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
  };

  if (!showCart) return null;

  return (
    <div className="frame">
      <button className="close-button" onClick={() => setShowCart(false)}>X</button>
      <h1 className="text-wrapper">Shopping cart</h1>
      <div className="group">
        {['Nike Superstar', 'H&M T-Shirt', 'Gucci CG Marmont'].map(
          (item, index) => (
            <div key={index} className="group-2">
              <img className="img" alt="Item" src={`item-${index}.jpg`} />
              <div className="group-3">
                <h2>{item}</h2>
                <p>Size: {['8.5', 'S', 'N/A'][index]}</p>
              </div>
              <div className="group-4">
                <button onClick={() => handleDecrease(index)}>-</button>
                <p>{quantity[index]}</p>
                <button onClick={() => handleIncrease(index)}>+</button>
              </div>
              <p className="price">{['$239,55', '$14,99', '$1850,00'][index]}</p>
              <button className="remove-button" onClick={() => handleRemove(index)}><BsTrash /></button>
            </div>
          )
        )}
      </div>
      <div className="summary">
        <p>Total items: {quantity.reduce((a, b) => a + b, 0)}</p>
        <p>
          Subtotal: $
          {['239.55', '14.99', '1850.00']
            .map((price, index) => parseFloat(price) * quantity[index])
            .reduce((a, b) => a + b, 0)
            .toFixed(2)}
        </p>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
