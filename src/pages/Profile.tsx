
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProfileForm from '@/components/profile/ProfileForm';
import PasswordForm from '@/components/profile/PasswordForm';
import ActivityHistory from '@/components/profile/ActivityHistory';

const Profile: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <div className="mb-4">
          <h2 className="text-2xl font-bold">User Profile</h2>
          <p className="text-muted-foreground">
            Manage your account information and settings
          </p>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-4">
            <ProfileForm />
          </TabsContent>
          
          <TabsContent value="password" className="space-y-4">
            <PasswordForm />
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            <ActivityHistory />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
