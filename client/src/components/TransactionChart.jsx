import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const data = [
  {
    month: "January",
    expense: 456,
    income: 535,
  },
  {
    month: "February",
    expense: 320,
    income: 700,
  },
  {
    month: "March",
    expense: 230,
    income: 600,
  },
  {
    month: "April",
    expense: 750,
    income: 800,
  },
  {
    month: "May",
    expense: 300,
    income: 900,
  },
  {
    month: "June",
    expense: 420,
    income: 550,
  },
  {
    month: "July",
    expense: 600,
    income: 700,
  },
  {
    month: "August",
    expense: 280,
    income: 600,
  },
  {
    month: "September",
    expense: 510,
    income: 530,
  },
  {
    month: "October",
    expense: 320,
    income: 720,
  },
  {
    month: "November",
    expense: 425,
    income: 550,
  },
  {
    month: "December",
    expense: 400,
    income: 580,
  },
];

// const buyers = [];

function TransactionChart() {
  return (
    <div className="h-[22rem bg-white p-4 rounded-sm border border-gray-300 w-full  my-10 ">
      <strong className="">TransactionChart</strong>
      <div className="w-full">
        <ResponsiveContainer width="80%" height={400}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 20,
              right: 10,
              lef: 10,
              button: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0 " vertical={false} />
            <XAxis dataKey={"month"} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#4B0082" />
            <Bar dataKey="expense" fill="#f0094d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TransactionChart;

{
  /* <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="income" stroke="#82ca9d" />
        </LineChart> */
}
