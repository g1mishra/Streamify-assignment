export interface Stream {
  id: string;
  songName: string;
  artist: string;
  dateStreamed: string;
  streamCount: number;
  userId: string;
}

export interface MetricCard {
  title: string;
  value: string | number;
  change?: number;
  icon?: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
  }[];
}

export interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  totalStreams: number;
  revenue: number;
  topArtist: string;
}

export interface DashboardChartData {
  userGrowth: ChartData;
  revenueDistribution: ChartData;
  topSongs: ChartData;
}

export interface DashboardData {
  streams: Stream[];
  metrics: DashboardMetrics;
  chartData: DashboardChartData;
}