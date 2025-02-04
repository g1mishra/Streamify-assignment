import React from "react";
import { Line } from "react-chartjs-2";
import { ChartData } from "../../types/types";

interface LineChartProps {
  data: ChartData;
  isMobile: boolean;
}

const LineChart: React.FC<LineChartProps> = ({ data, isMobile }) => (
  <Line data={data} options={{ responsive: true, aspectRatio: isMobile ? 1 : 2 }} />
);

export default LineChart;
