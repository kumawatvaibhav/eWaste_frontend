
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Loader2 } from 'lucide-react';

interface WasteData {
  name: string;
  smartphones: number;
  computers: number;
  peripherals: number;
  appliances: number;
}

interface WasteChartProps {
  data: WasteData[];
  isLoading: boolean;
}

const WasteChart: React.FC<WasteChartProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-xl border p-6">
        <div className="flex flex-col items-center space-y-2">
          <Loader2 className="w-8 h-8 text-ewaste-500 animate-spin" />
          <p className="text-muted-foreground">Loading chart data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border p-6 h-96">
      <h3 className="text-lg font-semibold mb-4">E-Waste Collection by Category</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            tickMargin={10}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickMargin={10}
            tickFormatter={(value) => `${value}kg`}
          />
          <Tooltip 
            contentStyle={{ 
              borderRadius: '8px', 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0' 
            }}
            formatter={(value) => [`${value} kg`, undefined]}
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          <Bar 
            dataKey="smartphones" 
            name="Smartphones" 
            fill="#3e8b50" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="computers" 
            name="Computers" 
            fill="#5fa86f" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="peripherals" 
            name="Peripherals" 
            fill="#8fc798" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="appliances" 
            name="Appliances" 
            fill="#bae0bf" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WasteChart;
