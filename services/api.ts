const API_BASE_URL = 'https://frontend-assignment-api.goodrequest.dev/api/v1';

export interface ShelterResults {
  contributors: number;
  contribution: number;
}

export interface Shelter {
  id: number;
  name: string;
}

interface SheltersResponse {
  shelters: Shelter[];
}

export const getShelterResults = async (): Promise<ShelterResults> => {
  const response = await fetch(`${API_BASE_URL}/shelters/results`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch shelter results');
  }
  
  return response.json();
};

export const getShelters = async (): Promise<Shelter[]> => {
  const response = await fetch(`${API_BASE_URL}/shelters`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch shelters');
  }
  
  const data: SheltersResponse = await response.json();
  return data.shelters;
};

export interface ContributorPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

export interface DonationPayload {
  contributors: ContributorPayload[];
  shelterID: number;
  value: number;
}

export interface DonationResponse {
  success?: boolean;
  message?: string;
}

export const submitDonation = async (payload: DonationPayload): Promise<DonationResponse> => {
  const response = await fetch(`${API_BASE_URL}/shelters/contribute`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to submit donation');
  }

  return response.json();
};
