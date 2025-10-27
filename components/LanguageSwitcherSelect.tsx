import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import gbFlag from '@/assets/flags/gb.svg';
import skFlag from '@/assets/flags/sk.svg';
import Image from 'next/image';

const SelectWrapper = styled.div`
  .select-trigger {
    min-width: 60px;
    background: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    
    &:hover {
      background: ${({ theme }) => theme.colors.muted};
    }
  }
`;

const LanguageOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FlagIcon = styled(Image)`
  width: 20px;
  height: 15px;
  object-fit: cover;
  border-radius: 2px;
`;

export const LanguageSwitcherSelect: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <SelectWrapper>
      <Select value={i18n.language} onValueChange={i18n.changeLanguage}>
        <SelectTrigger className="select-trigger" aria-label="Change language">
          <SelectValue>
            <FlagIcon 
              src={i18n.language === 'en' ? gbFlag : skFlag} 
              alt="" 
              aria-hidden="true"
            />
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en" aria-label="Switch to English">
            <FlagIcon src={gbFlag} alt="" aria-hidden="true" />
          </SelectItem>
          <SelectItem value="sk" aria-label="Switch to Slovak">
            <FlagIcon src={skFlag} alt="" aria-hidden="true" />
          </SelectItem>
        </SelectContent>
      </Select>
    </SelectWrapper>
  );
};
