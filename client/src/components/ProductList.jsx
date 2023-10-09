import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useAppContext } from "../MyContext";
import SearchFilter from "./SearchFilter";

function ProductList() {
  const { cartCount, wishlistCount } = useAppContext();
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [options, setOptions] = useState([]);

  const baseURL = "https://ecomart-x0ur.onrender.com/products";

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearchTerm = product.prod_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearchTerm && matchesCategory;
  });

  // products.length > 0 ? [...new Set(products.map((item) => item.category))];

  return (
    <section>
      <SearchFilter
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        query={searchTerm}
        category={selectedCategory}
      />
      <div className="flex flex-wrap flex-1 gap-[2rem] justify-center">
        {filteredProducts.map((product) => {
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              price={product.price}
              name={product.prod_name}
              description={product.prod_description}
            />
          );
        })}
      </div>
    </section>
  );
}

export default ProductList;
