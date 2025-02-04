import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData } from '../../types/types';

interface PieChartProps {
  data: ChartData;
}

const PieChart: React.FC<PieChartProps> = ({ data }) => (
  <Pie
    data={data}
    options={{
      responsive: true,
      aspectRatio: 1,
    }}
  />
);

export default PieChart;
