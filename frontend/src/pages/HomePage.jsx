import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTION_STATISTICS } from "../graphql/queries/transaction.query";

import TransactionForm from "../parts/TransactionForm";
import Cards from "../parts/Cards";

ChartJS.register(ArcElement, Tooltip, Legend);
const HomePage = () => {
  const { data } = useQuery(GET_TRANSACTION_STATISTICS);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "$",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  });

  useEffect(() => {
    if (data?.categoryStatistics) {
      const categories = data.categoryStatistics.map((stat) => stat.category);
      const totalAmounts = data.categoryStatistics.map(
        (stat) => stat.totalAmount
      );

      const backgroundColors = [];
      const borderColors = [];

      categories.forEach((category) => {
        if (category === "saving") {
          backgroundColors.push("rgba(75, 192, 192)");
          borderColors.push("rgba(75, 192, 192)");
        } else if (category === "expense") {
          backgroundColors.push("rgba(255, 99, 132)");
          borderColors.push("rgba(255, 99, 132)");
        } else if (category === "investment") {
          backgroundColors.push("rgba(54, 162, 235)");
          borderColors.push("rgba(54, 162, 235)");
        }
      });

      setChartData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmounts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
          },
        ],
      }));
    }
  }, [data]);

  return (
    <div className="flex flex-col w-full lg:w-1/2 mx-auto">
      <div className="flex flex-col md:flex-row lg:flex-row justify-center items-center gap-4 lg:gap-10">
        {data?.categoryStatistics.length > 0 && (
          <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px] mt-4 mb-6">
            <Doughnut data={chartData} />
          </div>
        )}

        <TransactionForm />
      </div>

      <div>
        <Cards />
      </div>
    </div>
  );
};

export default HomePage;
