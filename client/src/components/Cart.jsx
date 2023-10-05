import React from "react";
import "./Cart.css";
import { BsTrash } from "react-icons/bs";

function Cart({ showCart, setShowCart }) {
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

  const products = [
    {
      name: "Nike Superstar",
      size: "8.5",
      price: "$239.55",
      img: "https://images.journeys.com/images/products/1_595960_MD_THERO.JPG",
    },
    {
      name: "H&M T-Shirt",
      size: "S",
      price: "$14.99",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhbqcpGv1PxClKLk2qhWip26Ynz2D1xMkYNChZp00&s",
    },
    {
      name: "Gucci CG Marmont",
      size: "N/A",
      price: "$1850.00",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLUOP1fFZOblQ1mU8RLmioZQm8HBVZg3zmyDLmr1kuAg&s",
    },
  ];

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
              <p>Size: {product.size}</p>
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
          {["239.55", "14.99", "1850.00"]
            .map((price, index) => parseFloat(price) * quantity[index])
            .reduce((a, b) => a + b, 0)
            .toFixed(2)}
        </p>
        <button>Checkout</button>
      </div>
    </div>
  );
}
export default Cart;
