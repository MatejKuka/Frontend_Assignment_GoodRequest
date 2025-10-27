import React from "react";
import styled from "styled-components";
import { text } from "@/styles/typography";

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

const InfoLabel = styled.span`
  ${text("md", "regular")}
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const InfoValue = styled.span`
  ${text("md", "semibold")}
  color: ${({ theme }) => theme.colors.text};
  text-align: right;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    text-align: left;
  }
`;

interface SummaryInfoRowProps {
  label: string;
  value: React.ReactNode;
}

export const SummaryInfoRow: React.FC<SummaryInfoRowProps> = ({ label, value }) => {
  return (
    <InfoRow>
      <InfoLabel>{label}</InfoLabel>
      <InfoValue>{value}</InfoValue>
    </InfoRow>
  );
};
