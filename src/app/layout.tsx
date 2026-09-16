import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dale Grant | AI Solutions Architect & Pre-sales Lead",
  description:
    "AI solutions architecture, pre-sales and Amazon Connect for financial services and the public sector. Agentic systems on Bedrock and AgentCore — with a live agent demo. SC cleared, UK.",
  keywords: [
    "AI Architect",
    "AWS Architect",
    "Agentic AI",
    "LangGraph",
    "AWS Bedrock",
    "RAG Systems",
    "Machine Learning",
    "GenAI",
    "Cloud Architecture",
    "Serverless",
  ],
  authors: [{ name: "Dale Grant" }],
  openGraph: {
    title: "Dale Grant | Principal AI Systems Architect",
    description:
      "Building agentic AI systems, real-time ML pipelines, and production-grade AWS architectures for enterprise clients.",
    url: "https://dalegrant.dev",
    siteName: "Dale Grant",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dale Grant | Principal AI Systems Architect",
    description:
      "Building agentic AI systems, real-time ML pipelines, and production-grade AWS architectures.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
