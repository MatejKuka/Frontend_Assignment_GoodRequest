"use client";
import React from "react";
import { ThemeProvider } from "styled-components";
import { TooltipProvider } from "@/components/ui/tooltip";
import { theme } from "@/styles/theme";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { FormProvider } from "@/contexts/FormContext";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/config";

const queryClient = new QueryClient();

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <FormProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              {children}
            </TooltipProvider>
          </FormProvider>
        </ThemeProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}
