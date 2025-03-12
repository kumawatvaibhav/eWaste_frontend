
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number;
  previousValue: number;
  icon: React.ReactNode;
  suffix?: string;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  previousValue, 
  icon, 
  suffix = '', 
  className 
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  // Percentage change calculation
  const percentChange = previousValue > 0 
    ? ((value - previousValue) / previousValue) * 100 
    : 0;
  
  const isPositive = percentChange >= 0;
  
  // Animate value on mount
  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();
    
    const animateValue = (timestamp: number) => {
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease out
      
      const currentValue = Math.floor(easedProgress * value);
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animateValue);
      }
    };
    
    requestAnimationFrame(animateValue);
  }, [value]);

  return (
    <div className={cn(
      "p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all duration-300",
      className
    )}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-muted-foreground font-medium">{title}</span>
        <div className="p-2 rounded-full bg-ewaste-50 text-ewaste-500">
          {icon}
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="text-3xl font-bold">
          {displayValue.toLocaleString()}{suffix}
        </div>
        
        <div className="flex items-center text-sm">
          <span className={cn(
            "flex items-center",
            isPositive ? "text-green-600" : "text-red-600"
          )}>
            <span className="inline-block mr-1">
              {isPositive ? '↑' : '↓'}
            </span>
            {Math.abs(percentChange).toFixed(1)}%
          </span>
          <span className="text-muted-foreground ml-2">vs. last period</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
