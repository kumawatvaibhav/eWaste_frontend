
import React, { useState, useEffect, useRef } from 'react';
import { Leaf, Recycle, Cpu, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, suffix = '', delay = 0 }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const startTimestamp = performance.now();

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4); // Easing function
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    // Add delay before starting animation
    const timer = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, value, delay]);

  return (
    <div 
      ref={counterRef}
      className="flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-500"
    >
      <div className="mb-4 p-4 rounded-full bg-ewaste-100 text-ewaste-600">
        {icon}
      </div>
      <div className="text-4xl font-bold mb-2 flex items-end">
        <span>{count}</span>
        <span>{suffix}</span>
      </div>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
};

const Stats: React.FC = () => {
  return (
    <section className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ewaste-50/50 to-transparent -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Environmental Impact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Through collective efforts, we've achieved significant milestones in e-waste management and environmental conservation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatItem 
            icon={<Recycle className="w-8 h-8" />} 
            value={42000}
            label="Devices Recycled"
            suffix="+"
            delay={0}
          />
          <StatItem 
            icon={<Leaf className="w-8 h-8" />} 
            value={28500}
            label="CO₂ Tons Saved"
            suffix="+"
            delay={200}
          />
          <StatItem 
            icon={<Cpu className="w-8 h-8" />} 
            value={85}
            label="Materials Recovered"
            suffix="%"
            delay={400}
          />
          <StatItem 
            icon={<Users className="w-8 h-8" />} 
            value={15000}
            label="Active Contributors"
            suffix="+"
            delay={600}
          />
        </div>
      </div>
    </section>
  );
};

export default Stats;
