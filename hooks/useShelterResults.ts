import { useQuery } from '@tanstack/react-query';
import { getShelterResults } from '@/services/api';

export const useShelterResults = () => {
  return useQuery({
    queryKey: ['shelterResults'],
    queryFn: getShelterResults,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
