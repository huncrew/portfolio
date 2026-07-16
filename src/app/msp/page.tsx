import type { Metadata } from "next";
import MspPage from "./msp-page";

export const metadata: Metadata = {
  title: "AI Automation for MSPs | Grant Edison",
  description:
    "An AI service desk for managed service providers: verify callers, resolve Microsoft 365 requests end-to-end, automate internal operations, and route everything else to engineers with full context.",
  keywords: [
    "MSP Automation",
    "AI Service Desk",
    "Amazon Connect",
    "Bedrock AgentCore",
    "Claude Agent SDK",
    "Microsoft 365 Automation",
    "Help Desk AI",
    "PSA Integration",
    "Managed Service Provider AI",
  ],
  openGraph: {
    title: "AI Automation for MSPs | Grant Edison",
    description:
      "An AI front door for your service desk: verified callers, end-to-end Microsoft 365 resolution, and automated internal operations — every action audited in your PSA.",
    url: "https://grantedison.com/msp",
    siteName: "Grant Edison",
    type: "website",
  },
};

export default function Page() {
  return <MspPage />;
}
