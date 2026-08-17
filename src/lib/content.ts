import type {
  NavLink,
  HeroMetaItem,
  StatItem,
  Phase,
  Partner,
  FooterLinkGroup,
  EligibilityContent,
} from "@/types/content";

export const navLinks: NavLink[] = [
  { href: "#defi", label: "The challenge" },
  { href: "#phases", label: "Program" },
  { href: "#eligibility", label: "Eligibility" },
  { href: "#why", label: "Why apply" },
  { href: "#partners", label: "Backed by" },
];

export const heroMeta: HeroMetaItem[] = [
  { value: "3", label: "Steps to launch your idea" },
  { value: "6+", label: "Weeks of guided curriculum" },
  { value: "100%", label: "Your idea stays yours" },
  { value: "01", label: "Symposium to showcase your work" },
];

export const statsBand: StatItem[] = [
  { count: 10, label: "Real health challenges to choose from" },
  { count: 6, label: "Weeks of guided curriculum" },
  { value: "None", label: "Health or coding background required" },
  { value: "Free", label: "To apply, always" },
];

export const phases: Phase[] = [
  {
    step: 1,
    numLabel: "01",
    progressLabel: "01 / 03",
    progressWidth: "33%",
    weeks: "Weeks 1 to 4",
    title: "Apply and get matched",
    items: [
      "Submit a short application, no health background needed",
      "Get placed in a small innovation team",
      "Meet your technical and business mentors",
      "Join the official BIT delegation for the challenge",
    ],
  },
  {
    step: 2,
    numLabel: "02",
    progressLabel: "02 / 03",
    progressWidth: "66%",
    weeks: "Weeks 5 to 10",
    title: "Learn and build",
    items: [
      "Work through self-paced classes on nutrition and health systems",
      "Get live mentorship and hands on feedback from your team",
      "Design and prototype a real solution with your teammates",
      "Build skills in human centered design you will use for life",
    ],
  },
  {
    step: 3,
    numLabel: "03",
    progressLabel: "03 / 03",
    progressWidth: "100%",
    weeks: "Final weeks",
    title: "Present at the symposium",
    items: [
      "Pitch your solution to a jury of health innovation experts",
      "Get judged on real world impact, not just theory",
      "Earn your certificate of participation",
      "Walk away with a story that sets you apart",
    ],
  },
];

export const partners: Partner[] = [
  {
    name: "Project Prana Foundation",
    subtitle: "Cambridge, MA, a 501(c)(3) nonprofit",
    items: [
      "Mentors drawn from Harvard and MIT's innovation network",
      "A curriculum tested and refined with real student teams",
      "An evaluation rubric built specifically for health innovation",
      "A track record of turning student ideas into working prototypes",
    ],
  },
  {
    name: "Burkina Institute of Technology",
    subtitle: "Your home base for the challenge",
    items: [
      "A dedicated coordinator who has your back throughout",
      "Local support, on your campus, in your context",
      "A community of BIT innovators tackling the same challenge",
      "A direct line to the organizers whenever you need one",
    ],
  },
];

export const eligibility: EligibilityContent = {
  criteria: [
    "Current BIT students (undergraduate, graduate, or PhD) or young professionals joining the official delegation",
    "Open to every field of study, not just health, medicine, or engineering",
    "Available for the full curriculum and live mentorship sessions",
    "Ready to commit to the final symposium presentation",
  ],
  notRequired: [
    "No prior healthcare or medical background",
    "No coding or engineering experience",
    "No application fees, at any stage",
    "No fixed major, every field of study can contribute",
  ],
};

export const applyFormUrl = "https://forms.google.com/id";

export const footerLinks: FooterLinkGroup[] = [
  {
    title: "Program",
    links: [
      { href: "#defi", label: "The challenge" },
      { href: "#phases", label: "Phases" },
      { href: "#eligibility", label: "Eligibility" },
      { href: "#why", label: "Why apply" },
    ],
  },
  {
    title: "Backed by",
    links: [
      { href: "#partners", label: "BIT & PPF" },
      { href: "#apply", label: "Apply" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "mailto:programme@bit.edu.bf", label: "programme@bit.edu.bf" },
      { href: "mailto:info.projectprana@gmail.com", label: "info.projectprana@gmail.com" },
    ],
  },
];
