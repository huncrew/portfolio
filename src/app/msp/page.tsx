import type { Metadata } from "next";
import MspPage from "./msp-page";

export const metadata: Metadata = {
  title: "AI Automation for MSPs | Grant Edison",
  description:
    "AI agents for managed service providers: automate internal operations — bids, onboarding, licence management, alert triage — and resolve customer Microsoft 365 requests end-to-end, with every action audited.",
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
      "AI agents for MSP internal operations and customer service desks — verified, governed, and audited in your PSA.",
    url: "https://grantedison.com/msp",
    siteName: "Grant Edison",
    type: "website",
  },
};

export default function Page() {
  return <MspPage />;
}
