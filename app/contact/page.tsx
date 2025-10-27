"use client";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Mail, MapPin, Phone } from "lucide-react";
import { Footer } from "@/components/Footer";
import { StructuredData } from "@/components/seo/StructuredData";
import { ContactCard } from "@/components/contact/ContactCard";
import { BackButton } from "@/components/ui/BackButton";
import contactDogImage from "@/assets/contact-dog.jpg";
import { heading, text } from '@/styles/typography';
import Image from "next/image";

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const PageContainer = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;


const Title = styled.h1`
  ${heading('lg', 'bold')}
  color: ${({ theme }) => theme.colors.foreground};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    ${heading('md', 'bold')}
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing["2xl"]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;


const ImageContainer = styled.div`
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  padding: 0 25px;
`;

const DogImage = styled(Image)`
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  max-height: 340px;
  border-radius: 20px;
`;

export default function ContactPage () {
  const { t } = useTranslation("common");

  return (
    <>
      <PageWrapper>
        <PageContainer id="main-content" role="main" aria-label="Contact information">
        <BackButton/>

        <Title>{t("contactPage.title")}</Title>
        <ContactGrid>
          <ContactCard
            icon={Mail}
            title={t("contactPage.email.title")}
            description={t("contactPage.email.description")}
            linkText="hello@goodrequest.com"
            linkHref="mailto:hello@goodrequest.com"
            linkAriaLabel={`Send email to "hello@goodrequest.com"`}
          />
          <ContactCard
            icon={MapPin}
            title={t("contactPage.office.title")}
            description={t("contactPage.office.description")}
            linkText="Obchodná 3D, 010 08 Žilina, Slovakia"
            linkHref="https://maps.google.com/?q=Obchodná+3D,+010+08+Žilina,+Slovakia"
            linkAriaLabel={`View office location on map: Obchodná 3D, 010 08 Žilina, Slovakia`}
            linkTarget="_blank"
            linkRel="noopener noreferrer"
          />
          <ContactCard
            icon={Phone}
            title={t("contactPage.phone.title")}
            description={t("contactPage.phone.description")}
            linkText="+421 911 750 750"
            linkHref="tel:+421 911 750 750"
            linkAriaLabel={`Call phone number +421 911 750 750`}
          />
        </ContactGrid>

        <ImageContainer>
          <DogImage 
            src={contactDogImage} 
            alt="Happy Golden Retriever on beach after successful shelter adoption, representing hope for rescued dogs" 
          />
        </ImageContainer>
        <Footer />
      </PageContainer>
    </PageWrapper>
    <StructuredData
      data={{
        type: 'WebPage',
        name: t('seo.contact.title'),
        description: t('seo.contact.description'),
        url: 'https://goodboyfoundation.sk/contact'
      }}
    />
    </>
  );
};