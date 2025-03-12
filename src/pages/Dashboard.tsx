
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import WasteChart from '@/components/dashboard/WasteChart';
import ImpactMetrics from '@/components/dashboard/ImpactMetrics';
import { useAuth } from '@/contexts/AuthContext';
import { wasteService } from '@/services/api';
import { Cpu, Scale, Users, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    totalCollected: 0,
    previousCollected: 0,
    activeContributions: 0,
    previousContributions: 0,
    communityRank: 0,
    previousRank: 0,
    impactScore: 0,
    previousScore: 0,
    impactMetrics: {
      co2Saved: 0,
      waterSaved: 0,
      energySaved: 0,
      materialsRecovered: 0
    }
  });

  // Mock chart data
  const chartData = [
    {
      name: 'Jan',
      smartphones: 40,
      computers: 24,
      peripherals: 28,
      appliances: 38
    },
    {
      name: 'Feb',
      smartphones: 30,
      computers: 28,
      peripherals: 22,
      appliances: 42
    },
    {
      name: 'Mar',
      smartphones: 48,
      computers: 36,
      peripherals: 34,
      appliances: 56
    },
    {
      name: 'Apr',
      smartphones: 52,
      computers: 32,
      peripherals: 38,
      appliances: 60
    },
    {
      name: 'May',
      smartphones: 58,
      computers: 40,
      peripherals: 45,
      appliances: 70
    },
    {
      name: 'Jun',
      smartphones: 62,
      computers: 45,
      peripherals: 50,
      appliances: 68
    },
  ];

  // Simulate data fetching
  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would fetch from API
        // const stats = await wasteService.getUserStats();
        
        // Simulating API response
        setTimeout(() => {
          setUserData({
            totalCollected: 486,
            previousCollected: 412,
            activeContributions: 28,
            previousContributions: 22,
            communityRank: 18,
            previousRank: 24,
            impactScore: 876,
            previousScore: 752,
            impactMetrics: {
              co2Saved: 325,
              waterSaved: 4250,
              energySaved: 786,
              materialsRecovered: 412
            }
          });
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="h-full flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-12 h-12 text-ewaste-500 animate-spin" />
            <p className="text-lg text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Greeting */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Welcome back, {user?.name}!</h2>
        <p className="text-muted-foreground">Here's an overview of your e-waste management efforts</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total E-Waste Collected"
          value={userData.totalCollected}
          previousValue={userData.previousCollected}
          suffix="kg"
          icon={<Scale className="w-5 h-5" />}
        />
        <StatsCard
          title="Active Contributions"
          value={userData.activeContributions}
          previousValue={userData.previousContributions}
          icon={<Cpu className="w-5 h-5" />}
        />
        <StatsCard
          title="Community Rank"
          value={userData.communityRank}
          previousValue={userData.previousRank}
          icon={<Users className="w-5 h-5" />}
        />
        <StatsCard
          title="Impact Score"
          value={userData.impactScore}
          previousValue={userData.previousScore}
          icon={<TrendingUp className="w-5 h-5" />}
        />
      </div>
      
      {/* Environmental Impact */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Environmental Impact</h3>
        <ImpactMetrics metrics={userData.impactMetrics} isLoading={false} />
      </div>
      
      {/* Waste Collection Chart */}
      <div className="mb-8">
        <WasteChart data={chartData} isLoading={false} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
