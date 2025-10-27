import React from "react";
import styled from "styled-components";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { text } from "@/styles/typography";

const PhoneInputWrapper = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const CountrySelectWrapper = styled.div`
  width: 80px;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 70px;
  }

  button {
    height: 56px;
    padding: 16px 12px;
  }
`;

const PhoneNumberWrapper = styled.div`
  flex: 1;
  position: relative;
`;

const CountryCodePrefix = styled.span`
  position: absolute;
  left: 12px;
  top: 13.5px;
  color: ${({ theme }) => theme.colors.formInput.text};
  ${text("md", "regular")}
  pointer-events: none;
  user-select: none;
  z-index: 1;
  background: transparent;
`;

const StyledInput = styled(Input)`
  padding-left: 55px !important;
`;

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  countryCode: string;
  onCountryCodeChange: (code: string) => void;
}

const countries = [
  { code: "+421", flag: "🇸🇰", name: "Slovakia" },
  { code: "+420", flag: "🇨🇿", name: "Czech Republic" },
];

export const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange, countryCode, onCountryCodeChange }) => {
  const selectedCountry = countries.find((c) => c.code === countryCode) || countries[0];

  return (
    <PhoneInputWrapper>
      <CountrySelectWrapper>
        <Select value={countryCode} onValueChange={onCountryCodeChange}>
          <SelectTrigger>
            <SelectValue>
              <span style={{ fontSize: '24px' }}>{selectedCountry.flag}</span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <span style={{ fontSize: '24px' }}>{country.flag}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CountrySelectWrapper>

      <PhoneNumberWrapper>
        <CountryCodePrefix>{countryCode}</CountryCodePrefix>
        <StyledInput type="tel" placeholder="123 456 789" value={value} onChange={(e) => onChange(e.target.value)} />
      </PhoneNumberWrapper>
    </PhoneInputWrapper>
  );
};
