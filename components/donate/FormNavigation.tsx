import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { text } from '@/styles/typography';

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column-reverse;
  }
`;

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 1rem 2rem;
  height: auto;
  ${text('md', 'medium')}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    justify-content: center;
  }
`;

interface FormNavigationProps {
  onBack: () => void;
  onContinue: () => void;
  isSubmitting?: boolean;
  isLastStep?: boolean;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
  onBack,
  onContinue,
  isSubmitting = false,
  isLastStep = false,
}) => {
  const { t } = useTranslation('form');

  return (
    <NavigationButtons>
      <StyledButton 
        type="button" 
        variant="back" 
        onClick={onBack}
        aria-label={t('back')}
      >
        <ArrowLeft size={20} aria-hidden="true" />
        {t('back')}
      </StyledButton>
      <StyledButton 
        type="button" 
        variant="default" 
        onClick={onContinue} 
        disabled={isSubmitting}
        aria-label={isLastStep ? t('submitForm') : t('continue')}
      >
        {isLastStep ? t('submitForm') : t('continue')}
        {!isLastStep && <ArrowRight size={20} aria-hidden="true" />}
      </StyledButton>
    </NavigationButtons>
  );
};
