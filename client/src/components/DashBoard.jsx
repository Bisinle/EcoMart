import React from "react";
import DashBoardStats from "./DashBoardStats";
import TransactionChart from "./TransactionChart";
import BuyerProfileChart from "./BuyerProfileChart";

function DashBoard() {
  return (
    <div className=" flex flex-col gap-4 ">
      <DashBoardStats />
      <div className=" flex  flex-1 gap-4 sm:flex-col sm:justify-center md:items-center lg:flex-row w-full">
        <TransactionChart />
        <BuyerProfileChart />
      </div>
    </div>
  );
}

export default DashBoard;
