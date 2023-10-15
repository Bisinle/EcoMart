import React, { useState } from "react";
import Header from "./Header";
import ProductList from "./ProductList";
import SearchFilter from "./SearchFilter";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // call back function to send to searchFilter to get the searchTerm and the selectedCategory
  function getSearchTerm(searchTerm) {
    // console.log(searchTerm);
    setSearchTerm(searchTerm);
  }
  function getSelectedCategory(selectedCategory) {
    // console.log(selectedCategory);
    setSelectedCategory(selectedCategory);
  }
  return (
    <div>
      <Header />
      <SearchFilter
        onSearchTerm={getSearchTerm}
        onSelectedCategory={getSelectedCategory}
      />
      <ProductList
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />
    </div>
  );
}
