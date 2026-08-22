export const profile = {
  name: "Anish Yenduri",
  nickname: "Ani",
  tagline: "AI Product Engineer",
  subtagline: "Full-stack generalist who ships product and integrates ML systems.",
  location: "New Brunswick, NJ",
};

// TODO: swap these placeholder hrefs for your real profiles.
export const links = {
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-username",
  email: "you@example.com",
  resume: "/resume.pdf",
};

export const education = {
  school: "Rutgers University Honors College",
  degree: "B.S. Computer Science",
  timeline: "Expected May 2028",
  honor: "Dean's Scholarship",
};

export const credentials = ["CompTIA Security+", "National Cyber Scholar"];

// TODO: fill in real dates and 2-3 bullet points of concrete impact for each role.
export const experience = [
  {
    company: "IBM",
    role: "Full-Stack Software Engineer Intern",
    timeline: "TODO — add dates",
    bullets: [
      "TODO — add a concrete accomplishment (feature shipped, system built, metric moved).",
      "TODO — add another accomplishment or the stack you worked in.",
    ],
  },
  {
    company: "Pacific Northwest National Laboratory (PNNL)",
    role: "Emerging Threats & Technologies Intern",
    timeline: "TODO — add dates",
    bullets: [
      "TODO — add a concrete accomplishment (research finding, tool built, analysis delivered).",
      "TODO — add another accomplishment or the stack you worked in.",
    ],
  },
];

export const hackathons = [
  {
    event: "HackPrinceton 2026",
    project: "Aletheia",
    note: "KnotAPI track recognition",
  },
  {
    event: "Morgan Stanley Hackathon",
    project: "Lemontree",
    note: undefined,
  },
];

export const projects = [
  {
    name: "Song Recommendation Platform",
    description:
      "An ML-driven music retrieval and recommendation system — dense embeddings over a vector index power similarity search and personalized recommendations, served through a full-stack app.",
    stack: ["PyTorch", "FastAPI", "Next.js", "pgvector"],
    status: "in-progress" as const,
    // TODO: add repo/demo links once available.
    href: undefined,
    featured: true,
  },
  {
    name: "Project Two",
    description: "TODO — add a one-to-two sentence description of this project.",
    stack: ["TODO"],
    status: "todo" as const,
    href: undefined,
    featured: false,
  },
  {
    name: "Project Three",
    description: "TODO — add a one-to-two sentence description of this project.",
    stack: ["TODO"],
    status: "todo" as const,
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
