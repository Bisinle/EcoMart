import React from "react";
import { useState } from "react";

function SearchFilter() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  return (
    <div className="flex items-center justify-center py-7">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className=" rounded-lg w-[35rem] border-2 p-3 pl-10 outline-blue-600 relative"
      />
      <select
        name="category"
        id="dropdown"
        className="rounded-md p-4 outline-none"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      >
        <option value="all" selected>
          All
        </option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="electronics">Electronics</option>
      </select>
    </div>
  );
}

export default SearchFilter;
