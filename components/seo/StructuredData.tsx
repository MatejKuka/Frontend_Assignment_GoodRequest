import React from 'react';

interface OrganizationSchema {
  type: 'Organization';
  name: string;
  url: string;
  logo: string;
  description: string;
  contactPoint?: {
    telephone: string;
    email: string;
    contactType: string;
  };
  sameAs?: string[];
}

interface WebPageSchema {
  type: 'WebPage';
  name: string;
  description: string;
  url: string;
}

interface BreadcrumbSchema {
  type: 'BreadcrumbList';
  items: Array<{
    name: string;
    url: string;
  }>;
}

type StructuredDataSchema = OrganizationSchema | WebPageSchema | BreadcrumbSchema;

interface StructuredDataProps {
  data: StructuredDataSchema;
}

const generateJSONLD = (data: StructuredDataSchema) => {
  switch (data.type) {
    case 'Organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: data.name,
        url: data.url,
        logo: data.logo,
        description: data.description,
        ...(data.contactPoint && {
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: data.contactPoint.telephone,
            email: data.contactPoint.email,
            contactType: data.contactPoint.contactType,
          },
        }),
        ...(data.sameAs && { sameAs: data.sameAs }),
      };
    case 'WebPage':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: data.name,
        description: data.description,
        url: data.url,
      };
    case 'BreadcrumbList':
      return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      };
    default:
      return {};
  }
};

export const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  const jsonLD = generateJSONLD(data);

  return (
      <script type="application/ld+json">
        {JSON.stringify(jsonLD)}
      </script>
  );
};
