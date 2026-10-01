import type {
  Faq,
  Course,
  Feature,
  NavLink,
  ServiceOption,
  SiteInfo,
  Stat,
  Workshop,
} from "./types";

export const siteInfo: SiteInfo = {
  name: "Better Training",
  tagline: "First aid and emergency training by healthcare professionals",
  location: "Brisbane, Queensland",
  phone: "1300 556 127",
  phoneHref: "tel:1300556127",
  email: "Info@bettertrainingbrisbane.com.au",
  address: "Unit 6, 192 Evans Rd, Salisbury QLD 4107",
  mapQuery: "Unit 6, 192 Evans Rd, Salisbury QLD 4107",
  hours: [
    { days: "Monday", time: "9am – 5pm" },
    { days: "Tuesday – Thursday", time: "9am – 10pm" },
    { days: "Friday – Sunday", time: "9am – 5pm" },
  ],
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Workshops", href: "/workshops" },
  { label: "Contact", href: "/contact" },
];

export const features: Feature[] = [
  {
    icon: "Map",
    title: "Nationally recognised courses",
    desc: "Training designed to build practical skills and real industry knowledge.",
  },
  {
    icon: "Users",
    title: "Qualified trainers",
    desc: "Extensive teaching experience across the VET sector, first aid, CPR and emergency training.",
  },
  {
    icon: "MessageCircle",
    title: "Healthcare experts",
    desc: "More than 20 years of healthcare experience and post-graduate qualifications.",
  },
];

const ACSF =
  "No prerequisite units. Language, literacy and numeracy skills equivalent to level 3 of the Australian Core Skills Framework are expected.";

export const courses: Course[] = [
  {
    slug: "provide-first-aid",
    category: "first-aid",
    image: "/images/course-first-aid.jpg",
    title: "Provide First Aid",
    code: "HLTAID011",
    price: 129,
    duration: "Minimum 7.5 hours",
    delivery: "Face-to-face",
    summary:
      "Nationally recognised first aid certification covering CPR, AED use and the everyday emergencies you are most likely to meet at work or at home.",
    audience:
      "Anyone who needs a first aid certificate. You must be physically able to do the practical demonstrations, including CPR on the floor and rescue breathing.",
    outcomes: [
      "Respond to a first aid emergency and manage the scene",
      "Perform CPR and use an automated external defibrillator (AED)",
      "Use the recovery position and manage choking",
      "Treat anaphylaxis, wounds, fractures, dislocations and envenomation",
      "Explain anatomy, physiology and the differences between adults, children and infants",
      "Complete a first aid incident report and recognise the psychological impact of an incident",
    ],
    prerequisites:
      "Physical capacity for the practical demonstrations. For the online component you need a computer, smartphone, tablet or other internet-enabled device.",
    assessment:
      "A written multiple-choice assessment, practical performance across 11 scenarios, and a first aid incident report.",
    renewal: "Industry recommended renewal period of 36 months.",
    inclusions: [
      "HLTAID011 Provide first aid",
      "HLTAID009 Provide cardiopulmonary resuscitation",
      "HLTAID010 Provide basic emergency life support",
    ],
  },
  {
    slug: "cpr-training",
    category: "first-aid",
    image: "/images/course-cpr.jpg",
    title: "CPR Training",
    code: "HLTAID009",
    price: 65,
    duration: "Minimum 2 hours",
    delivery: "Face-to-face",
    summary:
      "Learn or refresh adult and infant CPR following the Australian Resuscitation Council guidelines, including how to use an AED.",
    audience:
      "Anyone who needs or wants CPR skills. You must be able to perform 2 minutes of uninterrupted CPR on the floor.",
    outcomes: [
      "Recognise and assess a cardiac emergency",
      "Perform CPR in line with Australian Resuscitation Council guidelines",
      "Use an automated external defibrillator (AED)",
      "Rotate first aiders during compressions",
      "Use the recovery position and give rescue breathing",
      "Hand over to emergency services and understand the psychological impact",
    ],
    prerequisites:
      "Physical capacity for the practical demonstrations. For the online component you need a computer, smartphone, tablet or other internet-enabled device.",
    assessment:
      "Written and practical tasks: CPR on adult and infant manikins, plus multiple-choice theory questions.",
    renewal: "Industry recommended renewal period of 12 months.",
  },
  {
    slug: "education-and-care-first-aid",
    category: "first-aid",
    image: "/images/about-first-aid.jpg",
    title: "Education and Care First Aid",
    code: "HLTAID012",
    price: 149,
    duration: "8 hours classroom + 4.5 hours online or workbook",
    delivery: "Face-to-face with online preparation",
    summary:
      "First aid for educators and support staff in education or children's services, covering paediatric emergencies, asthma and anaphylaxis.",
    audience:
      "Educators and support staff in education or children's services who must respond to a first aid emergency.",
    outcomes: [
      "CPR and life support for adults, children and infants",
      "Airway management and automated external defibrillation",
      "Emergency response for anaphylaxis and asthma",
      "Trauma management including bleeding, fractures and burns",
      "Medical conditions such as diabetes and epilepsy",
      "Paediatric-specific protocols and clinical values",
    ],
    prerequisites:
      "No prerequisite units. You need the physical ability to give first aid and the communication skills to report an emergency.",
    assessment:
      "Progressive assessment through practical skills, written work and oral questions. CPR must be demonstrated on the floor.",
    renewal: null,
    inclusions: [
      "HLTAID012 Provide first aid in an education and care setting",
      "HLTAID011 Provide first aid",
    ],
  },
  {
    slug: "safe-manual-handling",
    category: "manual-handling",
    image: "/images/course-safe-manual-handling.jpg",
    title: "Safe Manual Handling",
    code: null,
    price: 60,
    duration: "Self-directed",
    delivery: "Self-directed learning package",
    summary:
      "Refresh your knowledge of safe manual handling, your employer's legislative responsibilities, and what happens when the right tools and techniques are not used.",
    audience:
      "Anyone who wants to refresh their workplace safety knowledge and understand employer responsibilities.",
    outcomes: [
      "Safe manual handling principles and techniques",
      "Your and your employer's legislative responsibilities",
      "The consequences of not using the knowledge, tools and equipment required for safe manual handling",
    ],
    prerequisites: "None listed.",
    assessment: "Self-directed learning package.",
    renewal: null,
  },
  {
    slug: "anaphylaxis-management",
    category: "health-conditions",
    image: "/images/course-anaphylaxis.jpg",
    title: "Anaphylaxis Management",
    code: "22578VIC",
    price: null,
    duration: "4 hours, or 3 hours plus about 1 hour 10 minutes online pre-work",
    delivery: "Face-to-face classroom or workplace",
    summary:
      "Course in First Aid Management of Anaphylaxis for people who work with children, patients and the public.",
    audience:
      "People working in childcare, education, aged and community care, tourism, hospitality and other workplace and community settings.",
    outcomes: [
      "Recognise allergic reactions and anaphylaxis triggers",
      "Respond to an emergency and use an adrenaline autoinjector",
      "Follow ASCIA action plans and give the correct dose",
      "Communicate with emergency services",
      "Create individual management plans and risk-minimisation strategies",
    ],
    prerequisites: ACSF,
    assessment:
      "Progressive assessment through practical skills and written or oral questions.",
    renewal: null,
  },
  {
    slug: "asthma-management",
    category: "health-conditions",
    image: "/images/course-asthma.jpg",
    title: "Asthma Management",
    code: "VU22927",
    price: null,
    duration: "4 hours, or 3 hours plus 1 hour online pre-work",
    delivery: "Face-to-face",
    summary:
      "Learn to assess asthma risk, build emergency plans and deliver first aid to someone having an asthma attack.",
    audience:
      "Teachers, childcare workers, aged-care and disability workers, sports coaches, youth workers and designated workplace first aiders.",
    outcomes: [
      "Develop asthma risk assessments and emergency management plans",
      "Identify asthma triggers",
      "Deliver first aid in an asthma emergency",
      "Follow peak body guidelines and complete incident reports",
    ],
    prerequisites: ACSF,
    assessment:
      "Progressive assessment through practical skills and written or oral questions on foundational knowledge.",
    renewal: null,
  },
  {
    slug: "certificate-iii-individual-support",
    category: "qualifications",
    image: "/images/course-cert3-individual-support.jpg",
    title: "Certificate III in Individual Support",
    code: null,
    price: null,
    duration: null,
    delivery: "Face-to-face",
    summary:
      "A qualification for people who support others in the community, at home or in residential care, working under supervision.",
    audience:
      "Workers who support people needing assistance because of ageing, disability or other circumstances.",
    outcomes: [
      "Deliver person-centred support within a multidisciplinary team",
      "Work to individualised care plans",
      "Support people in community, home and residential care settings",
    ],
    prerequisites:
      "No prerequisite units. You need the physical ability to give first aid, verbal skills to report an emergency and writing skills for documentation. A short knowledge assessment may come before training to check literacy, numeracy and language.",
    assessment:
      "Practical skill demonstrations, written assessments and oral questioning. CPR must be demonstrated on the floor.",
    renewal: null,
  },
  {
    slug: "certificate-iv-mental-health",
    category: "qualifications",
    image: "/images/course-cert4-mental-health.jpg",
    title: "Certificate IV in Mental Health (RPL)",
    code: null,
    price: null,
    duration: null,
    delivery: "Recognition of prior learning",
    summary:
      "A qualification for workers who provide self-directed, recovery-oriented support for people affected by mental illness and psychiatric disability.",
    audience:
      "Experienced workers in the mental health sector seeking formal recognition of their skills.",
    outcomes: [
      "Recovery-oriented support for people affected by mental illness",
      "Support for people with psychiatric disability",
    ],
    prerequisites: "Contact us to discuss eligibility for recognition of prior learning.",
    assessment: "Recognition of prior learning process. Contact us for details.",
    renewal: null,
    inclusions: [
      "Completion certificate",
      "eBook: Healthy Minds Productive Minds: Mental Health in the Workplace by Lyn Benson and John Haines",
    ],
  },
  {
    slug: "certificate-iv-disability",
    category: "qualifications",
    image: "/images/course-cert4-disability.jpg",
    title: "Certificate IV in Disability",
    code: null,
    price: null,
    duration: null,
    delivery: "Standard classroom delivery only",
    summary:
      "A qualification for community sector workers who provide training and support that empowers people with disability.",
    audience:
      "Community sector workers who support people with disability in a variety of settings.",
    outcomes: [
      "Provide training and support that builds independence and self-reliance",
      "Support community participation and wellbeing",
    ],
    prerequisites:
      "No prerequisite units. You need the physical ability to give first aid, oral skills to report an emergency and writing skills for documentation.",
    assessment:
      "Progressive assessment through practical skills and written and oral questions. CPR must be demonstrated on the floor.",
    renewal: null,
  },
];

const SMALL_GROUPS =
  "Small groups for individual attention: face-to-face theory, practical demonstration, practice and assessment. On-site delivery available on request.";

export const workshops: Workshop[] = [
  {
    slug: "diabetes-management",
    image: "/images/workshop-diabetes.png",
    title: "Diabetes Management",
    duration: "3 hours",
    summary:
      "The basic theory and clinical skills to safely care for and manage clients with diabetes.",
    audience: "Healthcare professionals and care staff who need diabetes management competency.",
    outcomes: [
      "The endocrine system and diabetes risk factors",
      "The different types of diabetes",
      "How glucose and insulin work",
      "Recognising and giving first aid for hyperglycaemia and hypoglycaemia",
      "Common complications and diabetic medications",
      "Blood glucose monitoring and testing",
      "Safe insulin administration",
    ],
    format: SMALL_GROUPS,
  },
  {
    slug: "medication-management",
    image: "/images/workshop-medication.png",
    title: "Medication Management",
    duration: null,
    summary:
      "The skills and knowledge to prepare and administer medication and complete medication documentation.",
    audience:
      "Care workers, community support workers, carers and new care workers who handle medications.",
    outcomes: [
      "Medication administration policies and your role and responsibilities",
      "Safe administration of Webster packs, inhalers, creams, eye drops and liquids",
      "Medication disposal",
      "Completing medication documentation",
      "Incident reporting procedures",
    ],
    format: SMALL_GROUPS,
  },
  {
    slug: "peg-tube-management",
    image: "/images/workshop-peg.jpeg",
    title: "PEG Tube Management",
    duration: null,
    summary:
      "The basic theory and clinical skills to safely care for and manage PEG tubes.",
    audience: "Healthcare professionals and organisation staff who need PEG tube competency.",
    outcomes: [
      "Anatomy related to PEG feeding",
      "Organisation policies and protocols",
      "Indications for PEG feeding",
      "Assessment and care of the PEG tube site",
      "Safe PEG feed and medication administration",
      "Troubleshooting PEG complications",
      "Stoma care and dressing",
      "Legal requirements for reporting and documentation",
    ],
    format: SMALL_GROUPS,
  },
  {
    slug: "stoma-ostomy-management",
    image: "/images/workshop-stoma.jpeg",
    title: "Stoma (Ostomy) Management",
    duration: null,
    summary:
      "The basic theory and clinical skills to safely care for and manage clients with an ostomy.",
    audience: "Healthcare professionals and carers who need ostomy care skills.",
    outcomes: [
      "Overview of the gastrointestinal tract",
      "Indications for stoma formation",
      "Infection control",
      "Identifying complications",
      "Dietary recommendations",
      "Fitting, emptying and changing a bag",
      "Maintaining client privacy and dignity",
      "Psychosocial support strategies",
    ],
    format: SMALL_GROUPS,
  },
  {
    slug: "bowel-management",
    image: "/images/workshop-bowel.png",
    title: "Bowel Management",
    duration: null,
    summary:
      "The basic theory and clinical skills to safely care for clients while maintaining healthy bowel habits.",
    audience: "Care professionals who need competency in client bowel care.",
    outcomes: [
      "Anatomy and physiology of the gastrointestinal tract",
      "Why healthy bowel function matters",
      "Factors that affect normal elimination",
      "Preventing and managing common bowel problems",
      "Measures that promote effective bowel function",
      "Autonomic dysreflexia and emergency response",
      "Legal reporting and documentation",
      "Administering rectal suppositories and disposable enemas",
    ],
    format: SMALL_GROUPS,
  },
  {
    slug: "idc-spc-management",
    image: "/images/workshop-idc-spc.png",
    title: "IDC / SPC Management",
    duration: null,
    summary:
      "The basic theory and clinical skills to safely care for and manage an indwelling catheter (IDC) or suprapubic catheter (SPC) while following infection control protocols.",
    audience: "Healthcare professionals who manage indwelling or suprapubic catheters.",
    outcomes: [
      "Indications for catheter use",
      "Policies and protocols",
      "Urinary system terminology",
      "Managing leg bag and night bag systems",
      "Catheter care and management",
      "Recognising potential complications",
      "Why fluid balance charting matters",
      "Documentation and legal reporting",
    ],
    format: SMALL_GROUPS,
  },
  {
    slug: "manual-handling",
    image: "/images/workshop-manual-handling.png",
    title: "Manual Handling",
    duration: null,
    summary:
      "The basic theory and skills to safely carry out manual handling tasks in line with WHS legislation.",
    audience: "Individuals and organisations that need manual handling training, especially in the care sector.",
    outcomes: [
      "Relevant legislation and your responsibilities",
      "Completing a manual handling risk assessment",
      "Moving clients in bed and using slide sheets",
      "Using mechanical devices such as stand-up and sling lifters",
      "Car transfers",
      "Legal reporting and documentation",
    ],
    format: SMALL_GROUPS,
  },
];

export const stats: Stat[] = [
  { value: "20+", label: "years of healthcare experience" },
  { value: `${courses.length + workshops.length}`, label: "courses and workshops" },
  { value: "7", label: "days a week, evenings Tue–Thu" },
];

export const philosophy = {
  quote:
    "If you teach a student, they may forget. If you show them a skill, they may remember. But if you involve them in the learning process, they will understand forever.",
};

export const serviceOptions: ServiceOption[] = [
  ...courses.map((c) => ({
    slug: c.slug,
    name: c.title,
    price: c.price,
    duration: c.duration,
    group: "Courses" as const,
  })),
  ...workshops.map((w) => ({
    slug: w.slug,
    name: w.title,
    price: null,
    duration: w.duration,
    group: "Workshops" as const,
  })),
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
export const getWorkshop = (slug: string) => workshops.find((w) => w.slug === slug);

export const formatPrice = (price: number | null) =>
  price === null ? "Contact us" : `$${price}`;

export const classSteps = [
  {
    title: "Book your place",
    body: "Choose a course or workshop online, or call us. Prices are listed on every course page.",
  },
  {
    title: "Prepare online",
    body: "Some courses include online pre-work or a workbook, so classroom time goes to hands-on practice. You will need a computer, smartphone or tablet.",
  },
  {
    title: "Learn by doing",
    body: "Face-to-face theory, then practical demonstration and practice in small groups, with CPR practised on the floor on adult and infant manikins.",
  },
  {
    title: "Show what you know",
    body: "Assessment is progressive: practical skills, written questions and oral questioning, depending on the course.",
  },
  {
    title: "Stay current",
    body: "CPR certificates have an industry recommended renewal period of 12 months. Provide First Aid is 36 months.",
  },
];

export const audiences = [
  {
    title: "Education and childcare",
    body: "Educators and support staff who must respond to a first aid emergency, plus teachers and youth workers managing asthma and anaphylaxis.",
    href: "/courses/education-and-care-first-aid",
  },
  {
    title: "Aged care and disability",
    body: "Care workers and carers who need practical skills for medication, PEG tubes, stomas, catheters, bowel care and diabetes.",
    href: "/workshops",
  },
  {
    title: "Workplaces and teams",
    body: "Designated first aiders and managers who need CPR, first aid and safe manual handling. Workshops can be delivered on your site.",
    href: "/courses/provide-first-aid",
  },
  {
    title: "Anyone who wants to be ready",
    body: "Community members, sports coaches and parents who want the confidence to act when it matters.",
    href: "/courses/cpr-training",
  },
];

export const unitCodes = [
  { code: "HLTAID009", title: "Provide cardiopulmonary resuscitation", href: "/courses/cpr-training" },
  { code: "HLTAID010", title: "Provide basic emergency life support", href: "/courses/provide-first-aid" },
  { code: "HLTAID011", title: "Provide first aid", href: "/courses/provide-first-aid" },
  { code: "HLTAID012", title: "Provide first aid in an education and care setting", href: "/courses/education-and-care-first-aid" },
  { code: "22578VIC", title: "First aid management of anaphylaxis", href: "/courses/anaphylaxis-management" },
  { code: "VU22927", title: "Asthma management", href: "/courses/asthma-management" },
];

export const faqs = [
  {
    q: "Do I need to be physically fit to take a first aid course?",
    a: "You need the physical capacity to do the practical demonstrations, including 2 minutes of uninterrupted CPR on the floor and rescue breathing. If you are unsure, call us before you book.",
  },
  {
    q: "How long does my certificate last?",
    a: "The industry recommended renewal period is 12 months for CPR and 36 months for Provide First Aid.",
  },
  {
    q: "How am I assessed?",
    a: "Assessment depends on the course. Provide First Aid includes a written multiple-choice test, practical performance across 11 scenarios and a first aid incident report. CPR includes CPR on adult and infant manikins plus theory questions.",
  },
  {
    q: "What do I need for the online part of a course?",
    a: "A computer, smartphone, tablet or other internet-enabled device.",
  },
  {
    q: "Can you train my team at our workplace?",
    a: "Yes. Our workshops can be delivered at your site on request, and we offer corporate packages. Contact us for pricing.",
  },
  {
    q: "How much do courses cost?",
    a: "CPR is $65, Safe Manual Handling is $60, Provide First Aid is $129 and Education and Care First Aid is $149. Other courses and all workshops are priced on request.",
  },
  {
    q: "Where and when do you run training?",
    a: "At Unit 6, 192 Evans Rd, Salisbury. We are open Monday 9am to 5pm, Tuesday to Thursday 9am to 10pm, and Friday to Sunday 9am to 5pm.",
  },
];

/** Course-specific questions built only from the facts we already publish for each course. */
export function courseFaqs(c: Course): Faq[] {
  const list: Faq[] = [];
  if (c.duration) list.push({ q: "How long is the course?", a: `${c.duration}.` });
  list.push({
    q: "How much does it cost?",
    a:
      c.price === null
        ? `Pricing is quoted on request. Call ${siteInfo.phone} or email ${siteInfo.email}.`
        : `${formatPrice(c.price)}.`,
  });
  list.push({ q: "Who is it for?", a: c.audience });
  list.push({ q: "Are there any prerequisites?", a: c.prerequisites });
  list.push({ q: "How am I assessed?", a: c.assessment });
  if (c.renewal) list.push({ q: "When does my certificate need renewing?", a: c.renewal });
  list.push({
    q: "How do I book?",
    a: `Use the Book now button, or call us on ${siteInfo.phone}.`,
  });
  return list;
}
