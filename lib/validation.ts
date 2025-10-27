import { z } from 'zod';

export const contributorSchema = z.object({
  firstName: z
    .string()
    .min(2, 'validation:nameMinLength')
    .max(30, 'validation:nameMaxLength')
    .regex(/^[a-zA-ZÀ-ž\s'-]+$/, 'validation:invalidName'),
  lastName: z
    .string()
    .min(2, 'validation:nameMinLength')
    .max(30, 'validation:nameMaxLength')
    .regex(/^[a-zA-ZÀ-ž\s'-]+$/, 'validation:invalidName'),
  email: z
    .string()
    .email('validation:invalidEmail')
    .max(50, 'validation:maxLength'),
  phone: z
    .string()
    .regex(/^[0-9\s]{7,15}$/, 'validation:invalidPhone')
    .optional()
    .or(z.literal('')),
  countryCode: z.string().optional(),
});

export type ContributorData = z.infer<typeof contributorSchema>;

const step1BaseSchema = z.object({
  donationType: z.enum(['specific', 'general']),
  selectedShelterId: z.string().optional(),
  donationAmount: z.number().min(1, { 
    message: 'validation:minAmount'
  }).max(10000, { 
    message: 'validation:maxAmount'
  }),
});

export const step1Schema = step1BaseSchema.refine(
  (data) => {
    if (data.donationType === 'specific') {
      return data.selectedShelterId && data.selectedShelterId.length > 0 && data.selectedShelterId !== 'none';
    }
    return true;
  },
  {
    message: 'validation:selectShelterRequired',
    path: ['selectedShelterId'],
  }
);

export type Step1FormData = z.infer<typeof step1BaseSchema>;

export const step2Schema = z.object({
  firstName: z
    .string()
    .min(2, 'validation:nameMinLength')
    .max(30, 'validation:nameMaxLength')
    .regex(/^[a-zA-ZÀ-ž\s'-]+$/, 'validation:invalidName'),
  lastName: z
    .string()
    .min(2, 'validation:nameMinLength')
    .max(30, 'validation:nameMaxLength')
    .regex(/^[a-zA-ZÀ-ž\s'-]+$/, 'validation:invalidName'),
  email: z
    .string()
    .email('validation:invalidEmail')
    .max(255, 'validation:maxLength'),
  phone: z
    .string()
    .regex(/^[0-9\s]{7,15}$/, 'validation:invalidPhone')
    .optional()
    .or(z.literal('')),
  additionalContributors: z.array(contributorSchema).optional(),
});

export type Step2FormData = z.infer<typeof step2Schema>;

export const step3Schema = z.object({
  consent: z.boolean().refine((val) => val === true, {
    message: 'validation:consentRequired',
  }),
});

export type Step3FormData = z.infer<typeof step3Schema>;

export const donationFormSchema = step1BaseSchema.merge(step2Schema).merge(step3Schema).refine(
  (data) => {
    if (data.donationType === 'specific') {
      return data.selectedShelterId && data.selectedShelterId.length > 0 && data.selectedShelterId !== 'none';
    }
    return true;
  },
  {
    message: 'validation:selectShelterRequired',
    path: ['selectedShelterId'],
  }
);

export type DonationFormData = z.infer<typeof donationFormSchema>;

export const emailSchema = z.string().email('validation:invalidEmail');

export const requiredStringSchema = (minLength = 1) =>
  z.string().min(minLength, 'validation:required');
