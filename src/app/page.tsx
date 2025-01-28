"use client";
import { useState } from "react";

export default function Home() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);

  // Services
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

  // Projects
  const projects = [
    {
      id: 1,
      title: "AI-Powered Customer Insights Platform",
      summary: "Real-time feedback analysis using Lambda & OpenAI",
      technologies: ["CDK", "TypeScript", "DynamoDB", "React", "OpenAI API"],
      outcomes: [
        "Reduced monthly infrastructure spend by 40%",
        "Immediate insight into user satisfaction",
        <span key="monorepo-1">
          Modular monorepo with <code>npm workspaces</code>
        </span>,
      ],
      details: `
Monorepo Setup
- Using TypeScript across all services for consistency and reusability.
- Lambda functions, React front-end, and shared libraries in one repo (npm workspaces).
- Streamlined deployments and easy local testing.

Microservices & Scalability
- Each business capability is a separate Lambda-based microservice.
- Uses AWS CDK for all resources, allowing quick adjustments and simplified stack management.
- Scales to millions of users with auto-scaling Lambda, DynamoDB on-demand, and S3 hosting.

AI Integration
- Leverages OpenAI's APIs for real-time sentiment analysis.
- Delivers continuous insights into user feedback and product performance.

Results
- Maintained high user satisfaction through data-driven decisions.
- Codebase is highly maintainable due to monorepo approach, consistent TypeScript usage, and CDK best practices.
      `,
    },
    {
      id: 2,
      title: "Serverless E-commerce",
      summary: "A microservice-based e-commerce platform using Lambdas and DynamoDB",
      technologies: ["CDK", "TypeScript", "DynamoDB", "React", "API Gateway"],
      outcomes: [
        "Increased conversion rates with a fast, reliable checkout",
        "Seamless integrations for product catalogs and orders",
        <span key="monorepo-2">
          Single repo for front-end, back-end, and shared libraries
        </span>,
      ],
      details: `
Architecture
- Decoupled microservices for orders, inventory, payments, and notifications.
- AWS Lambda functions orchestrated via API Gateway and event-driven workflows.
- DynamoDB for product listings, orders, and user sessions.

Design → CDK Code
- Each microservice defined in its own CDK stack with clear boundaries.
- Automated deployments and safe rollbacks through CI/CD pipelines.
- Scalable to handle holiday traffic spikes without manual intervention.

Monorepo Setup
- Single TypeScript codebase with npm workspaces for shared utilities like authentication, data validation, and logging.
- Faster development with a unified lint/test pipeline.

Scalability & Reliability
- Auto-scaling Lambda ensures consistent performance even during peak loads.
- DynamoDB on-demand handles unpredictable traffic surges without overprovisioning.

How This Helps
- Lower operational overhead compared to a traditional server-based approach.
- Faster feature delivery with microservices, each deployable independently.
      `,
    },
    {
      id: 3,
      title: "Social Media Platform",
      summary: "Event-driven microservices with SQS/SNS and ALBs.",
      technologies: ["CDK", "TypeScript", "DynamoDB", "React", "OpenAI API"],
      outcomes: [
        "Millisecond response times for user interactions",
        "Real-time moderation via AI-based content analysis",
        <span key="monorepo-3">
          Quick iteration thanks to unified TypeScript code
        </span>,
      ],
      details: `
Architecture
- Real-time data ingestion with Kinesis streams (user posts, reactions).
- Lambda transformations, Glue jobs for analytics.
- AI-based content checks with Amazon Comprehend or custom NLP.

Design → CDK Code
- Separate stacks for streaming, analytics, moderation, and user profile services.
- Fully serverless, easy to scale, minimal ops overhead.

Monorepo & TypeScript
- Shared code for data models, validation, and utilities across all services.
- Consistent linting/testing ensures high quality and maintainability.

Scalability & High Availability
- SQS/SNS for asynchronous communication between microservices.
- Scales seamlessly to millions of user events with minimal downtime.

AI-Assisted Moderation
- Real-time detection of harmful content, spam, or policy violations.
- Automatic flags or quarantines for manual review.
      `,
    },
  ];

  // Blog Posts
  const blogPosts = [
    {
      id: 101,
      title: "Using AI Agents to Accelerate Serverless POCs",
      snippet:
        "An in-depth look at how AI agents can automate major parts of the serverless development lifecycle...",
      fullContent: `
Using AI Agents to Accelerate Serverless POCs

AI agents can drastically reduce time-to-market by automating:
- Code generation
- Testing
- Infrastructure scaffolding

Providing Context to the AI Model
When using GPT-based models for code generation, supply enough detail about:
- Project structure (monorepo layout, key dependencies)
- Infrastructure details (CDK constructs, Lambdas, environment variables)
- Desired features (user stories, acceptance criteria)

Example Prompt:
"You are an AI coding assistant. Our project is a monorepo with a 'core' package for shared utilities, 
and multiple Lambda functions under 'services/'. Please create a new function for the 'billing' service 
that uses the core utilities. We use TypeScript and AWS CDK. Generate code and stack definitions."

Construct & Example Blocks
For instance, define a new SNS topic and subscription in CDK:

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

SNS Message Envelope
When using SNS, the Lambda often receives JSON messages:

{
  "Records": [
    {
      "Sns": {
        "MessageId": "abc-123",
        "Message": "{\"action\":\"chargeUser\",\"amount\":\"49.99\"}",
        "Timestamp": "2025-01-26T14:30:00.000Z"
      }
    }
  ]
}

By providing structured prompts, AI agents can handle these envelopes consistently. This accelerates POC development while keeping best practices intact.
      `,
    },
    {
      id: 102,
      title: "Scaling with AWS CDK & ACID Principles",
      snippet:
        "Ensuring data consistency and atomic transactions in DynamoDB using the power of AWS CDK...",
      fullContent: `
Scaling with AWS CDK & ACID Principles

When building large-scale serverless apps, data consistency is crucial.

DynamoDB Transactions
- DynamoDB provides ACID transactions for multi-item updates.
- AWS CDK can define tables with transaction support for robust workflows.

Example CDK Snippet:
import { DynamoEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { Table, BillingMode, AttributeType } from 'aws-cdk-lib/aws-dynamodb';
import { Function, Runtime, Code } from 'aws-cdk-lib/aws-lambda';

const table = new Table(this, 'MyTable', {
  partitionKey: { name: 'PK', type: AttributeType.STRING },
  sortKey: { name: 'SK', type: AttributeType.STRING },
  billingMode: BillingMode.PAY_PER_REQUEST,
  stream: StreamViewType.NEW_AND_OLD_IMAGES,
});

const transactionLambda = new Function(this, 'TransactionLambda', {
  runtime: Runtime.NODEJS_18_X,
  handler: 'index.handler',
  code: Code.fromAsset('services/transactions/dist'),
});

// Optional: attach the table stream to the Lambda
transactionLambda.addEventSource(
  new DynamoEventSource(table, {
    startingPosition: StartingPosition.LATEST,
    batchSize: 5,
  })
);

Sending Context for AI-Generated Transaction Logic
When asking an AI model to generate transaction logic, include:
- Table schema (partition key, sort key, item attributes)
- Business rules (atomic updates for multi-step ops, possible rollbacks)
- Expected concurrency levels (so it can suggest patterns like optimistic locking if relevant)

SNS After Transactions
Often, a successful transaction triggers an SNS publish. Provide the JSON schema or interface in your prompt so the AI can generate correct publisher and subscriber code:

await sns.publish({
  TopicArn: billingTopicArn,
  Message: JSON.stringify({
    action: 'orderCompleted',
    userId: '123',
    orderId: 'ABC',
    status: 'CONFIRMED'
  }),
});

Why ACID?
- Ensures correctness in multi-step operations
- Avoids partial updates, preventing inconsistent states
- Scales while maintaining strong data integrity
      `,
    },
  ];

  // Modal handlers
  const openProjectModal = (id: number) => setSelectedProjectId(id);
  const closeProjectModal = () => setSelectedProjectId(null);

  const openBlogModal = (id: number) => setSelectedBlogId(id);
  const closeBlogModal = () => setSelectedBlogId(null);

  return (
    <div className="bg-[#0C1B2A] text-white min-h-screen w-full flex flex-col">
      {/* HEADER 
          Make the header responsive with flex-col on small screens
          so the nav & social links won't overflow horizontally */}
      <header className="w-full py-4 px-8 bg-[#0C1B2A] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Nav Links (wrap if needed) */}
        <nav className="flex flex-wrap gap-4">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#services" className="hover:underline">Services</a>
          <a href="#portfolio" className="hover:underline">Work</a>
          <a href="#blog" className="hover:underline">Insights</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>

        {/* Social Links */}
        <div className="flex flex-wrap gap-4">
          <a
            href="https://github.com/huncrew"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/dalebgrant"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-75"
          >
            LinkedIn
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="px-8 py-20 sm:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Serverless AWS Architect
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Helping startups build scalable, cost-effective infrastructure with AWS CDK and AI-powered development.
            Trusted by top organizations such as WEF, Vodafone, and L'Oréal.
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

      {/* SERVICES */}
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

      {/* PORTFOLIO */}
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

      {/* BLOG */}
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

      {/* CONTACT */}
      <section id="contact" className="px-8 py-16 bg-[#0F2233]">
        <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
        <div className="max-w-xl mx-auto">
          <p className="text-center text-gray-300 mb-6">
            If you’d like to discuss potential collaboration, feel free to drop
            a message below or reach out via LinkedIn/GitHub.
          </p>
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
                <div
                  key={`modal-project-${p.id}`}
                  className="overflow-y-auto max-h-[80vh] pr-2"
                >
                  <h3 className="text-2xl font-bold mb-4">{p.title}</h3>
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
                <div
                  key={`modal-blog-${b.id}`}
                  className="overflow-y-auto max-h-[80vh] pr-2"
                >
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
