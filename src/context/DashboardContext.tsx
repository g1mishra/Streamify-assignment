import React, { createContext, useEffect, useState } from "react";
import { DashboardData } from "../types/types";
import { generateMockData } from "../utils/mockData";

type DashboardContextType = DashboardData;

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dashboardData, setDashboardData] = useState<DashboardContextType>({
    streams: [],
    metrics: {
      totalUsers: 0,
      activeUsers: 0,
      totalStreams: 0,
      revenue: 0,
      topArtist: "",
    },
    chartData: {
      userGrowth: { labels: [], datasets: [] },
      revenueDistribution: { labels: [], datasets: [] },
      topSongs: { labels: [], datasets: [] },
    },
  });

  useEffect(() => {
    const mockData = generateMockData();
    setDashboardData(mockData);
  }, []);

  return <DashboardContext.Provider value={dashboardData}>{children}</DashboardContext.Provider>;
};

export { DashboardContext, DashboardProvider };
