export const profile = {
  name: "Anish Yenduri",
  nickname: "Anish",
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
  gpa: "3.8/4.0, Dean's List all semesters",
  coursework:
    "Data Structures, Data Management for Data Science, Computer Architecture, Discrete Math, Linear Algebra, InfoSec, Object-Oriented Programming",
  activities:
    "USACS Road to Software Engineering (10/150), Rutgers ML/AI NLP Track (5/100+), Mobile App Dev",
};

export const credentials = [
  "CompTIA Security+",
  "GFACT / GIAC Cybersecurity Essentials ($3,000 scholarship)",
  "NJCCIC",
  "Agentic AI (AutoGen, MCP, Workflow Automation)",
  "National Cyber Scholar",
  "Best Written Brief, Cyber 9/12",
  "Outstanding Performance Award, PNNL",
];

export type ExperienceEntry = {
  company: string;
  role: string;
  timeline: string;
  bullets: string[];
  link?: { href: string; label: string };
};

export const experience: ExperienceEntry[] = [
  {
    company: "IBM",
    role: "Full-Stack Software Engineer Intern",
    timeline: "May 2026 – Aug 2026",
    bullets: [
      "Architected a cloud deployment service for 10+ products across 100 environments on IBM's MultiCloud SaaS platform, reducing onboarding time by 87%.",
      "Engineered a thread-safe IAM caching service with proactive expiry refresh and request coalescing, cutting redundant auth calls by 80% and eliminating stale-token failures in pipelines; validated with 15+ unit tests.",
      "Replaced a 6-step GitHub issue template with a 14-field form-based automation (6 steps down to 1) over HMAC-authenticated GraphQL operations and Tekton CI/CD status polling.",
      "Validated webhooks, PR creation, and async tracking across 3 hyperscalers (AWS, Azure, IBM Cloud).",
      "Eliminated 100% of form data-loss on failure via draft persistence, covering cold-start, save, restore, and clear scenarios.",
    ],
  },
  {
    company: "Pacific Northwest National Laboratory (PNNL)",
    role: "Software Engineering Intern, Emerging Threats & Technologies",
    timeline: "Oct 2024 – Present",
    bullets: [
      "Shipped 65+ Jira tickets across the DOE C2M2 web platform, implementing UI updates in React/JavaScript and integrating with Node and Python services behind self-assessment workflows used by 2,400+ organizations.",
      "Built a pdfmake report generator for self-evaluations, saving 20+ minutes of manual work per report.",
      "Implemented client-side routing, reducing navigation steps to key assessments by 30%, and added loading states for dynamic data visualizations, improving time-to-interactive by 18%.",
      "Named author (one of 16) on the Sol-ReMM Primary User Guide, documenting 350+ cybersecurity practices across 12 domains.",
    ],
    link: {
      href: "https://sol-remm.pnnl.gov/Documentation-Resources/Sol-ReMM_Primary_User-Guide--Dec_2024--Release-1.pdf",
      label: "Read the Sol-ReMM guide",
    },
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



export type Project = {
  name: string;
  description: string;
  stack: string[];
  status: "shipped" | "in-progress";
  href?: string;
  hrefLabel?: string;
  repo?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    name: "Aletheia",
    description:
      "Won the KnotAPI track at HackPrinceton 2026. Aletheia uses SKU-level purchase data to match people with class-action settlements they qualify for, with an AI pipeline that runs from purchase ingestion to exposure analysis and automated filing.",
    stack: ["Next.js", "TypeScript", "Python", "Supabase", "KnotAPI"],
    status: "shipped" as const,
    href: "https://devpost.com/software/a-j4w2lc",
    hrefLabel: "View on Devpost",
    repo: "https://github.com/haoranxu88/hackprinceton26",
    featured: true,
  },
  {
    name: "SubletMatching",
    description:
      "A sublet marketplace for Rutgers students. Sign-up is gated to verified Rutgers emails, with listings, favorites, and messaging on an Express API over Supabase, plus an Expo mobile app.",
    stack: ["React", "Express", "Supabase", "Expo"],
    status: "in-progress" as const,
    href: "https://sublet-matching.vercel.app",
    hrefLabel: "View live site",
    repo: "https://github.com/Trian27/SubletMatching",
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
    name: "Morgan Stanley Hackathon 2026",
    description:
      "LemonLens, a food access analytics platform for the Lemontree nonprofit, built at the Morgan Stanley Code to Give hackathon. I built the FastAPI backend and the issue classification pipeline behind its dashboard KPIs.",
    stack: ["Python", "FastAPI", "Pydantic", "Gemini API"],
    status: "shipped" as const,
    href: "https://lemonlens.vercel.app/",
    hrefLabel: "View live site",
    repo: "https://github.com/ishratarshad/trackb_team7_code_to_give",
    featured: false,
  },
  {
    name: "AI Visibility Auditor",
    description:
      "Built with Rutgers IEEE's ML/AI division. Crawls a company site and competitor sites, generates buyer-style prompts, and simulates AI-answer visibility to produce a directional visibility score, with prioritized recommendations and on-demand content briefs.",
    stack: ["Next.js", "FastAPI", "Supabase", "Gemini API"],
    status: "shipped" as const,
    href: "https://ieee.rutgers.edu/divisions/mlai/projects",
    hrefLabel: "View on Rutgers IEEE",
    repo: "https://github.com/anish-yen/visibility-next",
    featured: false,
  },
  {
    name: "CS Research Assistant",
    description:
      "Built a version-controlled Python algorithm translating downlink MIMO VPP equations, a wireless signal optimization problem, into QUBO matrices for arbitrary antenna configurations. Validated correctness on 4x4 MIMO instances against hand-derived calculations.",
    stack: ["Python", "Pandas", "NumPy", "Combinatorial Optimization"],
    status: "shipped" as const,
    featured: false,
  },
  {
    name: "NBA Win Prediction",
    description:
      "An end-to-end pipeline predicting NBA team win percentage from 24 seasons of data (716 team-season records): a relational schema in SQLite, engineered statistical features, a time-aware train/test split, and Linear Regression and Random Forest models at R² ≈ 0.90 on held-out seasons.",
    stack: ["Python", "SQLite", "scikit-learn", "Pandas"],
    status: "shipped" as const,
    href: "https://github.com/anish-yen/nba-win-prediction-project",
    featured: false,
  },
  {
    name: "K-Color Analysis",
    description:
      "A Korean personal color analysis app, built with a small team: determines a user's color palette from facial features, skin tone, eye color, and hair, then recommends jewelry, clothing styles, and stores that match the palette.",
    stack: ["TypeScript"],
    status: "shipped" as const,
    href: "https://github.com/tanish-banota/K-ColorAnalysis",
    featured: false,
  },
  {
    name: "Song Recommendation Platform",
    description:
      "An ML-driven music retrieval and recommendation system — dense embeddings over a vector index power similarity search and personalized recommendations, served through a full-stack app.",
    stack: ["PyTorch", "FastAPI", "Next.js", "pgvector"],
    status: "in-progress" as const,
    href: undefined,
    repo: "https://github.com/anish-yen/song-recommender",
    featured: false,
  },
  {
    name: "Sweat",
    description:
      "Campus-first workout coordination: post a session, see friends on a live map, and ping them to join. An Expo React Native prototype, store-prepped with icon, splash, and build config.",
    stack: ["Expo", "React Native", "TypeScript"],
    status: "in-progress" as const,
    href: "https://github.com/anish-yen/sweat-campus",
    featured: false,
  },
  {
    name: "Barber Reactivation",
    description:
      "A booking and client-reactivation app for independent barbershops, built around lapsed-client and no-show win-back so shops recover bookings they already earned once.",
    stack: ["Next.js", "TypeScript", "Supabase"],
    status: "in-progress" as const,
    href: "https://github.com/anish-yen/barber-app",
    featured: false,
  },
];

export const skills = {
  Languages: ["Python", "Java", "TypeScript", "SQL", "Go", "Bash"],
  "Frontend": ["React", "Next.js", "Tailwind CSS"],
  "Backend & ML": [
    "FastAPI",
    "PyTorch",
    "Pandas",
    "PostgreSQL",
    "Supabase",
    "Express",
    "Node.js",
    "Redis",
    "GraphQL APIs",
    "RAG",
    "MCP",
  ],
  "Cloud & Tools": [
    "AWS",
    "Docker",
    "Kubernetes",
    "Tekton CI/CD",
    "Terraform",
    "Git",
    "GitHub Actions",
    "Linux",
    "Vercel",
  ],
  Security: ["CompTIA Security+", "Threat Analysis"],
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
