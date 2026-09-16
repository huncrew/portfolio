import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "grantedison — AI architecture, pre-sales and delivery on AWS",
  description:
    "An independent UK AI practice working with AWS partners, integrators "
    + "and end clients — solutions architecture, pre-sales and hands-on "
    + "build of agentic systems on Bedrock and AgentCore, with a deep "
    + "specialism in the new Amazon Connect stack. SC cleared.",
  metadataBase: new URL("https://grantedison.com"),
  openGraph: {
    title: "grantedison — AI architecture, pre-sales and delivery on AWS",
    description:
      "Solutions architecture, pre-sales and delivery of agentic AI on AWS, "
      + "through partners or direct. SC cleared, UK-based.",
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
