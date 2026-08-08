import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "grantedison — the UK specialists in agentic Amazon Connect",
  description:
    "AI contact centres and agentic automation on the new Amazon Connect "
    + "stack — Nova Sonic voice, Bedrock AgentCore, provable authorisation "
    + "gates — designed, built and handed over in your own AWS account.",
  metadataBase: new URL("https://grantedison.com"),
  openGraph: {
    title: "grantedison — the UK specialists in agentic Amazon Connect",
    description:
      "AI contact centres and agentic automation on the new Amazon Connect "
      + "stack, delivered in your own AWS account. SC cleared, UK-based.",
    url: "https://grantedison.com",
    siteName: "grantedison",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <body className="antialiased">{children}</body>
    </html>
  );
}
