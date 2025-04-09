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
import { Transaction } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { format } from 'date-fns';
import { History } from 'lucide-react';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

interface TransactionListProps {
  queryFn?: () => Promise<any>;
  queryKey: string;
}

const TransactionList: React.FC<TransactionListProps> = ({ 
  queryFn = wasteService.getAllTransactions,
  queryKey = 'transactions'
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [queryKey],
    queryFn: queryFn,
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
        <p className="text-red-600">Failed to load transactions</p>
        <p className="text-sm text-red-500">Please try again later</p>
      </div>
    );
  }

  // Updated to handle the response format from the API
  const transactions = data?.transactions || data?.data || data || [];
  console.log('Processed transactions data:', transactions);

  if (transactions.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Transactions Found</h3>
        <p className="text-muted-foreground mb-4">
          Start by recording your first e-waste transaction.
        </p>
      </div>
    );
  }

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
          <TableCaption>A list of your recent e-waste transactions</TableCaption>
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
            {transactions.map((transaction: Transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>
                  {format(new Date(transaction.date), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell className="font-medium">{transaction.wasteType}</TableCell>
                <TableCell>
                  {transaction.quantity} {transaction.unit}
                </TableCell>
                <TableCell>{transaction.location}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={getStatusColor(transaction.status)}
                  >
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {transaction.description || '—'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
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
    </div>
  );
};

export default TransactionList;