
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

// Mock data - in a real app this would come from an API call
const activityData = [
  {
    id: 1,
    type: 'login',
    description: 'Login successful',
    date: new Date(Date.now() - 1000 * 60 * 60),
    ip: '192.168.1.1',
    device: 'Chrome on Windows',
  },
  {
    id: 2,
    type: 'profile',
    description: 'Profile information updated',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    ip: '192.168.1.1',
    device: 'Chrome on Windows',
  },
  {
    id: 3,
    type: 'password',
    description: 'Password changed',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    ip: '192.168.1.2',
    device: 'Safari on macOS',
  },
  {
    id: 4,
    type: 'listing',
    description: 'New e-waste listing created',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    ip: '192.168.1.1',
    device: 'Chrome on Windows',
  },
  {
    id: 5,
    type: 'transition',
    description: 'E-waste transition recorded',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21),
    ip: '192.168.1.1',
    device: 'Chrome on Windows',
  },
];

const getActivityBadgeColor = (type: string) => {
  switch (type) {
    case 'login':
      return 'bg-blue-100 text-blue-800';
    case 'profile':
      return 'bg-green-100 text-green-800';
    case 'password':
      return 'bg-yellow-100 text-yellow-800';
    case 'listing':
      return 'bg-purple-100 text-purple-800';
    case 'transition':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ActivityHistory: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity History</CardTitle>
        <CardDescription>
          Review your recent account activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Activity</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>IP Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activityData.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Badge 
                      variant="outline" 
                      className={getActivityBadgeColor(activity.type)}
                    >
                      {activity.type}
                    </Badge>
                    <span className="text-sm">{activity.description}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {format(activity.date, 'MMM dd, yyyy')}
                  <div className="text-xs text-muted-foreground">
                    {format(activity.date, 'h:mm a')}
                  </div>
                </TableCell>
                <TableCell>{activity.device}</TableCell>
                <TableCell>{activity.ip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ActivityHistory;
