import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState, useEffect } from "react";
import { useAppContext } from "../MyContext";

function SearchFilter({ onSearchTerm, onSelectedCategory }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/categories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);
  //function to updatet the handleSearchTerm in home.jsx
  function handleSearchTerm(e) {
    onSearchTerm(e.target.value);
  }
  //function to updatet the handleSelectedCategory in home.jsx
  function handleChosenCategory(e) {
    onSelectedCategory(e.target.value);
  }
  console.log(categories);
  return (
    <div
      className="flex items-center justify-center py-7"
      data-aos="fade-up"
      data-aos-duration="500"
      data-aos-easing="ease-in-out"
      data-aos-once="true"
    >
      <input
        type="text"
        placeholder="Search"
        onChange={handleSearchTerm}
        className=" rounded-lg w-[35rem] border-2 p-3 pl-10 outline-blue-600 relative"
      />
      <select
        name="category"
        id="dropdown"
        className="rounded-md p-4 outline-none"
        onChange={handleChosenCategory}
        // value={category}
      >
        <option value="all" defaultValue={"all"}>
          All
        </option>
        {categories.map((item) => (
          <option key={item.id}>{item.category_name}</option>
        ))}
      </select>
    </div>
  );
}

export default SearchFilter;
