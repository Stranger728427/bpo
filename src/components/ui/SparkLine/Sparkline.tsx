import { COLORS } from '@/components/constants/Constant';
import React, { useId } from 'react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

interface SparklineProps {
  data: { value: number }[];
  color?: string;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  color = COLORS.primary,
}) => {
  const gradientId = useId();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fillOpacity={1}
          fill={`url(#${gradientId})`}
          isAnimationActive
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
