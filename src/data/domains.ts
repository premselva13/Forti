/**
 * CDW Canada Security for AI Partner Capability Comparison — Fortinet profile.
 * Source: CDW Canada Service Strategy Development, April 2026.
 * 16 vendors, 12 domains, 192 assessments. Validated against OWASP LLM (2025),
 * OWASP Agentic (2026), NIST AI 100-2, NIST AI RMF 1.0, NIST AI 600-1, Canada AIDA.
 */

export type CapabilityLevel = "Native" | "Partial" | "Gap";

export interface AiDomain {
  id: string; // D1..D12
  name: string;
  level: CapabilityLevel;
  products: string[];
  rationale: string;
  talkTrack: string;
  discoveryQuestions: string[];
  attachPlay?: string; // partner-attach play for Partial/Gap domains
}

export const AI_DOMAINS: AiDomain[] = [
  {
    id: "D1",
    name: "Asset Discovery & Inventory",
    level: "Partial",
    products: ["FortiAI-Protect", "FortiView for AI (FortiOS 8.0)"],
    rationale:
      "FortiAI-Protect detects 6,500+ AI URLs with use case, model, and geolocation context. FortiView for AI attack surface and shadow AI (FortiOS 8.0, March 2026) adds real-time visibility. Scored Partial because detection is URL-based, not deeper model-level or agent-level discovery.",
    talkTrack:
      "Before you can govern AI you have to see it. Fortinet gives you a live map of every GenAI app your users touch — 6,500+ catalogued AI URLs with model and geo context — from the network gear you may already own.",
    discoveryQuestions: [
      "Do you know how many GenAI tools are in use across your organization today?",
      "How would you find out if a business unit started piping data into a new AI SaaS tomorrow?",
      "Is anyone accountable for an inventory of AI usage — apps, models, agents?",
    ],
    attachPlay:
      "For model-level and agent-level discovery in custom AI estates, pair with an AI-SPM partner from the CDW portfolio.",
  },
  {
    id: "D2",
    name: "Data Security for AI",
    level: "Partial",
    products: ["FortiDLP", "FortiOS 8.0 OCR-enhanced DLP"],
    rationale:
      "FortiDLP provides data leakage prevention for GenAI prompts with data masking before LLM processing. FortiOS 8.0 adds OCR-enhanced DLP for images and screenshots. Scored Partial because this is prompt-layer DLP, not a full DSPM platform for AI training pipelines.",
    talkTrack:
      "The #1 board-level AI fear is sensitive data walking out through a prompt. FortiDLP masks data before it ever reaches the LLM — and FortiOS 8.0 OCR-DLP catches screenshots, the leak channel everyone forgets.",
    discoveryQuestions: [
      "What stops an employee pasting customer PII into a public chatbot right now?",
      "Do your DLP controls see images and screenshots, or only text?",
      "Where does your data governance program stand on AI training data?",
    ],
    attachPlay:
      "For DSPM across AI training pipelines, position a CDW data-security partner alongside prompt-layer FortiDLP.",
  },
  {
    id: "D3",
    name: "Identity & Access for AI",
    level: "Partial",
    products: ["FortiGate zero-trust GenAI access controls"],
    rationale:
      "Zero-trust access controls for GenAI applications enforced through FortiGate. Scored Partial because there is no dedicated AI workload IAM or non-human identity management product.",
    talkTrack:
      "Access to AI should be role-based like access to anything else. FortiGate enforces zero-trust policy on GenAI apps — who can use what, from where — with no new agent to deploy.",
    discoveryQuestions: [
      "Can you enforce different GenAI access policies for finance vs. engineering today?",
      "How are service accounts and non-human identities using AI APIs governed?",
      "Is AI access part of your zero-trust roadmap or a blind spot beside it?",
    ],
    attachPlay:
      "For AI workload IAM and non-human identity management, attach a CDW identity partner.",
  },
  {
    id: "D4",
    name: "Runtime Protection",
    level: "Partial",
    products: ["FortiAIGate"],
    rationale:
      "FortiAIGate provides LLM guardrail chaining, prompt sanitization, and anomaly detection. Scored Partial because depth does not match purpose-built AI firewalls (Cisco AI Defense, Lakera Guard, CrowdStrike Falcon AIDR) in detection efficacy or multi-model coverage.",
    talkTrack:
      "For customers deploying their own LLM apps, FortiAIGate chains guardrails in front of the model: prompt sanitization in, anomaly detection throughout. It extends the Fabric they already run rather than adding a stranger to the stack.",
    discoveryQuestions: [
      "Are you building or hosting your own LLM-powered applications?",
      "What sits between your users' prompts and your models today?",
      "Have you tested your AI apps against prompt injection?",
    ],
    attachPlay:
      "Where detection-efficacy benchmarks decide the deal, co-position a purpose-built AI firewall partner and keep Fortinet as the network control plane.",
  },
  {
    id: "D5",
    name: "Model Integrity & Posture",
    level: "Gap",
    products: [],
    rationale:
      "No AI Security Posture Management (AI-SPM) equivalent. No model posture assessment, supply chain vulnerability scanning, or misconfiguration detection for AI workloads.",
    talkTrack:
      "Be straight: Fortinet does not do AI-SPM today. Lead the conversation with governance and visibility, and bring a CDW AI-SPM partner for posture. Owning the gap wins the room.",
    discoveryQuestions: [
      "Are you building custom models, or consuming AI as SaaS?",
      "Who assesses the security posture of your AI workloads and configs?",
      "Would a posture finding on an AI system reach the same queue as a cloud misconfig?",
    ],
    attachPlay:
      "AI-SPM attach: CDW pairs Fortinet's network-layer governance with an AI-SPM specialist (Cisco, Palo Alto, CrowdStrike, Varonis, and Tenable all field AI-SPM). Multi-vendor is the design, not the compromise.",
  },
  {
    id: "D6",
    name: "Governance, Risk & Compliance",
    level: "Partial",
    products: ["Security Fabric policy enforcement", "FortiView dashboard"],
    rationale:
      "AI usage policy enforcement within the Fortinet Security Fabric. FortiView dashboard provides visibility into AI activity. Scored Partial because there is no regulatory compliance mapping (EU AI Act, NIST AI RMF, AIDA), no audit trail workflow, and no eDiscovery capability.",
    talkTrack:
      "Policy without enforcement is a memo. Fortinet turns the AI acceptable-use policy into enforced network policy, with FortiView as the evidence dashboard for the risk committee.",
    discoveryQuestions: [
      "Does your AI acceptable-use policy have any technical enforcement behind it?",
      "What will you show a regulator — or your board — as evidence of AI governance?",
      "Is Canada's AIDA (or the EU AI Act) on your compliance radar yet?",
    ],
    attachPlay:
      "For regulatory mapping, audit workflow, and eDiscovery, attach a GRC platform partner; Fortinet supplies the enforcement layer and the telemetry.",
  },
  {
    id: "D7",
    name: "Resilience & Recovery",
    level: "Gap",
    products: [],
    rationale:
      "No AI-specific resilience, rollback, or recovery capabilities. This domain requires backup infrastructure and precision undo functionality that sits outside Fortinet's current portfolio.",
    talkTrack:
      "Recovery for AI is a data-protection motion, not a firewall motion. Say so, and bring CDW's resilience bench (Veeam, Rubrik class) into the conversation.",
    discoveryQuestions: [
      "If an AI agent corrupted data at machine speed, how would you roll it back?",
      "Are AI systems in scope for your BC/DR plans?",
      "Who owns recovery time objectives for AI-dependent processes?",
    ],
    attachPlay:
      "Resilience attach: position CDW data-protection partners (Veeam and Rubrik score Native in agent-era resilience assessments).",
  },
  {
    id: "D8",
    name: "Red Teaming & Validation",
    level: "Gap",
    products: [],
    rationale:
      "No adversarial AI red teaming product. No algorithmic testing, multi-turn attack simulation, or CI/CD security testing integration for AI systems.",
    talkTrack:
      "Customers deploying models will ask who attacks them before the adversary does. Fortinet doesn't sell that today — CDW's assessment bench and red-team partners do. Sell the engagement, keep Fortinet as the enforcement fabric.",
    discoveryQuestions: [
      "Has anyone adversarially tested your AI applications?",
      "Is AI in scope for your penetration testing program?",
      "How would you validate guardrails actually hold under a multi-turn attack?",
    ],
    attachPlay:
      "Red-team attach: five vendors field Native AI red teaming (Cisco, F5, Check Point, SentinelOne, Varonis) — or lead with a CDW security assessment services engagement.",
  },
  {
    id: "D9",
    name: "Supply Chain Security",
    level: "Gap",
    products: [],
    rationale:
      "No AI supply chain scanning capabilities. No AI Bill of Materials (AI BOM), MCP server governance, or model file scanning for serialization exploits.",
    talkTrack:
      "Model files and MCP servers are the new third-party risk. Fortinet sees MCP traffic on the wire (D11) but doesn't scan the supply chain behind it — pair the visibility with a partner that does.",
    discoveryQuestions: [
      "Do you know the provenance of every model file running in production?",
      "Are downloaded models scanned before deployment?",
      "Who approves new MCP servers before agents start calling them?",
    ],
    attachPlay:
      "Supply-chain attach: AI BOM and model-scanning specialists via CDW; Fortinet contributes network-layer MCP visibility as the detective control.",
  },
  {
    id: "D10",
    name: "User AI Access Governance",
    level: "Native",
    products: ["FortiAI-Protect", "FortiOS 8.0 AI-aware application control"],
    rationale:
      "Fortinet's strongest domain and sole Native score. FortiAI-Protect provides the largest GenAI URL catalog in the comparison at 6,500+ AI URLs with shadow AI detection, real-time user coaching, and zero-trust GenAI access controls. FortiOS 8.0 adds AI-aware application control that allows approved GenAI tools while preventing risky actions. Market-leading capability.",
    talkTrack:
      "LEAD HERE. The largest GenAI URL catalog on the market — 6,500+ vs. Palo Alto's ~4,000+ and Cato's ~950+ — plus shadow-AI detection, real-time user coaching, and AI-aware app control that allows the sanctioned tool while blocking the risky action inside it. This is Native, GA, and shipping.",
    discoveryQuestions: [
      "If we ran a two-week shadow-AI discovery on your egress, what do you think we'd find?",
      "Do you want to block AI, or govern it? (The answer is govern — blocking creates shadow AI.)",
      "Which GenAI tools are officially sanctioned, and how is 'sanctioned' enforced?",
    ],
  },
  {
    id: "D11",
    name: "Agent AI Access Governance",
    level: "Partial",
    products: ["FortiOS 8.0 MCP/A2A visibility"],
    rationale:
      "FortiOS 8.0 (announced March 10, 2026 at Accelerate 2026) introduces Model Context Protocol (MCP) and agent-to-agent (A2A) visibility, revealing hidden AI activity between applications, agents, and tools. Scored Partial because this is visibility and monitoring, not yet full agent governance with entitlement mapping, policy enforcement, or action rollback.",
    talkTrack:
      "HEADLINE: only a handful of vendors on earth can see MCP and agent-to-agent traffic at the network layer. Agents are about to outnumber users. Fortinet customers get the wiretap on agent activity as a FortiOS 8.0 upgrade, not a new product.",
    discoveryQuestions: [
      "Are any teams already running AI agents or MCP servers — officially or not?",
      "If an agent started exfiltrating data over MCP, would anything in your stack even log it?",
      "What's your plan for governing agent-to-agent traffic in the next 18 months?",
    ],
    attachPlay:
      "For full agent governance (entitlements, enforcement, rollback), only three vendors score Native today — Veeam, SentinelOne, Rubrik. Position Fortinet visibility now, partner governance as it matures.",
  },
  {
    id: "D12",
    name: "Safety & Content Integrity",
    level: "Partial",
    products: ["FortiAIGate output sanitization & content filtering"],
    rationale:
      "FortiAIGate provides output sanitization and content filtering for AI-generated responses. Scored Partial because depth does not match dedicated safety vendors (Cisco safety guardrails, Lakera content violation detection, TrendAI AI Application Security).",
    talkTrack:
      "What the model says back matters as much as what users send in. FortiAIGate filters and sanitizes AI output before it reaches users or downstream systems — table stakes for customer-facing AI.",
    discoveryQuestions: [
      "Do any of your AI apps generate content that customers see directly?",
      "What happens if a model returns something toxic, biased, or confidential?",
      "Who signed off on the safety review for your customer-facing AI?",
    ],
    attachPlay:
      "Where dedicated safety depth is required, co-position a safety-specialist partner; FortiAIGate covers the output path inside the Fabric.",
  },
];

export const ASSESSMENT_META = {
  coverage: "8 of 12 domains",
  nativeCount: 1,
  partialCount: 7,
  gapCount: 4,
  vendorCount: 16,
  ranking:
    "Tie for 10th of 16 alongside Microsoft, Veeam/Securiti, and Cyera. Top tier: Varonis (11/12); Cisco, Palo Alto, CrowdStrike, CATO, TrendAI (10/12).",
  scope:
    "Security FOR AI only (protecting AI systems, models, agents, and data). Excludes AI FOR Security (SOC operations).",
  source:
    "CDW Canada Security for AI Partner Capability Comparison — 16 vendors, 12 domains, 192 assessments. GA statuses verified April 2026.",
};
