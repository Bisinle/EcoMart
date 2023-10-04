import React from "react";
import SearchFilter from "./SearchFilter";

function Header() {
  return (
    <>
      <article className="pb-[3rem]">
        <div className="relative">
          <img
            src="https://cdn.thewirecutter.com/wp-content/media/2020/11/vr-headset-2048px-8993-2x1-1.jpg?auto=webp&quality=75&crop=2:1&width=1024&dpr=1.5"
            alt="banner"
            className="rounded-lg h-[30rem] w-full object-cover"
          />
          <h3 className="absolute top-10 left-12 text-white text-3xl font-semibold">
            Grab upto 50% off <br></br>on selected items
          </h3>
        </div>
      </article>
      <SearchFilter />
    </>
  );
}

export default Header;
