import React from "react";
import styled from "styled-components";
import { heading, text } from "@/styles/typography";
import { Skeleton } from "@/components/ui/skeleton";

const StatCardContainer = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  ${heading("xl", "semibold")}
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${heading("lg", "semibold")}
  }
`;

const StatLabel = styled.div`
  ${text("lg", "medium")}
  color: ${({ theme }) => theme.colors.foreground};
`;

interface StatCardProps {
  value: string | number;
  label: string;
  isLoading?: boolean;
  isError?: boolean;
  ariaLabel?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  isLoading = false,
  isError = false,
  ariaLabel,
}) => {
  const displayValue = () => {
    if (isLoading) {
      return <Skeleton className="h-12 w-32 mx-auto mb-2" aria-label={ariaLabel} />;
    }
    if (isError) {
      return "--";
    }
    return value;
  };

  return (
    <StatCardContainer>
      <StatValue aria-label={ariaLabel}>
        {displayValue()}
      </StatValue>
      <StatLabel>{label}</StatLabel>
    </StatCardContainer>
  );
};
