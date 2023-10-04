import React from "react";
import "./Cart.css";
import { BsTrash } from "react-icons/bs";
import { useAppContext } from "../MyContext"; 

function Cart({ showCart, setShowCart }) {
  const { cartCount, setCartCount, products } = useAppContext();
  const [quantity, setQuantity] = React.useState(
    Array(cartCount.length).fill(1)
  ); 

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
  };

  if (!showCart) return null;

  return (
    <div className="frame">
      <button className="close-button" onClick={() => setShowCart(false)}>
        X
      </button>
      <h1 className="text-wrapper">Shopping cart</h1>
      <div className="group">
        {products.map((product, index) => (
          <div key={index} className="group-2">
            <img className="img" alt={product.name} src={product.img} />
            <div className="group-3">
              <h2>{product.name}</h2>
            </div>
            <div className="group-4">
              <button onClick={() => handleDecrease(index)}>-</button>
              <p>{quantity[index]}</p>
              <button onClick={() => handleIncrease(index)}>+</button>
            </div>
            <p className="price">{product.price}</p>
            <button
              className="remove-button clickable-element"
              onClick={() => handleRemove(index)}
            >
              <BsTrash />
            </button>
          </div>
        ))}
      </div>
      <div className="summary">
        <p>Total items: {quantity.reduce((a, b) => a + b, 0)}</p>
        <p>
          Subtotal: $
          {cartCount
            .map(
              (product, index) => parseFloat(product.price) * quantity[index]
            )
            .reduce((a, b) => a + b, 0)
            .toFixed(2)}
        </p>
        <button>Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
