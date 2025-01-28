"use client";
import { useState } from "react";
// import Image from "next/image";

export default function Home() {
  // State to track which project or blog post is currently selected for the modal
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  // Added services data
  const services = [
    {
      title: "Serverless Architecture Audit",
      description:
        "Identify cost savings and performance improvements in your existing AWS setup",
      icon: "🔍",
      benefits: [
        "48-hour comprehensive review",
        "Actionable optimization plan",
        "CI/CD pipeline assessment",
      ],
    },
    {
      title: "Rapid MVP Development",
      description:
        "Go from idea to production in weeks with CDK-powered infrastructure",
      icon: "🚀",
      benefits: [
        "Pre-built serverless patterns",
        "Monorepo best practices",
        "AI-assisted development",
      ],
    },
    {
      title: "Enterprise-Grade CDK Constructs",
      description:
        "Modular, reusable infrastructure components for your team",
      icon: "🧩",
      benefits: [
        "TypeScript-first development",
        "Built-in security controls",
        "Documentation & onboarding",
      ],
    },
  ];

  // Sample data for projects
  const projects = [
    {
      id: 1,
      title: "AI-Powered Customer Insights Platform",
      summary: "Real-time feedback analysis using Lambda & OpenAI",
      technologies: ["CDK", "TypeScript", "DynamoDB", "React", "OpenAI API"],
      outcomes: [
        "60% reduction in infrastructure costs",
        "Real-time sentiment analysis",
        // Use a React fragment or explicitly map out the element with key
        (
          <span key="monorepo-1">
            Modular monorepo with <code>npm workspaces</code>
          </span>
        ),
      ],
      details: `
**Monorepo Setup**  
- Using TypeScript across all services for consistency and reusability.
- Lambda functions, React front-end, and shared libraries all live in one repository (npm workspaces).
- Streamlines deployments and enables easy local testing of shared modules.

**Microservices & Scalability**  
- Each business capability is a separate Lambda-based microservice.
- Uses AWS CDK to define and provision all resources, allowing quick adjustments and simplified stack management.
- Scalable to millions of users via auto-scaling Lambda, DynamoDB on-demand capacity, and S3 for static assets.

**AI Integration**  
- Leverages OpenAI's APIs for real-time sentiment analysis on user feedback.
- Provides immediate insights into product performance and user sentiment.

**Results**  
- Observed ~60% cost reduction compared to a traditional server-based approach.
- Highly maintainable codebase due to the monorepo approach, consistent TypeScript usage, and CDK best practices.
      `,
    },
    {
      id: 2,
      title: "AI-Driven Customer Sentiment",
      summary: "Amazon Lex, Lambda, DynamoDB, custom NLP for domain queries.",
      technologies: ["CDK", "TypeScript", "DynamoDB", "React", "OpenAI API"],
      outcomes: [
        "60% reduction in infrastructure costs",
        "Real-time sentiment analysis",
        (
          <span key="monorepo-2">
            Modular monorepo with <code>npm workspaces</code>
          </span>
        ),
      ],
      details: `
**Architecture**  
- Orchestrated a serverless conversation flow using Lambda and Lex.  
- Integrated with custom AI/NLP models for domain-specific queries.  
- DynamoDB for session data, logs, and analytics.  

**Design → CDK Code**  
- Lex bots, Lambda functions, roles, and DynamoDB tables all declared in AWS CDK.  
- Fine-tuned for concurrency and cost-effectiveness.  

**Monorepo Setup**  
- All backend services (Lambda layers, shared libraries) and the front-end components share a single TS codebase.
- Faster development and deployment cycles, thanks to consistent TypeScript tooling.

**Scalability & Reliability**  
- Easily handles spikes in traffic with AWS auto-scaling (Lambda + Lex).
- Microservice approach ensures each function can be updated or deployed independently.

**How AI Helped**  
- Custom NLP layering on top of Lex for specialized query understanding.  
- Automated testing with AI-based user scenario generation.  
      `,
    },
    {
      id: 3,
      title: "Social Media Platform",
      summary: "Event-driven Micro-Service setup with SQS/SNS and ALBs.",
      technologies: ["CDK", "TypeScript", "DynamoDB", "React", "OpenAI API"],
      outcomes: [
        "60% reduction in infrastructure costs",
        "Real-time sentiment analysis",
        (
          <span key="monorepo-3">
            Modular monorepo with <code>npm workspaces</code>
          </span>
        ),
      ],
      details: `
**Architecture**  
- Real-time data ingestion with Kinesis streams (for streaming user events).  
- Lambda-based transformations, Glue jobs for deeper ETL.  
- AI-based anomaly detection with Amazon Lookout for Metrics.  
- Microservices communicate via SNS/SQS for decoupled event handling.

**Design → CDK Code**  
- Stacks for Kinesis, Lambda, Glue, SQS, SNS resources.  
- Pipeline-oriented, fully serverless, easy to scale.  
- Atomic data updates in S3 and DynamoDB as needed.  

**Monorepo & TypeScript**  
- Uses npm workspaces to manage shared code among microservices and the front-end.
- Ensures consistent linting, testing, and type definitions across all modules.

**Scalability & High Availability**  
- Scales to millions of events per day with minimal operational overhead.
- Serverless approach reduces cost during off-peak hours.

**How AI Helped**  
- Real-time anomaly detection on streaming data, quick insights and alerts.  
- Automatic detection of unusual behavior or spikes in data.  
      `,
    },
  ];

  // Enhanced blog posts
  const blogPosts = [
    {
      id: 101,
      title: "Using AI Agents to Accelerate Serverless POCs",
      snippet:
        "An in-depth look at how AI agents can automate major parts of the serverless development lifecycle...",
      fullContent: `
# Using AI Agents to Accelerate Serverless POCs

AI agents can drastically reduce time-to-market by automating:
- Code generation
- Testing
- Infrastructure scaffolding

## Providing Context to the AI Model
When using GPT-based models for code generation, we need to supply enough context:
- **Project structure** (e.g., monorepo workspace layout, key dependencies)
- **Infrastructure details** (CDK constructs, Lambdas, environment variables)
- **Desired features or end goal** (user scenarios, acceptance criteria)

**Example Prompt:**
\`\`\`
"You are an AI coding assistant. Our project is a monorepo with a 'core' package for shared utils, 
and multiple Lambda functions under 'services/'. 
Please create a new Lambda function for the 'billing' service that uses the core utilities to handle payments. 
We use TypeScript and AWS CDK for deployment. 
Generate the function code and the CDK stack definitions."
\`\`\`

## Construct & Example Blocks
For instance, we might define a new SNS topic and subscription in CDK:

\`\`\`ts
import { Construct } from 'constructs';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { LambdaSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';

export class BillingStack extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const billingTopic = new Topic(this, 'BillingTopic');

    const billingLambda = new Function(this, 'BillingLambda', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: Code.fromAsset('services/billing/dist'),
    });

    // Let SNS invoke the Lambda
    billingTopic.addSubscription(new LambdaSubscription(billingLambda));
  }
}
\`\`\`

## SNS Message Envelope
When using SNS in a serverless architecture, the AI code generator might also need to format payloads properly:

\`\`\`json
{
  "Records": [
    {
      "Sns": {
        "MessageId": "abc-123",
        "Message": "{\\"action\\":\\"chargeUser\\",\\"amount\\":\\"49.99\\"}",
        "Timestamp": "2025-01-26T14:30:00.000Z"
      }
    }
  ]
}
\`\`\`

**Summary:**
- By providing context around the code structure and architecture in prompts, we get more relevant AI-generated solutions.
- AI agents can write code stubs, add new constructs, and handle SNS message envelopes consistently, accelerating the POC phase.
      `,
    },
    {
      id: 102,
      title: "Scaling with AWS CDK & ACID Principles",
      snippet:
        "Ensuring data consistency and atomic transactions in DynamoDB using the power of AWS CDK...",
      fullContent: `
# Scaling with AWS CDK & ACID Principles

When building large-scale serverless apps, data consistency is crucial.

## DynamoDB Transactions
- DynamoDB provides ACID transactions for multi-item updates.
- AWS CDK can easily define tables with transaction support.

### Example CDK Snippet
\`\`\`ts
import { DynamoEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { Table, BillingMode, AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';

const table = new Table(this, 'MyTable', {
  partitionKey: { name: 'PK', type: AttributeType.STRING },
  sortKey: { name: 'SK', type: AttributeType.STRING },
  billingMode: BillingMode.PAY_PER_REQUEST,
  stream: StreamViewType.NEW_AND_OLD_IMAGES,
});

// Lambda to handle transaction logic
const transactionLambda = new Function(this, 'TransactionLambda', {
  runtime: Runtime.NODEJS_18_X,
  handler: 'index.handler',
  code: Code.fromAsset('services/transactions/dist'),
});

// Attach table stream to the Lambda if needed
transactionLambda.addEventSource(
  new DynamoEventSource(table, {
    startingPosition: StartingPosition.LATEST,
    batchSize: 5,
  })
);
\`\`\`

## Sending Context for AI-Generated Transaction Logic
When requesting the AI model to generate transaction logic, include:
- **Table schema** (primary key, sort key, attribute definitions)
- **Business rules** (atomic updates for multi-step operations, rollbacks)
- **Expected concurrency** (so the AI can suggest design patterns like optimistic locking if needed)

**Prompt Example:**
\`\`\`
"We have a table with primary key PK, sort key SK, storing order records. 
We need a transaction that updates user balances and order status simultaneously. 
Generate a code snippet in TypeScript for a Lambda that performs ACID updates with 
DynamoDB's TransactWriteItems."
\`\`\`

## SNS Envelopes in Large-Scale Systems
- For some workflows, you might publish events to SNS after a successful transaction. 
- Provide your AI model with the JSON schema or interface of the SNS message, so it can generate the correct publisher code and subscriber code.

\`\`\`ts
await sns.publish({
  TopicArn: billingTopicArn,
  Message: JSON.stringify({
    action: 'orderCompleted',
    userId: '123',
    orderId: 'ABC',
    status: 'CONFIRMED'
  }),
});
\`\`\`

**Why ACID?**
- Guarantees data correctness in multi-step operations
- Avoids partial updates that lead to inconsistent states
- Scales while maintaining strong data integrity

**Conclusion:**
With AWS CDK’s straightforward table definitions and DynamoDB’s ACID transactions, it’s simpler than ever to build large-scale, highly consistent serverless applications. Proper context to AI agents ensures the generated code adheres to these best practices.
      `,
    },
  ];

  // Helper functions to open/close modals
  const openProjectModal = (id: number) => setSelectedProjectId(id);
  const closeProjectModal = () => setSelectedProjectId(null);

  const openBlogModal = (id: number) => setSelectedBlogId(id);
  const closeBlogModal = () => setSelectedBlogId(null);

  return (
    <div className="bg-[#0C1B2A] text-white min-h-screen w-full flex flex-col">
      {/* HEADER - Added GitHub/LinkedIn */}
      <header className="w-full py-4 px-8 flex items-center justify-between bg-[#0C1B2A]">
        <nav className="flex gap-4">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#services" className="hover:underline">Services</a>
          <a href="#portfolio" className="hover:underline">Work</a>
          <a href="#blog" className="hover:underline">Insights</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
        <div className="flex gap-4">
          <a
            href="https://github.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75"
          >
            LinkedIn
          </a>
        </div>
      </header>

      {/* ENHANCED HERO SECTION */}
      <section id="home" className="px-8 py-20 sm:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Serverless AWS Architect
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Helping startups build scalable, cost-effective infrastructure with AWS CDK and AI-powered development
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#services"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full transition-colors flex items-center"
            >
              <span className="mr-2">🏗️</span> View Services
            </a>
            <a
              href="#contact"
              className="border border-blue-500 text-blue-300 hover:bg-blue-900/20 py-3 px-8 rounded-full transition-colors"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </section>

      {/* NEW SERVICES SECTION */}
      <section id="services" className="px-8 py-16 bg-[#0F2233]">
        <h2 className="text-3xl font-bold mb-12 text-center">Specialized Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={`service-${index}`}
              className="bg-[#14293E] p-6 rounded-xl border border-[#1F3A4E] hover:border-blue-500 transition-colors"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-300 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.benefits.map((benefit, i) => (
                  <li key={`benefit-${i}`} className="flex items-center text-sm">
                    <span className="text-blue-400 mr-2">✓</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ENHANCED PORTFOLIO SECTION */}
      <section id="portfolio" className="px-8 py-16 bg-[#0C1B2A]">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((proj) => (
            <div
              key={`project-${proj.id}`}
              className="bg-[#14293E] rounded-xl p-6 border border-[#1F3A4E]"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold">{proj.title}</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {proj.technologies.map((tech, i) => (
                    <span
                      key={`tech-${proj.id}-${i}`}
                      className="px-2 py-1 bg-[#1F3A4E] text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <ul className="space-y-2 mb-4">
                {proj.outcomes.map((outcome, i) => (
                  <li key={`outcome-${proj.id}-${i}`} className="flex items-center text-sm">
                    <span className="text-blue-400 mr-2">→</span>
                    {outcome}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => openProjectModal(proj.id)}
                className="mt-4 text-blue-400 hover:text-blue-300 flex items-center"
              >
                View Case Study
                <span className="ml-2">↗</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ENHANCED BLOG SECTION */}
      <section id="blog" className="px-8 py-16 bg-[#0F2233]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Technical Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article
                key={`blog-${post.id}`}
                className="bg-[#14293E] p-6 rounded-xl border border-[#1F3A4E]"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-[#1F3A4E] text-sm rounded-full">
                      CDK Patterns
                    </span>
                    <span className="px-2 py-1 bg-[#1F3A4E] text-sm rounded-full">
                      AI Integration
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{post.snippet}</p>
                <button
                  onClick={() => openBlogModal(post.id)}
                  className="text-blue-400 hover:text-blue-300 flex items-center"
                >
                  Read Article
                  <span className="ml-2">→</span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="px-8 py-16 bg-[#0F2233]">
        <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
        <div className="max-w-xl mx-auto">
          <p className="text-center text-gray-300 mb-6">
            If you’d like to discuss potential collaboration, feel free to drop
            a message below or reach out via LinkedIn/GitHub.
          </p>
          {/* Simple contact form (no actual submission logic here) */}
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="px-4 py-2 rounded bg-[#14293E] text-white focus:outline-none"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 rounded bg-[#14293E] text-white focus:outline-none"
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              className="px-4 py-2 rounded bg-[#14293E] text-white focus:outline-none"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full transition-colors w-fit self-center"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0C1B2A] py-6 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} My Serverless & AI Portfolio. All rights reserved.
        </p>
      </footer>

      {/* PROJECT MODAL */}
      {selectedProjectId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-[#1A2D3F] p-6 max-w-2xl w-full rounded relative mx-4">
            <button
              onClick={closeProjectModal}
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
            >
              ✕
            </button>
            {projects
              .filter((p) => p.id === selectedProjectId)
              .map((p) => (
                <div key={`modal-project-${p.id}`} className="overflow-y-auto max-h-[80vh] pr-2">
                  <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
                  {/* You could parse Markdown here if desired, or just show text */}
                  <div className="prose prose-invert text-sm whitespace-pre-wrap">
                    {p.details}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* BLOG MODAL */}
      {selectedBlogId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-[#1A2D3F] p-6 max-w-2xl w-full rounded relative mx-4">
            <button
              onClick={closeBlogModal}
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
            >
              ✕
            </button>
            {blogPosts
              .filter((b) => b.id === selectedBlogId)
              .map((b) => (
                <div key={`modal-blog-${b.id}`} className="overflow-y-auto max-h-[80vh] pr-2">
                  <h3 className="text-2xl font-bold mb-4">{b.title}</h3>
                  <div className="prose prose-invert text-sm whitespace-pre-wrap">
                    {b.fullContent}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
