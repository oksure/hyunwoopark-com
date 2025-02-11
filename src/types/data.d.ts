interface EduExpItem {
  institution: string;
  instshort?: string;
  details: string;
}

interface EduExpData {
  title: string;
  items: EduExpItem;
}

interface PubItem {
  type: "journal" | "conference" | "book";
  title: string;
  authors: string;
  journal?: string;
  volume?: string;
  number?: string;
  pages?: string;
  year: string;
  link?: string;
  proceedings?: string;
  notes?: string;
  top?: ("utd24" | "ft50" | "abs" | "abs4*" | "abs4" | "abs3" | "top cs");
}

interface PubData {
  title: string;
  items: PubItem;
}

interface AwardItem {
  type: "award" | "fellowship" | "grant";
  title: string;
  awarder: string;
  year: string;
  special?: boolean;
  notes?: string;
}

interface AwardData {
  title: string;
  items: AwardItem;
}

interface TeachingItem {
  institution: string;
  courses: {
    role: string; // e.g., "Instructor", "TA", "Advising & Committee", "Course Development"
    details: string; // List of courses or roles
  };
}

interface TeachingData {
  title: string;
  items: TeachingItem;
}

interface ServiceItem {
  type: "membership" | "officer" | "chair" | "reviewer";
  title: string;
  details?: string; // Optional details for some types
}

interface ServiceData {
  title: string;
  items: ServiceItem;
}

interface TalkItem {
  institution: string;
  year: string;
}

interface TalkData {
  title: string;
  items: TalkItem;
}

interface PresentationItem {
  title: string;
  conferences: {
    name: string;
    location?: string; // Some conferences might not have a location
    year: string;
  };
}

interface PresentationData {
  title: string;
  items: PresentationItem;
}

interface OtherItem {
  institution: string;
  location: string;
  period: string; // Can be a single year or a range
  role: string;
  details: string;
}

interface OtherData {
  title: string;
  items: OtherItem;
}

interface SoftwareItem {
  name: string;
  link: string;
}

interface SoftwareData {
  title: string;
  items: SoftwareItem;
}