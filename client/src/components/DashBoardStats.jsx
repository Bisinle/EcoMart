import React from "react";

function DashBoardStats() {
  return (
    <div className="flex flex-row gap-4 justify-between">
      <div className="stat h-[150px] w-[400px] py-2 px-2  bg-indigo-500 rounded-lg   flex flex-col text-white relative">
        {" "}
        <div className="icon-title bg-yellow-200 flex gap-5 text-black">
          <div className="icon">Icon</div>
          <h3 className="font-semibold text-2xl">Purchases</h3>
        </div>{" "}
        <span className="absolute bottom-0 left-0">89475298475298</span>
      </div>
      <div className="stat h-[150px] w-[400px] py-2 px-2  bg-indigo-500 rounded-lg  flex flex-col text-white relative">
        {" "}
        <div className="icon-title bg-yellow-200 flex gap-5 text-black">
          <div className="icon">Icon</div>
          <h3 className="font-semibold text-2xl">Purchases</h3>
        </div>{" "}
        <span className="absolute bottom-0 left-0">89475298475298</span>
      </div>
      <div className="stat h-[150px] w-[400px] py-2 px-2  bg-indigo-500 rounded-lg flex flex-col text-white  relative">
        {" "}
        <div className="icon-title bg-yellow-200 flex gap-5 text-black">
          <div className="icon">Icon</div>
          <h3 className="font-semibold text-2xl">Purchases</h3>
        </div>{" "}
        <span className="absolute bottom-0 left-0">89475298475298</span>
      </div>
      <div className="stat h-[150px] w-[400px] py-2 px-2  bg-indigo-500 rounded-lg  flex flex-col text-white   relative ">
        {" "}
        <div className="icon-title bg-yellow-200 flex gap-5 text-black">
          <div className="icon">Icon</div>
          <h3 className="font-semibold text-2xl">Purchases</h3>
        </div>
        <span className="absolute bottom-0 left-0">89475298475298</span>
      </div>
    </div>
  );
}

export default DashBoardStats;
