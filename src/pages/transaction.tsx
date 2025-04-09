import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import TransactionList from '@/components/transaction/TransactionList';
import TransactionDialog from '@/components/transaction/TransactionDialog';
import { wasteService } from '@/services/api';

const transaction: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-bold">E-Waste transactions</h2>
            <p className="text-muted-foreground">
              Track and manage your e-waste disposal activities
            </p>
          </div>
          <TransactionDialog onSuccess={() => setActiveTab('all')} />
        </div>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All transaction</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <TransactionList 
              queryFn={wasteService.getAllTransactions} 
              queryKey="all-transaction"
            />
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-4">
            <TransactionList 
              queryFn={wasteService.getPendingTransactions} 
              queryKey="pending-transaction"
            />
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4">
            <TransactionList 
              queryFn={wasteService.getCompletedTransactions} 
              queryKey="completed-transaction"
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default transaction;