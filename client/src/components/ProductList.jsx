import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../MyContext";

function ProductList({ searchTerm, selectedCategory, allCategories }) {
  const [products, setProducts] = useState([]);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  // };
  // console.log(selectedCategory);
  // const filteredProducts = products.filter((product) => {
  //   const matchesSearchTerm = product.prod_name
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase());
  //   const matchesCategory =
  //     selectedCategory === "all" || product.category === selectedCategory;
  //   return matchesSearchTerm && matchesCategory;
  // });
  // console.log(products);
  // products.length > 0 ? [...new Set(products.map((item) => item.category))];

  const filteredProducts = products
    .filter((prod) => {
      if (searchTerm == "") {
        return prod;
      } else if (
        prod.prod_name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return prod;
      }
    })
    .map((product) => {
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
    });
  // console.log(filteredProducts);

  //let's display each category's project
  if (!allCategories) {
    return <h1>Loading...</h1>;
  }
  const categ_prod = allCategories
    .filter((categ) => {
      return categ.category_name === selectedCategory;
    })
    .map((prod) => {
      return prod.products.map((product) => {
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
      });
    });
  console.log(selectedCategory);
  // console.log(allCategories);

  return (
    <section>
      <div className="flex flex-wrap flex-1 py-5 gap-[2rem] justify-center list-card">
        {selectedCategory !== "all" ? categ_prod : filteredProducts}
      </div>
    </section>
  );
}

export default ProductList;
