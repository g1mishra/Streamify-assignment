import React from "react";
import { TrendingUp, TrendingDown, Users, Music, DollarSign, User } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: number;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, change }) => {
  const getIcon = () => {
    switch (title) {
      case "Total Users":
        return <Users className="w-5 h-5" />;
      case "Active Users":
        return <User className="w-5 h-5" />;
      case "Total Streams":
        return <Music className="w-5 h-5" />;
      case "Revenue":
        return <DollarSign className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border border-gray-100">
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
          {getIcon()}
        </div>
        <h3 className="font-medium">{title}</h3>
      </div>
      <div className="text-2xl font-bold text-gray-800">
        {value}
      </div>
      {change && (
        <div
          className={`flex items-center gap-1 text-sm mt-2 ${
            change > 0 ? "text-emerald-500" : "text-rose-500"
          }`}
        >
          {change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="font-medium">{Math.abs(change)}%</span>
        </div>
      )}
    </div>
  );
};

export default MetricsCard;
