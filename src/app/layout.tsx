import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Grant Edison | Enterprise AI Systems Architecture",
  description:
    "We build agentic AI systems, real-time ML pipelines, and production-grade cloud architectures for enterprises that need AI to work, not just exist.",
  keywords: [
    "AI Consulting",
    "AI Systems Architecture",
    "Agentic AI",
    "LangGraph",
    "AWS Bedrock",
    "RAG Systems",
    "Machine Learning",
    "GenAI",
    "Cloud Architecture",
    "Contact Centre AI",
    "Enterprise AI",
  ],
  authors: [{ name: "Grant Edison" }],
  openGraph: {
    title: "Grant Edison | Enterprise AI Systems Architecture",
    description:
      "We build agentic AI systems, real-time ML pipelines, and production-grade cloud architectures for enterprises.",
    url: "https://grantedison.com",
    siteName: "Grant Edison",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grant Edison | Enterprise AI Systems Architecture",
    description:
      "We build agentic AI systems, real-time ML pipelines, and production-grade cloud architectures.",
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
