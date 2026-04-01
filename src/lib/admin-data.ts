export type AdminSummary = {
  totalStudents: number;
  totalParents: number;
  totalStaff: number;
};

export type AdminMessage = {
  id: string;
  title: string;
  content: string;
  date: string;
};

export type StudentRecord = {
  id: string;
  name: string;
  className: string;
  department: "Science" | "Arts" | "Commercial";
};

export type ParentRecord = {
  id: string;
  name: string;
  email: string;
  children: string[];
};

export type ContactInboxMessage = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  date: string;
};

export const adminSummary: AdminSummary = {
  totalStudents: 1248,
  totalParents: 992,
  totalStaff: 86,
};

export const adminMessages: AdminMessage[] = [
  {
    id: "msg-1",
    title: "Mid-Term Assessment Schedule",
    content:
      "Mid-term assessments begin next Monday. Department heads should submit final timetables before Friday.",
    date: "2026-03-25",
  },
  {
    id: "msg-2",
    title: "Inter-House Sports Preparation",
    content:
      "All house coordinators should finalize student athlete registration and submit team lists.",
    date: "2026-03-22",
  },
  {
    id: "msg-3",
    title: "PTA General Meeting",
    content:
      "The next PTA meeting will hold in the multipurpose hall by 10:00 AM. Attendance is encouraged.",
    date: "2026-03-18",
  },
  {
    id: "msg-4",
    title: "Career Discovery Week",
    content:
      "Guest speakers from technology, medicine, law, and media industries will mentor students this week.",
    date: "2026-03-14",
  },
];

export const students: StudentRecord[] = [
  {
    id: "std-1",
    name: "Amina Yusuf",
    className: "SS2",
    department: "Science",
  },
  {
    id: "std-2",
    name: "David Okeke",
    className: "SS1",
    department: "Commercial",
  },
  {
    id: "std-3",
    name: "Ruth Emmanuel",
    className: "JSS3",
    department: "Arts",
  },
  {
    id: "std-4",
    name: "Ibrahim Sani",
    className: "SS3",
    department: "Science",
  },
  {
    id: "std-5",
    name: "Martha Simon",
    className: "JSS2",
    department: "Arts",
  },
];

export const parents: ParentRecord[] = [
  {
    id: "par-1",
    name: "Mrs. Blessing Yusuf",
    email: "blessing.yusuf@example.com",
    children: ["Amina Yusuf", "Yusuf Yusuf"],
  },
  {
    id: "par-2",
    name: "Mr. Chinedu Okeke",
    email: "chinedu.okeke@example.com",
    children: ["David Okeke"],
  },
  {
    id: "par-3",
    name: "Mrs. Grace Emmanuel",
    email: "grace.emmanuel@example.com",
    children: ["Ruth Emmanuel"],
  },
  {
    id: "par-4",
    name: "Mr. Musa Sani",
    email: "musa.sani@example.com",
    children: ["Ibrahim Sani", "Aisha Sani"],
  },
];

export const contactInboxMessages: ContactInboxMessage[] = [
  {
    id: "contact-1",
    name: "Mrs. Helen Daniel",
    email: "helen.daniel@example.com",
    phone: "+234 803 111 2233",
    message:
      "Good morning, I want to ask about transfer admission into SS1 and current fee structure.",
    date: "2026-03-29",
  },
  {
    id: "contact-2",
    name: "Mr. Isa Bello",
    email: "isa.bello@example.com",
    phone: "+234 806 444 9912",
    message:
      "Please share details for boarding facilities and if weekend visitation is allowed for parents.",
    date: "2026-03-27",
  },
];
