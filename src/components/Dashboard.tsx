import {
  Activity,
  BarChart as BarIcon,
  LineChart as LineIcon,
  PieChart as PieIcon,
} from "lucide-react";
import React, { Suspense, useEffect } from "react";
import { useDashboard } from "../hooks/useDashboard";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { initializeCharts } from "../utils/chartConfig";
import MetricsCard from "./MetricsCard";
import StreamsTable from "./StreamsTable";

// Lazy load chart components
const LineChart = React.lazy(() => import("./charts/LineChart"));
const PieChart = React.lazy(() => import("./charts/PieChart"));
const BarChart = React.lazy(() => import("./charts/BarChart"));

const Dashboard: React.FC = () => {
  const { metrics, chartData, streams } = useDashboard();
  const isMobile = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    initializeCharts();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Activity className="w-8 h-8 text-indigo-600" />
        Streamify Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <MetricsCard title="Total Users" value={metrics.totalUsers.toLocaleString()} change={2.5} />
        <MetricsCard
          title="Active Users"
          value={metrics.activeUsers.toLocaleString()}
          change={1.8}
        />
        <MetricsCard
          title="Total Streams"
          value={metrics.totalStreams.toLocaleString()}
          change={3.2}
        />
        <MetricsCard
          title="Revenue"
          value={`$${(metrics.revenue / 1000000).toFixed(2)}M`}
          change={4.1}
        />
        <MetricsCard title="Top Artist" value={metrics.topArtist} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <LineIcon className="w-5 h-5" />
            User Growth
          </h2>
          <Suspense
            fallback={
              <div className="h-[300px] animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
            }
          >
            <LineChart data={chartData.userGrowth} isMobile={isMobile} />
          </Suspense>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <PieIcon className="w-5 h-5" />
            Revenue Distribution
          </h2>
          <div className="max-w-[400px]">
            <Suspense
              fallback={
                <div className="h-[300px] animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
              }
            >
              <PieChart data={chartData.revenueDistribution} />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BarIcon className="w-5 h-5" />
          Top 5 Streamed Songs
        </h2>
        <Suspense
          fallback={
            <div className="h-[300px] animate-pulse bg-gradient-to-r from-gray-200 to-gray-300 rounded" />
          }
        >
          <BarChart data={chartData.topSongs} isMobile={isMobile} />
        </Suspense>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Streams</h2>
        <StreamsTable streams={streams} />
      </div>
    </div>
  );
};

export default Dashboard;
