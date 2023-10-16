import React from "react";
import { FaShopify, FaCoins } from "react-icons/fa6";

function DashBoardStats() {
  return (
    <div className="flex flex-row gap-10 justify-center flex-wrap w-full">
      <BoxWrapper>
        {" "}
        <div className="icon-titl  rounded-lg flex  items-center gap-10 text-black">
          <div className="icon bg-indigo-500 h-12 w-12 flex justify-center items-center rounded-full">
            <FaShopify className=" rounded-full h-12 w-12 text-white " />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">
              Total SalesS
            </span>
            <div className="flex items-center ">
              <strong className="text-xl text-gray-700 font-semibold ">
                $5945
              </strong>
              <span className="text-sm text-green-500 pl-2">+234</span>
            </div>
          </div>
        </div>{" "}
      </BoxWrapper>
      <BoxWrapper>
        {" "}
        <div className="icon-titl  rounded-lg flex  items-center gap-10 text-black">
          <div className="icon bg-indigo-500 h-12 w-12 flex justify-center items-center rounded-full">
            <FaShopify className=" rounded-full h-12 w-12 text-white " />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Expenses</span>
            <div className="flex items-center ">
              <strong className="text-xl text-gray-700 font-semibold ">
                $2145
              </strong>
              <span className="text-sm text-green-500 pl-2">+4</span>
            </div>
          </div>
        </div>{" "}
      </BoxWrapper>
      <BoxWrapper>
        {" "}
        <div className="icon-titl  rounded-lg flex  items-center gap-10 text-black">
          <div className="icon bg-indigo-500 h-12 w-12 flex justify-center items-center rounded-full">
            <FaShopify className=" rounded-full h-12 w-12 text-white " />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Orders</span>
            <div className="flex items-center ">
              <strong className="text-xl text-gray-700 font-semibold ">
                $4504
              </strong>
              <span className="text-sm text-green-500 pl-2">+571</span>
            </div>
          </div>
        </div>{" "}
      </BoxWrapper>
      <BoxWrapper>
        {" "}
        <div className="icon-titl  rounded-lg flex  items-center gap-10 text-black">
          <div className="icon bg-indigo-500 h-12 w-12 flex justify-center items-center rounded-full">
            <FaShopify className=" rounded-full h-12 w-12 text-white " />
          </div>
          <div className="pl-4">
            <span className="text-sm text-gray-500 font-light">Purchases</span>
            <div className="flex items-center ">
              <strong className="text-xl text-gray-700 font-semibold ">
                $1003
              </strong>
              <span className="text-sm text-green-500 pl-2">+98</span>
            </div>
          </div>
        </div>{" "}
      </BoxWrapper>
    </div>
  );
}

export default DashBoardStats;

function BoxWrapper({ children }) {
  return (
    <div className="stat h-[80px] w-[300px] py-2 px-2 bg-white border shadow-lg rounded-lg   flex flex-col text-white relative">
      {children}
    </div>
  );
}

// <div className="flex flex-row gap-10 justify-center flex-wrap w-full">
//       <div className="stat h-[150px] w-[300px] py-2 px-2 bg-indigo-400 border border-grey-300 shadow-lg rounded-lg   flex flex-col text-white relative">
//         {" "}
//         <div className="icon-title bg-indigo-200 rounded-lg flex  items-center gap-10 text-black">
//           <div className="icon">
//             <FaShopify className=" rounded-full bg-grey-300 text-2xl" />
//           </div>
//           <h3 className="font-semibold text-2xl">Orders</h3>
//         </div>{" "}
//         <span className="absolute bottom-0 left-0 px-3 py-2 font-semibold text-lg">
//           89475298475298
//         </span>
//       </div>
//       <div className="stat h-[150px] w-[300px] py-2 px-2  bg-indigo-500 rounded-lg  flex flex-col text-white relative">
//         {" "}
//         <div className="icon-title bg-indigo-200 rounded-lg flex  items-center gap-10 text-black">
//           <div className="icon">
//             <FaShopify className="w-10 h-10 rounded-full bg-grey-300" />
//           </div>
//           <h3 className="font-semibold text-2xl">Orders</h3>
//         </div>{" "}
//         <span className="absolute bottom-0 left-0 px-3 py-2 font-semibold text-lg">
//           89475298475298
//         </span>
//       </div>
//       <div className="stat h-[150px] w-[300px] py-2 px-2  bg-indigo-500 rounded-lg flex flex-col text-white  relative">
//         {" "}
//         <div className="icon-title bg-indigo-200 rounded-lg flex  items-center gap-10 text-black">
//           <div className="icon">
//             <FaShopify className="w-10 h-10 rounded-full bg-grey-300" />
//           </div>
//           <h3 className="font-semibold text-2xl">Orders</h3>
//         </div>{" "}
//         <span className="absolute bottom-0 left-0 px-3 py-2 font-semibold text-lg">
//           89475298475298
//         </span>
//       </div>
//       <div className="stat h-[150px] w-[300px] py-2 px-2  bg-indigo-500 rounded-lg  flex flex-col text-white   relative ">
//         {" "}
//         <div className="icon-title bg-indigo-200 rounded-lg flex  items-center gap-10 text-black">
//           <div className="icon">
//             <FaShopify className="w-10 h-10 rounded-full bg-grey-300" />
//           </div>
//           <h3 className="font-semibold text-2xl">Orders</h3>
//         </div>{" "}
//         <span className="absolute bottom-0 left-0 px-3 py-2 font-semibold text-lg">
//           89475298475298
//         </span>
//       </div>
//     </div>
