
import React from 'react';
import { Leaf, Droplets, Zap, Recycle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  bgColor: string;
  textColor: string;
}

interface ImpactMetricsProps {
  metrics: {
    co2Saved: number;
    waterSaved: number;
    energySaved: number;
    materialsRecovered: number;
  };
  isLoading: boolean;
}

const Metric: React.FC<MetricProps> = ({ 
  title, 
  value, 
  unit, 
  icon, 
  bgColor, 
  textColor 
}) => {
  return (
    <div className="flex items-center p-4 rounded-xl border shadow-sm hover:shadow-md transition-all duration-300 bg-white">
      <div className={cn(
        "flex items-center justify-center w-12 h-12 rounded-full mr-4",
        bgColor
      )}>
        <div className={cn("w-6 h-6", textColor)}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <div className="flex items-baseline">
          <span className="text-xl font-bold mr-1">{value.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
      </div>
    </div>
  );
};

const ImpactMetrics: React.FC<ImpactMetricsProps> = ({ metrics, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 rounded-xl border bg-gray-50 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Metric
        title="CO₂ Reduction"
        value={metrics.co2Saved}
        unit="kg"
        icon={<Leaf />}
        bgColor="bg-green-100"
        textColor="text-green-600"
      />
      <Metric
        title="Water Saved"
        value={metrics.waterSaved}
        unit="liters"
        icon={<Droplets />}
        bgColor="bg-blue-100"
        textColor="text-blue-600"
      />
      <Metric
        title="Energy Conserved"
        value={metrics.energySaved}
        unit="kWh"
        icon={<Zap />}
        bgColor="bg-yellow-100"
        textColor="text-yellow-600"
      />
      <Metric
        title="Materials Recovered"
        value={metrics.materialsRecovered}
        unit="kg"
        icon={<Recycle />}
        bgColor="bg-ewaste-100"
        textColor="text-ewaste-600"
      />
    </div>
  );
};

export default ImpactMetrics;
