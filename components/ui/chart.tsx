// src/components/ui/chart.tsx
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartProps = {
  data: any; // The data for the chart
  options: any; // The chart options
};

const Chart: React.FC<ChartProps> = ({ data, options }) => {
  return <Line data={data} options={options} />;
};

export default Chart;
