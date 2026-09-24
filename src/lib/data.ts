export const profile = {
  name: "Anish Yenduri",
  nickname: "Ani",
  tagline: "Software Engineer",
  subtagline: "Product and AI engineering. CS at Rutgers, with SWE internships at IBM and PNNL.",
  location: "New Brunswick, NJ",
};

export const links = {
  github: "https://github.com/anish-yen",
  linkedin: "https://linkedin.com/in/anish-yenduri",
  email: "yenduri.anish@gmail.com",
  resume: "/resume.pdf",
};

export const education = {
  school: "Rutgers University Honors College",
  degree: "B.S. Computer Science",
  timeline: "Expected May 2028",
  honor: "Dean's Scholarship",
};

export const credentials = ["CompTIA Security+", "National Cyber Scholar"];

export const experience = [
  {
    company: "IBM",
    role: "Full-Stack Software Engineer Intern",
    timeline: "May 2026 – Aug 2026",
    bullets: [
      "Built a cloud deployment service for 10+ products across 100 environments on IBM's MultiCloud SaaS platform, cutting onboarding time by 87%.",
      "Engineered a thread-safe IAM caching service with proactive expiry refresh and request coalescing, cutting redundant auth calls by 80% and eliminating stale-token failures in pipelines.",
      "Replaced a 6-step GitHub issue template with form-based automation over HMAC-authenticated GraphQL and Tekton CI/CD, validated across AWS, Azure, and IBM Cloud.",
    ],
  },
  {
    company: "Pacific Northwest National Laboratory (PNNL)",
    role: "Emerging Threats & Technologies Intern",
    timeline: "Oct 2024 – Present",
    bullets: [
      "Shipped 65+ tickets on the DOE C2M2 web platform in React, integrating with Node and Python services behind self-assessment workflows used by 2,400+ organizations.",
      "Built a pdfmake report generator for self-evaluations, saving 20+ minutes of manual work per report.",
      "Authored the Sol-ReMM Primary User Guide, documenting 350+ practices across 12 domains.",
    ],
  },
];

export const hackathons = [
  {
    event: "HackPrinceton 2026",
    project: "Aletheia",
    note: "Won the KnotAPI track",
  },
  {
    event: "Morgan Stanley Code to Give",
    project: "LemonLens",
    note: "Built for the Lemontree nonprofit",
  },
];

export const projects = [
  {
    name: "Aletheia",
    description:
      "Won the KnotAPI track at HackPrinceton 2026. Aletheia uses SKU-level purchase data to match people with class-action settlements they qualify for, with an AI pipeline that runs from purchase ingestion to exposure analysis and automated filing.",
    stack: ["Next.js", "TypeScript", "Python", "Supabase", "KnotAPI"],
    status: "shipped" as const,
    href: "https://github.com/haoranxu88/hackprinceton26",
    featured: true,
  },
  {
    name: "SubletMatching",
    description:
      "A sublet marketplace for Rutgers students. Sign-up is gated to verified Rutgers emails, with listings, favorites, and messaging on an Express API over Supabase, plus an Expo mobile app.",
    stack: ["React", "Express", "Supabase", "Expo"],
    status: "in-progress" as const,
    href: "https://github.com/Trian27/SubletMatching",
    featured: false,
  },
  {
    name: "SentinelStream",
    description:
      "An intrusion-detection pipeline over 2.8M network flows: Optuna-tuned XGBoost at 0.866 test PR-AUC, SHAP explanations, drift monitoring, and FastAPI serving at 6.2 ms p95. 166 tests, 92% coverage.",
    stack: ["PyTorch", "XGBoost", "SHAP", "MLflow", "FastAPI", "Docker"],
    status: "shipped" as const,
    href: "https://github.com/anish-yen/sentinelstream-ml",
    featured: false,
  },
  {
    name: "LemonLens",
    description:
      "A food access analytics platform for the Lemontree nonprofit, built at the Morgan Stanley Code to Give hackathon. I built the FastAPI backend and the issue classification pipeline behind its dashboard KPIs.",
    stack: ["Python", "FastAPI", "Pydantic", "Gemini API"],
    status: "shipped" as const,
    href: "https://github.com/ishratarshad/trackb_team7_code_to_give",
    featured: false,
  },
  {
    name: "AI Visibility Auditor",
    description:
      "Built with Rutgers IEEE's ML/AI division. Crawls a company site and competitor sites, generates buyer-style prompts, and simulates AI-answer visibility to produce a directional visibility score, with prioritized recommendations and on-demand content briefs.",
    stack: ["Next.js", "FastAPI", "Supabase", "Gemini API"],
    status: "shipped" as const,
    href: "https://ieee.rutgers.edu/divisions/mlai/projects",
    featured: false,
  },
  {
    name: "Song Recommendation Platform",
    description:
      "An ML-driven music retrieval and recommendation system — dense embeddings over a vector index power similarity search and personalized recommendations, served through a full-stack app.",
    stack: ["PyTorch", "FastAPI", "Next.js", "pgvector"],
    status: "in-progress" as const,
    href: undefined,
    featured: false,
  },
];

export const skills = {
  Languages: ["Python", "TypeScript", "JavaScript", "SQL"],
  "Frontend": ["React", "Next.js", "Tailwind CSS"],
  "Backend & ML": ["FastAPI", "PyTorch", "PostgreSQL", "pgvector", "Node.js"],
  "Security": ["CompTIA Security+", "Threat Analysis"],
  Tools: ["Git", "Docker", "Linux", "Vercel"],
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
