"use client";

import { DeviceRead } from "@/types/device-read";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PowerOverviewProps {
  deviceReads: DeviceRead[];
}

export function PowerOverview({ deviceReads }: PowerOverviewProps) {
  const formatXAxis = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatTooltip = (value: number) => [`${value} A`];

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={deviceReads}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatXAxis}
            interval="preserveStartEnd"
          />
          <YAxis
            label={{ value: "Amperes (A)", angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            labelFormatter={(timestamp) => new Date(timestamp).toLocaleString()}
            formatter={formatTooltip}
          />
          <Line
            type="monotone"
            dataKey="amps"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
