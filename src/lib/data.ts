import { SITE } from "./site";

export const newsItems = [
  {
    id: "1",
    title: "Third Term Resumption & Orientation",
    date: "April 27, 2026",
    excerpt:
      "Welcome back, scholars. Where u begin to suffer with assignments and notes again",
  },
  {
    id: "2",
    title: "What else",
    date: "dunno  forget bout it",
    excerpt:
      "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah",
  },
  {
    id: "3",
    title: "PTA Meeting",
    date: "Date is pending",
    excerpt:
      "Partnership in progress: meet form tutors, review learner goals, and explore co-curricular plans.",
  },
];

export const events = [
  {
    id: "e1",
    title: "Annual Sports & Athletics Day",
    date: "Mar 15, 2026",
    time: "8:00 AM",
    location: "School Field",
  },
  {
    id: "e2",
    title: "Career Discovery Week",
    date: "Apr 7–11, 2026",
    time: "Daily sessions",
    location: "Main Hall & Labs",
  },
  {
    id: "e3",
    title: "Social Day",
    date: "Dunno 2026",
    time: "1-day program",
    location: "In sch field",
  },
];

export const departments = [
  {
    name: "Science",
    description:
      "Critical thinking and hours of suffering and calculations.",
    subjects: [
      "Physics",
      "Chemistry",
      "Biology",
      "Further Mathematics",
      "Agricultural Science",
      "Digital Tech",
    ],
  },
  {
    name: "Arts",
    description:
      "Expression, and cultural literacy through literature, history, and the creative arts.",
    subjects: [
      "Literature",
      "Government",
      "CRS ",
      "History",
      "Visual Arts",
      "French",
    ],
  },
  {
    name: "Commercial",
    description:
      "Enterprise mindset with accounting, commerce, and economics aligned to real-world financial literacy.",
    subjects: [
      "Accounting",
      "Commerce",
      "Economics",
      "Business Studies",
      "ICT",
      "Civic Education",
    ],
  },
];

export const curriculumHighlights = [
  "Nigerian national curriculum with enriched STEM & leadership strands",
  "Termly assessments, continuous assessment portfolio, and exam readiness coaching",
  "Digital skills, public speaking, and service learning across all levels",
];

export const testimonials = [
  {
    quote:
      "Our daughter grew in confidence and discipline. The teachers truly know each learner by name.",
    name: "Mrs odumodo black",
    role: "Parent, SS2",
  },
  {
    quote: `Competitions, clubs, and a calm learning culture—${SITE.shortName} feels like a second home.`,
    name: "Mr. Chinedu Okoro",
    role: "Parent, SS3",
  },
  {
    quote:
      "I appreciate how academic rigour is balanced with mentorship and character building.",
    name: "Grace Usman",
    role: "Alumni, Class of 2024",
  },
];

export const staffMembers = [
  {
    id: "s1",
    name: "Mr pricipal can't remeber his name",
    role: "Principal",
    department: "Administration",
  },
  {
    id: "s2",
    name: "Mr Tom",
    role: "Vice Principal (Academics)",
    department: "Administration",
  },
  {
    id: "s3",
    name: "Mrs Rauta",
    role: "Head of Science",
    department: "Science",
  },
  {
    id: "s4",
    name: "Mr Benard",
    role: "Head of Arts/ Discipline dude",
    department: "Arts",
  },
  {
    id: "s5",
    name: "Miss Chioma",
    role: "Head of Commercial",
    department: "Commercial",
  },
  {
    id: "s6",
    name: "Okpe",
    role: "Organize events and programs",
    department: "Student affairs",
  },
  {
    id: "s7",
    name: "Ej's brother",
    role: "Physical & Health Education",
    department: "Sports",
  },
  {
    id: "s8",
    name: "Mr Cyprain Michael",
    role: "ICT / Digital Learning",
    department: "Technology",
  },
];

export const admissionSteps = [
  {
    step: 1,
    title: "Request information",
    detail:
      "Complete the interest form or visit our admissions desk for a prospectus pack.",
  },
  {
    step: 2,
    title: "Entrance assessment",
    detail:
      "Scheduled diagnostic in Literacy, Numeracy, and Character interview (no stress—just a friendly baseline).",
  },
  {
    step: 3,
    title: "Offer & registration",
    detail:
      "Successful candidates receive an offer letter with fee schedule and uniform guidelines.",
  },
  {
    step: 4,
    title: "Welcome onboard",
    detail:
      "Orientation, house allocation, and mentor pairing before the first day of class.",
  },
];

export const feeRows = [
  { item: "Primary", amount: "₦30,000 approx" },
  { item: "Senior Secondary(sci)", amount: "₦75,000" },
  { item: "Senior Sec (art)", amount: "₦70,000" },
  { item: "Junior Secondary", amount: "₦50,000" },
];

export const admissionRequirements = [
  "Completed application form and two recent passport photographs",
  "Previous school transcript / report card (last two terms)",
  "Birth certificate or age declaration",
  "Immunization record and basic medical fitness note",
  "Sponsor / guardian identification and contact details",
];

export const portalNav = [
  { label: "Dashboard", href: "/portal/dashboard" },
  { label: "Results", href: "/portal/dashboard#results" },
  { label: "Timetable", href: "/portal/dashboard#timetable" },
  { label: "Announcements", href: "/portal/dashboard#announcements" },
];

export const timetableRows = [
  { period: "1", time: "7:45 – 8:35", mon: "Mathematics", tue: "English", wed: "Biology", thu: "Economics", fri: "Assembly" },
  { period: "2", time: "8:40 – 9:30", mon: "Physics", tue: "Literature", wed: "Chemistry", thu: "Government", fri: "Mathematics" },
  { period: "3", time: "9:35 – 10:25", mon: "Chemistry", tue: "CRS", wed: "Further Maths", thu: "Commerce", fri: "Physics Lab" },
  { period: "4", time: "10:45 – 11:35", mon: "English", tue: "Economics", wed: "PHE", thu: "Literature", fri: "ICT" },
];

export const resultRows = [
  { subject: "English Language", ca: 38, exam: 52, total: 90, grade: "A" },
  { subject: "Mathematics", ca: 36, exam: 49, total: 85, grade: "A" },
  { subject: "Physics", ca: 34, exam: 47, total: 81, grade: "A" },
  { subject: "Chemistry", ca: 35, exam: 45, total: 80, grade: "A" },
  { subject: "Biology", ca: 33, exam: 44, total: 77, grade: "B" },
];
