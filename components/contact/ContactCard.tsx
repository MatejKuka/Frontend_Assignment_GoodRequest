import React from "react";
import styled from "styled-components";
import { LucideIcon } from "lucide-react";
import { text } from '@/styles/typography';

const ContactCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary.main};
  background-color: ${({ theme }) => theme.colors.iconContainer.bg};
  border-radius: 10px;
`;

const ContactTitle = styled.h3`
  ${text('xl', 'semibold')}
  color: ${({ theme }) => theme.colors.foreground};
`;

const ContactDescription = styled.p`
  ${text('md', 'regular')}
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ContactLink = styled.a`
  ${text('md', 'medium')}
  color: ${({ theme }) => theme.colors.primary.main};
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
  linkAriaLabel?: string;
  linkTarget?: string;
  linkRel?: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({
  icon: Icon,
  title,
  description,
  linkText,
  linkHref,
  linkAriaLabel,
  linkTarget,
  linkRel,
}) => {
  return (
    <ContactCardContainer>
      <IconWrapper aria-hidden="true">
        <Icon size={32} />
      </IconWrapper>
      <ContactTitle>{title}</ContactTitle>
      <ContactDescription>{description}</ContactDescription>
      <ContactLink
        href={linkHref}
        aria-label={linkAriaLabel}
        target={linkTarget}
        rel={linkRel}
      >
        {linkText}
      </ContactLink>
    </ContactCardContainer>
  );
};
