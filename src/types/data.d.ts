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
    role: string;
    details: string;
  };
}

interface TeachingData {
  title: string;
  items: TeachingItem;
}

interface ServCategoryDetail {
  category: string;
  subdetails: string[];
}

interface ServItem {
  type: string;
  title: string;
  details: Array<string | ServCategoryDetail>;
}

interface ServData {
  title: string;
  items: ServItem[];
}

interface TalkItem {
  institution: string;
  year: string;
}

interface TalkData {
  title: string;
  items: TalkItem;
}

interface ConfItem {
  title: string;
  conferences: {
    name: string;
    location?: string;
    year: string;
  };
}

interface ConfData {
  title: string;
  items: ConfItem;
}

interface OtherItem {
  institution: string;
  location: string;
  period: string;
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