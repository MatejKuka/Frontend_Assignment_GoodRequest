"use client";
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { text } from "@/styles/typography";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import facebookIcon from "@/assets/facebook-icon.svg";
import instagramIcon from "@/assets/instagram-icon.svg";
import { LanguageSwitcherSelect } from "@/components/LanguageSwitcherSelect";
import Image from "next/image";

const FooterContainer = styled.footer`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
`;

const FooterContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 0 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.xl};
    align-items: center;
    padding-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  text-decoration: none;
`;

const LogoImage = styled(Image)`
  height: 32px;
  width: auto;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  img {
    width: 16px;
    height: 16px;
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      width: 30px;
      height: 30px;
    }
  }
`;

const Navigation = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.lg};
    width: 100%;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const NavLink = styled(Link)`
  ${text("md", "regular")}
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${text("xl", "regular")}
  }
`;

export const Footer: React.FC = () => {
  const { t } = useTranslation("common");

  return (
    <FooterContainer>
      <FooterContent>
        <LogoWrapper href="/" aria-label="Go to homepage">
          <LogoImage src={logo} alt="GoodBoy Foundation - Supporting Slovak Dog Shelters" />
        </LogoWrapper>

        <Navigation aria-label="Footer navigation">
          <SocialIcons>
            <SocialIcon 
              href="https://www.facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
            >
              <Image src={facebookIcon} alt="Facebook" aria-hidden="true" />
            </SocialIcon>
            <SocialIcon 
              href="https://www.instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visit our Instagram page"
            >
              <Image src={instagramIcon} alt="Instagram" aria-hidden="true" />
            </SocialIcon>
          </SocialIcons>
          <NavLink href="/contact" aria-label="Navigate to contact page">{t("contact")}</NavLink>
          <NavLink href="/about-project" aria-label="Navigate to about project page">{t("aboutProject")}</NavLink>
          <LanguageSwitcherSelect />
        </Navigation>
      </FooterContent>
    </FooterContainer>
  );
};
