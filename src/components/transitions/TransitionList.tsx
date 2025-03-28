
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { wasteService } from '@/services/api';
import { Transition } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { format } from 'date-fns';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

const TransitionList: React.FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['transitions'],
    queryFn: wasteService.getAllTransitions,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-600">Failed to load transitions</p>
        <p className="text-sm text-red-500">Please try again later</p>
      </div>
    );
  }

  // Updated to handle the response format from the API
  // The API might return data in different formats, so we need to be flexible
  const transitions = data?.transitions || data?.data || [];
  console.log('Processed transitions data:', transitions);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableCaption>A list of your recent e-waste transitions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Waste Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transitions.length > 0 ? (
              transitions.map((transition: Transition) => (
                <TableRow key={transition._id}>
                  <TableCell>
                    {format(new Date(transition.date), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="font-medium">{transition.wasteType}</TableCell>
                  <TableCell>
                    {transition.quantity} {transition.unit}
                  </TableCell>
                  <TableCell>{transition.location}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={getStatusColor(transition.status)}
                    >
                      {transition.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {transition.description || '—'}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No transitions found. Start by recording your first e-waste transition.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {transitions.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default TransitionList;
