"use client";
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { heading, text } from "@/styles/typography";

const FeaturesContainer = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing["2xl"]};
`;

const SectionLabel = styled.h2`
  ${text("xs", "semibold")}
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-align: center;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const FeatureCard = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  transition: all 0.3s ease;
  background: ${({ theme }) => theme.colors.card.main};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const IconCircle = styled.div`
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.iconContainer.bg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

const FeatureText = styled.span`
  ${text("md", "regular")}
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;

const SubLabel = styled.h3`
  ${text("xs", "semibold")}
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-align: center;
`;

const SubSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing["2xl"]};
`;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const FeaturesListComponent: React.FC = () => {
  const { t } = useTranslation("common");

  const criteriaMet: string[] = [
    "features.nextjs",
    "features.typescript",
    "features.tanstackQuery",
    "features.clientState",
    "features.formLibrary",
    "features.projectStructure",
  ];

  const niceToHave: string[] = [
    "features.localization",
    "features.styledComponents",
    "features.zodValidation",
    "features.accessibility",
    "features.responsive",
    "features.seo",
    "features.multipleDonors",
  ];

  return (
    <FeaturesContainer>
      <SectionLabel>{t("homepage.featuresTitle")}</SectionLabel>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <FeaturesGrid>
          {criteriaMet.map((feature, index) => (
            <FeatureCard key={index} variants={cardVariants} transition={{ duration: 0.4, ease: "easeOut" }}>
              <IconCircle>
                <Check size={18} strokeWidth={2.5} />
              </IconCircle>
              <FeatureText>{t(feature)}</FeatureText>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </motion.div>

      <SubSection>
        <SubLabel>{t("features.niceToHaveTitle")}</SubLabel>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <FeaturesGrid>
            {niceToHave.map((feature, index) => (
              <FeatureCard key={index} variants={cardVariants} transition={{ duration: 0.4, ease: "easeOut" }}>
                <IconCircle>
                  <Check size={18} strokeWidth={2.5} />
                </IconCircle>
                <FeatureText>{t(feature)}</FeatureText>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </motion.div>
      </SubSection>
    </FeaturesContainer>
  );
};
