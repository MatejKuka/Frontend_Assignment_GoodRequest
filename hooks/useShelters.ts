import { useQuery } from '@tanstack/react-query';
import { getShelters } from '@/services/api';

export const useShelters = () => {
  return useQuery({
    queryKey: ['shelters'],
    queryFn: getShelters,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
