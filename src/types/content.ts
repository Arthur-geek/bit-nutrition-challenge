export interface NavLink {
  href: string;
  label: string;
}

export interface HeroMetaItem {
  value: string;
  label: string;
}

export interface StatItem {
  label: string;
  /** Numeric target for the animated count-up. Omit for a static value like "Free". */
  count?: number;
  /** Static display value, used when `count` is omitted. */
  value?: string;
}

export interface Phase {
  step: 1 | 2 | 3;
  numLabel: string; // "01" | "02" | "03"
  progressLabel: string; // "01 / 03"
  progressWidth: string; // "33%"
  weeks: string;
  title: string;
  items: string[];
}

export interface Partner {
  name: string;
  subtitle: string;
  items: string[];
}

export interface FooterLinkGroup {
  title: string;
  links: NavLink[];
}

export interface EligibilityContent {
  criteria: string[];
  notRequired: string[];
}
