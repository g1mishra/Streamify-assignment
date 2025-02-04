import { faker } from '@faker-js/faker';
import { Stream, DashboardData } from '../types/types';

export const generateMockData = (): DashboardData => {
  const streams: Stream[] = Array.from({ length: 100 }, () => ({
    id: faker.string.uuid(),
    songName: faker.music.songName(),
    artist: faker.person.fullName(),
    dateStreamed: faker.date.recent({ days: 30 }).toISOString(),
    streamCount: faker.number.int({ min: 1000, max: 1000000 }),
    userId: faker.string.uuid(),
  }));

  return {
    streams,
    metrics: {
      totalUsers: faker.number.int({ min: 100000, max: 1000000 }),
      activeUsers: faker.number.int({ min: 50000, max: 500000 }),
      totalStreams: faker.number.int({ min: 1000000, max: 10000000 }),
      revenue: faker.number.int({ min: 1000000, max: 5000000 }),
      topArtist: faker.person.fullName(),
    },
    chartData: generateChartData(),
  };
};

const generateChartData = () => {
  return {
    userGrowth: {
      labels: Array.from({ length: 12 }, (_, i) => 
        new Date(Date.now() - (11-i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' })
      ),
      datasets: [
        {
          label: 'Total Users',
          data: Array.from({ length: 12 }, () => faker.number.int({ min: 100000, max: 1000000 })),
          borderColor: '#3b82f6',
        },
        {
          label: 'Active Users',
          data: Array.from({ length: 12 }, () => faker.number.int({ min: 50000, max: 500000 })),
          borderColor: '#10b981',
        }
      ]
    },
    revenueDistribution: {
      labels: ['Subscriptions', 'Advertisements', 'Other'],
      datasets: [{
        label: 'Revenue Sources',
        data: [65, 25, 10],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b']
      }]
    },
    topSongs: {
      labels: Array.from({ length: 5 }, () => faker.music.songName()),
      datasets: [{
        label: 'Streams',
        data: Array.from({ length: 5 }, () => faker.number.int({ min: 100000, max: 1000000 })),
        backgroundColor: "#3b82f6"
      }]
    }
  };
};
