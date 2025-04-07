
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { History } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import TransitionList from '@/components/transitions/TransitionList';
import TransitionDialog from '@/components/transitions/TransitionDialog';

const Transitions: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold">E-Waste Transitions</h2>
            <p className="text-muted-foreground">
              Track and manage your e-waste disposal activities
            </p>
          </div>
          <TransitionDialog />
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Transitions</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <TransitionList />
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4">
            <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
              <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Pending Transitions</h3>
              <p className="text-muted-foreground">
                All your transitions have been processed. Record a new transition to see it here.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
              <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Completed Transitions</h3>
              <p className="text-muted-foreground">
                Your transitions are still being processed. Check back later.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Transitions;
