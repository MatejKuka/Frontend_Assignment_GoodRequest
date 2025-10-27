import { useMutation } from '@tanstack/react-query';
import { submitDonation, DonationPayload } from '@/services/api';

export const useSubmitDonation = () => {
  return useMutation({
    mutationFn: (payload: DonationPayload) => submitDonation(payload),
  });
};
