import React from "react";
import { Bar } from "react-chartjs-2";
import { ChartData } from "../../types/types";

interface BarChartProps {
  data: ChartData;
  isMobile: boolean;
}

const BarChart: React.FC<BarChartProps> = ({ data, isMobile }) => (
  <Bar data={data} options={{ responsive: true, aspectRatio: isMobile ? 1 : 3 }} />
);

export default BarChart;
