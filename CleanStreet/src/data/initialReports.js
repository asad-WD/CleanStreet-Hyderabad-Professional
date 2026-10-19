export const HYDERABAD_AREAS = [
  'Qasimabad (Phase 1 & 2)',
  'Latifabad Unit 1 to 5',
  'Latifabad Unit 6 to 12',
  'GOR Colony',
  'Saddar Cantonment',
  'Hirabad & Tower Market',
  'Auto Bhan Road',
  'Citizen Colony',
  'Kohsar & Wadhu Wah',
  'Phuleli Canal Bank',
  'Civil Hospital Area',
  'Hyderabad Railway Station'
];

export const WASTE_CATEGORIES = [
  'Overflowing garbage bin',
  'Illegal dumping & open dump',
  'Uncollected household waste',
  'Construction debris & rubble',
  'Commercial market waste',
  'Clogged stormwater drain',
  'Hazardous / Medical waste'
];

export const STATUS_LIST = [
  'Reported',
  'Under Review',
  'Cleanup Scheduled',
  'In Progress',
  'Resolved'
];

export const URGENCIES = ['Low', 'Medium', 'High', 'Critical'];

export const CREWS = [
  'SSWMB Rapid Response Squad Alpha',
  'Hyderabad Municipal Corp (Zone 1)',
  'Qasimabad Green Crew 03',
  'Latifabad Sanitation Taskforce',
  'Special Debris Clearance Unit'
];

export const initialReports = [
  {
    id: 'CS-1048',
    title: 'Severe garbage overflow near GOR Public Park',
    category: 'Overflowing garbage bin',
    description: 'Two large steel municipal containers have been overflowing for 4 days. Strong odor and stray animals are scattering trash onto the main walkway.',
    area: 'GOR Colony',
    landmark: 'Opposite Gate 2, GOR Children Park',
    date: '2026-10-18',
    createdAt: Date.now() - 1000 * 60 * 60 * 26,
    urgency: 'High',
    status: 'In Progress',
    assignedCrew: 'SSWMB Rapid Response Squad Alpha',
    slaDeadline: 'Within 12 hours',
    upvotes: 42,
    upvotedByMe: false,
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    afterImage: '',
    lat: 25.4052,
    lng: 68.3614,
    history: [
      { status: 'Reported', date: '2026-10-18T08:15:00Z', note: 'Report logged by neighborhood resident with verified coordinates.' },
      { status: 'Under Review', date: '2026-10-18T10:30:00Z', note: 'Verified by Municipal Waste Inspector. Priority set to High.' },
      { status: 'In Progress', date: '2026-10-19T06:00:00Z', note: 'Compactor vehicle #HY-304 dispatched with 4 sanitation crew members.' }
    ],
    comments: [
      { id: 'c1', author: 'Dr. Tariq M.', text: 'The odor is reaching nearby clinics. Thank you for dispatching!', date: 'Yesterday at 3:15 PM', isOfficial: false },
      { id: 'c2', author: 'SSWMB Dispatch', text: 'Crew is actively collecting debris. Estimated completion by 4:00 PM today.', date: 'Today at 7:00 AM', isOfficial: true }
    ]
  },
  {
    id: 'CS-1049',
    title: 'Illegal demolition rubble dumped on pedestrian pavement',
    category: 'Construction debris & rubble',
    description: 'A contractor dumped approximately 3 tons of broken concrete, bricks, and plaster on the sidewalk, completely blocking pedestrian access to the bus stop.',
    area: 'Auto Bhan Road',
    landmark: 'Beside Boulevard Mall, near bus shelter',
    date: '2026-10-17',
    createdAt: Date.now() - 1000 * 60 * 60 * 50,
    urgency: 'Medium',
    status: 'Cleanup Scheduled',
    assignedCrew: 'Special Debris Clearance Unit',
    slaDeadline: 'Within 24 hours',
    upvotes: 28,
    upvotedByMe: true,
    image: 'https://images.unsplash.com/photo-1591193686104-fccc31c19fb7?auto=format&fit=crop&w=800&q=80',
    afterImage: '',
    lat: 25.3782,
    lng: 68.3524,
    history: [
      { status: 'Reported', date: '2026-10-17T11:20:00Z', note: 'Citizen reported obstruction of public footpath.' },
      { status: 'Under Review', date: '2026-10-17T14:00:00Z', note: 'Requires heavy front-loader machinery.' },
      { status: 'Cleanup Scheduled', date: '2026-10-18T09:00:00Z', note: 'Front-loader truck scheduled for night clearance shift to minimize traffic disruption.' }
    ],
    comments: [
      { id: 'c3', author: 'Bilal Khan', text: 'School children are having to walk into busy road traffic due to this blockage.', date: 'Oct 17, 2026', isOfficial: false }
    ]
  },
  {
    id: 'CS-1050',
    title: 'Commercial vegetable & packaging waste behind Tower Market',
    category: 'Commercial market waste',
    description: 'Rotting vegetable boxes, wet produce, and discarded polythene bags accumulated behind wholesale stalls. Drain grates are getting blocked.',
    area: 'Hirabad & Tower Market',
    landmark: 'Behind Fruit Market Lane, Tower Chowk',
    date: '2026-10-19',
    createdAt: Date.now() - 1000 * 60 * 60 * 8,
    urgency: 'Critical',
    status: 'Under Review',
    assignedCrew: 'Hyderabad Municipal Corp (Zone 1)',
    slaDeadline: 'Within 6 hours',
    upvotes: 65,
    upvotedByMe: false,
    image: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=800&q=80',
    afterImage: '',
    lat: 25.3995,
    lng: 68.3712,
    history: [
      { status: 'Reported', date: '2026-10-19T06:45:00Z', note: 'Emergency report logged via mobile web portal.' },
      { status: 'Under Review', date: '2026-10-19T07:15:00Z', note: 'Flagged as high sanitary risk for neighboring food establishments.' }
    ],
    comments: [
      { id: 'c4', author: 'Market Traders Union', text: 'We requested an additional 10-yard skip bin for this corner.', date: 'Today at 8:20 AM', isOfficial: false }
    ]
  },
  {
    id: 'CS-1051',
    title: 'Canal bank plastic pollution & uncollected household bags',
    category: 'Illegal dumping & open dump',
    description: 'Open illegal dumping site formed along the canal embankment. Plastic bottles, wrappers, and discarded mattresses are spilling into the water.',
    area: 'Phuleli Canal Bank',
    landmark: 'Near Phuleli Old Bridge, Street 4 entry',
    date: '2026-10-15',
    createdAt: Date.now() - 1000 * 60 * 60 * 96,
    urgency: 'High',
    status: 'Resolved',
    assignedCrew: 'SSWMB Rapid Response Squad Alpha',
    slaDeadline: 'Completed',
    upvotes: 91,
    upvotedByMe: true,
    image: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    lat: 25.3888,
    lng: 68.3845,
    history: [
      { status: 'Reported', date: '2026-10-15T09:00:00Z', note: 'Reported with high urgency.' },
      { status: 'Under Review', date: '2026-10-15T12:00:00Z', note: 'Ecological hazard confirmed.' },
      { status: 'Cleanup Scheduled', date: '2026-10-16T08:00:00Z', note: 'Joint cleanup effort organized.' },
      { status: 'In Progress', date: '2026-10-16T14:00:00Z', note: '5 dump trucks cleared 8.5 tons of plastic waste.' },
      { status: 'Resolved', date: '2026-10-17T17:30:00Z', note: 'Canal embankment fully restored and warning signage installed.' }
    ],
    comments: [
      { id: 'c5', author: 'Ayesha Siddiqui', text: 'Incredible work by the crew! The bank looks spotless today.', date: 'Oct 17, 2026', isOfficial: false },
      { id: 'c6', author: 'Sanitation Officer Khan', text: 'Area inspected and approved. Surveillance camera requested for this point.', date: 'Oct 17, 2026', isOfficial: true }
    ]
  },
  {
    id: 'CS-1052',
    title: 'Residential waste dumped near school boundary wall',
    category: 'Uncollected household waste',
    description: 'Household trash bags dumped on vacant land adjacent to the Government Girls School entrance. Attracting flies and dogs.',
    area: 'Latifabad Unit 1 to 5',
    landmark: 'Behind Govt Girls Higher Secondary School, Unit 3',
    date: '2026-10-18',
    createdAt: Date.now() - 1000 * 60 * 60 * 30,
    urgency: 'High',
    status: 'In Progress',
    assignedCrew: 'Latifabad Sanitation Taskforce',
    slaDeadline: 'Within 8 hours',
    upvotes: 53,
    upvotedByMe: false,
    image: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?auto=format&fit=crop&w=800&q=80',
    afterImage: '',
    lat: 25.3671,
    lng: 68.3629,
    history: [
      { status: 'Reported', date: '2026-10-18T07:30:00Z', note: 'School administration submitted alert.' },
      { status: 'Under Review', date: '2026-10-18T08:45:00Z', note: 'Expedited due to school proximity.' },
      { status: 'In Progress', date: '2026-10-19T06:30:00Z', note: 'Mini-tipper crew on site clearing pile.' }
    ],
    comments: [
      { id: 'c7', author: 'Principal Farzana', text: 'Thank you for prioritizing our student safety.', date: 'Oct 18, 2026', isOfficial: false }
    ]
  },
  {
    id: 'CS-1053',
    title: 'Plastic bottles and fast-food wrappers clogging storm drain',
    category: 'Clogged stormwater drain',
    description: 'Main monsoon rainwater culvert blocked with PET bottles, foam cups, and poly bags. Rain forecasted this weekend could cause street flooding.',
    area: 'Qasimabad (Phase 1 & 2)',
    landmark: 'Near Naseem Nagar Chowk, Qasimabad',
    date: '2026-10-19',
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
    urgency: 'Critical',
    status: 'Reported',
    assignedCrew: 'Qasimabad Green Crew 03',
    slaDeadline: 'Within 4 hours',
    upvotes: 74,
    upvotedByMe: true,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    afterImage: '',
    lat: 25.4089,
    lng: 68.3412,
    history: [
      { status: 'Reported', date: '2026-10-19T09:10:00Z', note: 'Resident reported drain hazard prior to expected rains.' }
    ],
    comments: [
      { id: 'c8', author: 'Kashif Memon', text: 'Every time it rains this intersection submerges. Needs de-silting ASAP.', date: 'Today at 10:00 AM', isOfficial: false }
    ]
  },
  {
    id: 'CS-1054',
    title: 'Cantonment shopping precinct overflowing bins',
    category: 'Overflowing garbage bin',
    description: 'Weekend footfall resulted in all three bins spilling onto tree planter beds near the bakery and bank row.',
    area: 'Saddar Cantonment',
    landmark: 'Opposite Hyderabad Gymkhana / Cantt Post Office',
    date: '2026-10-16',
    createdAt: Date.now() - 1000 * 60 * 60 * 70,
    urgency: 'Low',
    status: 'Resolved',
    assignedCrew: 'Hyderabad Municipal Corp (Zone 1)',
    slaDeadline: 'Completed',
    upvotes: 19,
    upvotedByMe: false,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    afterImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    lat: 25.3942,
    lng: 68.3688,
    history: [
      { status: 'Reported', date: '2026-10-16T18:00:00Z', note: 'Logged during evening retail rush.' },
      { status: 'Resolved', date: '2026-10-17T06:00:00Z', note: 'Morning routine pickup emptied bins and pressure-washed sidewalk.' }
    ],
    comments: []
  },
  {
    id: 'CS-1055',
    title: 'Dumped hospital clinic cartons and medical blister packs',
    category: 'Hazardous / Medical waste',
    description: 'Cardboard boxes containing expired medical supplies, needles, and packaging abandoned near a corner wall. Potential biohazard.',
    area: 'Civil Hospital Area',
    landmark: 'Behind Outpatient Block, Medical Enclave Lane',
    date: '2026-10-19',
    createdAt: Date.now() - 1000 * 60 * 60 * 3,
    urgency: 'Critical',
    status: 'In Progress',
    assignedCrew: 'Special Debris Clearance Unit',
    slaDeadline: 'Within 2 hours',
    upvotes: 112,
    upvotedByMe: true,
    image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&w=800&q=80',
    afterImage: '',
    lat: 25.3977,
    lng: 68.3644,
    history: [
      { status: 'Reported', date: '2026-10-19T11:00:00Z', note: 'Flagged as hazardous clinical waste.' },
      { status: 'Under Review', date: '2026-10-19T11:15:00Z', note: 'Environmental health team notified.' },
      { status: 'In Progress', date: '2026-10-19T11:30:00Z', note: 'Hazardous waste handlers en route with biohazard gear.' }
    ],
    comments: [
      { id: 'c9', author: 'Health Officer Rehan', text: 'Investigation opened against the nearby private lab responsible.', date: '1 hour ago', isOfficial: true }
    ]
  }
];

export const CITIZEN_ACHIEVEMENTS = [
  { id: 'badge-1', name: 'First Observer', description: 'Submitted your first verified community report', icon: 'Eye', points: 50, unlocked: true },
  { id: 'badge-2', name: 'Neighborhood Guardian', description: 'Supported 10+ community reports with upvotes', icon: 'Shield', points: 150, unlocked: true },
  { id: 'badge-3', name: 'Clean Hyderabad Champion', description: 'Participated in resolving 5 community waste issues', icon: 'Award', points: 300, unlocked: false },
  { id: 'badge-4', name: 'Drainage Protector', description: 'Prevented monsoon waterlogging by flagging clogged culverts', icon: 'Droplets', points: 200, unlocked: false }
];
