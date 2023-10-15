import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useState } from "react";
import { useAppContext } from "../MyContext";

function SearchFilter({ onSearch, onCategoryChange, query, category }) {
  const options = [
    "Footwear",
    "Fitness Accessories",
    "Cycling Accessories",
    "Electronics",
    "Audio",
    "Accessories",
    "Outdoor Gear",
    "Food & Beverage",
    "Apparel",
    "Wearable Tech",
    "Gaming Accessories",
    "Kitchenware",
  ];

  // const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   fetch("http://127.0.0.1:5555/categories")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setCategories(data);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err);
  //       setIsLoading(false);
  //     });
  // }, []);
  // console.log(category);
  return (
    <div
      className="flex items-center justify-center py-7"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <input
        type="text"
        placeholder="Search"
        onChange={onSearch}
        value={query}
        className=" rounded-lg w-[35rem] border-2 p-3 pl-10 outline-blue-600 relative"
      />
      <select
        name="category"
        id="dropdown"
        className="rounded-md p-4 outline-none"
        onChange={onCategoryChange}
        value={category}
      >
        <option value="all" defaultValue={"all"}>
          All
        </option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchFilter;
