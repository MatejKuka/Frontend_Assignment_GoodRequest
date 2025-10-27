import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Control } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useShelters } from '@/hooks/useShelters';
import { Step1FormData } from '@/lib/validation';
import { text } from '@/styles/typography';

interface ShelterSelectProps {
  control: Control<Step1FormData>;
  disabled?: boolean;
}

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h3`
  ${text('md', 'semibold')}
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const ShelterSelect: React.FC<ShelterSelectProps> = ({
  control,
  disabled = false,
}) => {
  const { t } = useTranslation('form');
  const { data: shelters = [], isLoading } = useShelters();

  return (
    <SectionWrapper>
      <SectionTitle>{t('projectSection')}</SectionTitle>
      <FormField
        control={control}
        name="selectedShelterId"
        render={({ field }) => (
          <FormItem>
            <FormLabel labelSize="sm" labelVariant="medium">{t('shelterLabel')}</FormLabel>
            <FormControl>
              <Select 
                value={field.value} 
                onValueChange={field.onChange} 
                disabled={disabled || isLoading}
              >
                <SelectTrigger className="w-full" disabled={disabled || isLoading}>
                  <SelectValue placeholder={isLoading ? 'Loading shelters...' : t('selectShelter')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{t('noShelterSelected')}</SelectItem>
                  {shelters.map((shelter) => (
                    <SelectItem key={shelter.id} value={String(shelter.id)}>
                      {shelter.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </SectionWrapper>
  );
};
