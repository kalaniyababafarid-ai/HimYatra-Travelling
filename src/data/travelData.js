export const BUSINESS_INFO = {
  name: 'HimYatra',
  tagline: 'Curated Himachal & Uttarakhand Journeys',
  location: 'Manali, Himachal Pradesh',
  address: 'The Mall Road, Near Circuit House, Manali, HP 175131',
  regionalOffice: 'Rajpur Road, Dehradun, Uttarakhand 248001',
  phone: '+91 98160 44210',
  phoneRaw: '919816044210',
  whatsapp: '919816044210',
  email: 'hello@himyatra.in',
  hours: 'Mon – Sun • 8:00 AM – 10:00 PM IST',
};

export const BASE_URL = (import.meta.env.BASE_URL || '/').endsWith('/')
  ? (import.meta.env.BASE_URL || '/')
  : `${import.meta.env.BASE_URL}/`;

export function getImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${BASE_URL}${clean}`;
}

export const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', rate: 1 },
  USD: { code: 'USD', symbol: '$', rate: 0.012 },
};

export function formatPrice(inrAmount, currencyCode = 'INR') {
  const curr = CURRENCIES[currencyCode] || CURRENCIES.INR;
  const converted = Math.round(inrAmount * curr.rate);
  if (curr.code === 'INR') {
    return `${curr.symbol}${converted.toLocaleString('en-IN')}`;
  }
  return `${curr.symbol}${converted.toLocaleString('en-US')}`;
}

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${BUSINESS_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const ALL_PACKAGES = [
  {
    id: 'manali-solang',
    name: 'Manali, Solang & Atal Tunnel Retreat',
    state: 'Himachal Pradesh',
    location: 'Manali & Solang Valley, HP',
    category: 'Tour Packages',
    travelStyle: 'Honeymoon & Snow',
    duration: '5 Days / 4 Nights',
    rating: '4.9',
    reviews: '2,480 travelers',
    priceInr: 14999,
    originalPriceInr: 19500,
    unit: 'person',
    badge: 'Bestseller • Himachal',
    bestTime: 'Oct – Jun',
    pickupHubs: 'Delhi / Chandigarh',
    image: getImageUrl('images/manali-retreat.jpg'),
    highlights: ['Atal Tunnel & Sissu', 'Boutique Cedar Resort', 'Private Cab / Volvo', 'Breakfast & Dinner'],
    description:
      'Stay in sunlit cedar-wood chalets overlooking Manali’s snow-clad peaks with guided drives through Solang Valley, Atal Tunnel, and Old Manali cafes.',
  },
  {
    id: 'spiti-circuit',
    name: 'Spiti Valley & Chandratal Expedition',
    state: 'Himachal Pradesh',
    location: 'Kaza, Key Monastery & Chandratal, HP',
    category: 'Tour Packages',
    travelStyle: 'Adventure & Trek',
    duration: '7 Days / 6 Nights',
    rating: '4.9',
    reviews: '1,640 travelers',
    priceInr: 21500,
    originalPriceInr: 27000,
    unit: 'person',
    badge: 'High-Altitude • Himachal',
    bestTime: 'May – Oct',
    pickupHubs: 'Shimla / Manali / Chandigarh',
    image: getImageUrl('images/spiti-shimla.jpg'),
    highlights: ['Key & Tabo Monasteries', 'Chandratal Lake Camp', '4x4 Mountain SUV', 'Oxygen & Permits'],
    description:
      'Traverse dramatic Himalayan passes from Shimla through Kinnaur and Kaza to turquoise Chandratal Lake with experienced Himachali road captains.',
  },
  {
    id: 'rishikesh-nainital',
    name: 'Rishikesh, Mussoorie & Emerald Lakes',
    state: 'Uttarakhand',
    location: 'Rishikesh & Nainital, UK',
    category: 'Tour Packages',
    travelStyle: 'Family & Leisure',
    duration: '5 Days / 4 Nights',
    rating: '4.8',
    reviews: '2,120 travelers',
    priceInr: 13999,
    originalPriceInr: 17800,
    unit: 'person',
    badge: 'Top Rated • Uttarakhand',
    bestTime: 'Year-Round',
    pickupHubs: 'Delhi / Haridwar / Dehradun',
    image: getImageUrl('images/rishikesh-nainital.jpg'),
    highlights: ['Ganga Aarti & Rafting', 'Naini Lake Boating', 'Hilltop Boutique Stay', 'AC Innova Crysta'],
    description:
      'Blend sacred Ganga evenings in Rishikesh with misty cedar trails in Mussoorie and emerald lakefront mornings across Nainital and Bhimtal.',
  },
  {
    id: 'auli-chopta',
    name: 'Auli Snow Slopes & Chopta Meadows',
    state: 'Uttarakhand',
    location: 'Auli, Joshimath & Chopta, UK',
    category: 'Tour Packages',
    travelStyle: 'Adventure & Trek',
    duration: '5 Days / 4 Nights',
    rating: '4.9',
    reviews: '1,390 travelers',
    priceInr: 16800,
    originalPriceInr: 21500,
    unit: 'person',
    badge: 'Alpine Escape • Uttarakhand',
    bestTime: 'Dec – Jun & Sep – Nov',
    pickupHubs: 'Delhi / Rishikesh / Dehradun',
    image: getImageUrl('images/kedarnath-chopta.jpg'),
    highlights: ['Auli Ropeway & Skiing', 'Tungnath & Chandrashila', 'Swiss Alpine Glamping', 'All Meals Included'],
    description:
      'Wake up inside cozy Himalayan glamping domes facing Nanda Devi peak, hike to the world’s highest Shiva temple at Tungnath, and ride the Auli cable car.',
  },
  {
    id: 'shimla-kufri',
    name: 'Shimla, Mashobra & Kufri Heritage Stay',
    state: 'Himachal Pradesh',
    location: 'Shimla & Mashobra, HP',
    category: 'Hotels & Stays',
    travelStyle: 'Family & Leisure',
    duration: '4 Days / 3 Nights',
    rating: '4.8',
    reviews: '1,910 travelers',
    priceInr: 11499,
    originalPriceInr: 14900,
    unit: 'person',
    badge: 'Family Favorite • Himachal',
    bestTime: 'Year-Round',
    pickupHubs: 'Delhi / Kalka / Chandigarh',
    image: getImageUrl('images/himachal-hero.jpg'),
    highlights: ['Pine-View Luxury Chalet', 'Kalka–Shimla Toy Train', 'Kufri & Naldehra Tour', 'Bonfire Evening'],
    description:
      'Classic colonial charm meets serene Mashobra pine forests—ideal for families, senior citizens, and relaxed weekend escapes from Delhi NCR.',
  },
  {
    id: 'kasol-bir',
    name: 'Kasol, Tosh & Bir Billing Paragliding',
    state: 'Himachal Pradesh',
    location: 'Parvati Valley & Bir, HP',
    category: 'Cab & Volvo',
    travelStyle: 'Adventure & Trek',
    duration: '5 Days / 4 Nights',
    rating: '4.8',
    reviews: '1,540 travelers',
    priceInr: 12800,
    originalPriceInr: 16000,
    unit: 'person',
    badge: 'Youth & Groups • Himachal',
    bestTime: 'Mar – Jun & Sep – Dec',
    pickupHubs: 'Delhi / Chandigarh',
    image: getImageUrl('images/spiti-shimla.jpg'),
    highlights: ['Tandem Paragliding (GoPro)', 'Parvati Riverside Stay', 'Chalal & Tosh Walk', 'Semi-Sleeper Volvo'],
    description:
      'Soar over Kangra’s lush valley at Asia’s premier paragliding site in Bir Billing and unwind by the gushing Parvati River in Kasol.',
  },
  {
    id: 'kedarnath-badrinath',
    name: 'Do Dham Yatra: Kedarnath & Badrinath',
    state: 'Uttarakhand',
    location: 'Guptkashi, Kedarnath & Badrinath, UK',
    category: 'Yatra & Treks',
    travelStyle: 'Spiritual & Yatra',
    duration: '6 Days / 5 Nights',
    rating: '4.9',
    reviews: '2,890 pilgrims',
    priceInr: 24500,
    originalPriceInr: 29900,
    unit: 'person',
    badge: 'Verified Yatra • Uttarakhand',
    bestTime: 'May – Jun & Sep – Nov',
    pickupHubs: 'Haridwar / Rishikesh / Dehradun',
    image: getImageUrl('images/kedarnath-chopta.jpg'),
    highlights: ['Yatra Registration Included', 'VIP Temple Assistance', 'Heated Deluxe Hotels', 'Dedicated Innova/Tempo'],
    description:
      'Thoughtfully paced spiritual pilgrimage with comfortable stays, senior-friendly pacing, heli-pad assistance, and local Uttarakhand guides.',
  },
  {
    id: 'jim-corbett-nainital',
    name: 'Nainital Lakes & Jim Corbett Safari',
    state: 'Uttarakhand',
    location: 'Nainital, Bhimtal & Corbett, UK',
    category: 'Hotels & Stays',
    travelStyle: 'Family & Leisure',
    duration: '4 Days / 3 Nights',
    rating: '4.8',
    reviews: '1,730 travelers',
    priceInr: 15400,
    originalPriceInr: 19200,
    unit: 'person',
    badge: 'Wildlife & Lakes • Uttarakhand',
    bestTime: 'Oct – Jun',
    pickupHubs: 'Delhi / Kathgodam',
    image: getImageUrl('images/rishikesh-nainital.jpg'),
    highlights: ['Dhikala / Bijrani Jeep Safari', 'Lakefront Resort Room', 'Naini Peak Cable Car', 'Private Cab'],
    description:
      'Spot Royal Bengal tigers on dawn jeep safaris in Jim Corbett before retreating to cool lakeside resorts in Nainital and Naukuchiatal.',
  },
];

export const DESTINATIONS_BY_STATE = {
  'Himachal Pradesh': [
    { name: 'Manali & Solang', tag: 'Snow & Honeymoon', altitude: '2,050 m', startingInr: 14999 },
    { name: 'Spiti & Chandratal', tag: 'Monasteries & 4x4', altitude: '3,800 m', startingInr: 21500 },
    { name: 'Shimla & Mashobra', tag: 'Toy Train & Pines', altitude: '2,200 m', startingInr: 11499 },
    { name: 'Kasol, Tosh & Bir', tag: 'Riverside & Flying', altitude: '1,580 m', startingInr: 12800 },
    { name: 'Dharamshala & McLeod', tag: 'Tibetan Culture', altitude: '1,457 m', startingInr: 12499 },
    { name: 'Dalhousie & Khajjiar', tag: 'Alpine Meadows', altitude: '1,970 m', startingInr: 11999 },
  ],
  Uttarakhand: [
    { name: 'Rishikesh & Mussoorie', tag: 'Rafting & Hills', altitude: '2,005 m', startingInr: 13999 },
    { name: 'Nainital & Corbett', tag: 'Lakes & Safari', altitude: '1,938 m', startingInr: 15400 },
    { name: 'Auli & Chopta', tag: 'Skiing & Treks', altitude: '2,800 m', startingInr: 16800 },
    { name: 'Kedarnath & Badrinath', tag: 'Sacred Do Dham', altitude: '3,583 m', startingInr: 24500 },
    { name: 'Valley of Flowers', tag: 'UNESCO Trek', altitude: '3,658 m', startingInr: 18900 },
    { name: 'Lansdowne & Mukteshwar', tag: 'Quiet Retreat', altitude: '2,171 m', startingInr: 10999 },
  ],
};

export const SERVICES_LIST = [
  {
    id: 'srv-custom',
    title: 'Tailored Himachal & UK Packages',
    badge: '100% Customizable',
    summary: 'Honeymoon suites, family holidays, or college group trips planned day-by-day from Delhi, Chandigarh, or Dehradun.',
    tag: 'Flexible Itineraries',
  },
  {
    id: 'srv-stays',
    title: 'Handpicked Mountain Resorts & Homestays',
    badge: 'Verified Views',
    summary: 'Personally inspected cedar cottages, lakefront hotels, heated Spiti stays, and Swiss alpine glamping camps.',
    tag: 'Zero Surprise Quality',
  },
  {
    id: 'srv-transport',
    title: 'Mountain-Expert Cabs & AC Volvos',
    badge: 'Local Hill Drivers',
    summary: 'Seasoned Himachali & Garhwali drivers in Innova Crystas, Dzires, Tempo Travellers, and overnight Delhi Volvo coaches.',
    tag: 'Safe Hill Travel',
  },
  {
    id: 'srv-permits',
    title: 'Yatra, Permits & Adventure Passes',
    badge: 'Hassle-Free',
    summary: 'Char Dham e-passes, Rohtang/Spiti permits, Bir paragliding slots, and Rishikesh rafting reservations sorted upfront.',
    tag: 'On-Ground Support',
  },
];

export const TESTIMONIALS = [
  {
    name: 'Rohan & Ananya Kapoor',
    origin: 'New Delhi → Manali & Kasol',
    rating: 5,
    quote:
      'Being based in Manali, the HimYatra team arranged an incredible snow-view cottage and knew every hidden viewpoint around Atal Tunnel.',
  },
  {
    name: 'Vikramaditya Joshi',
    origin: 'Pune → Kedarnath, Auli & Rishikesh',
    rating: 5,
    quote:
      'Booked our parents’ Do Dham and Auli trip with them. From Haridwar pickup to heated rooms in Guptkashi, everything ran on clockwork.',
  },
  {
    name: 'Neha & Friends (Group of 8)',
    origin: 'Bengaluru → Spiti Valley Circuit',
    rating: 5,
    quote:
      'Our 7-day Spiti expedition via Shimla and Chandratal was unforgettable. Our driver and local coordinator checked on us every single evening.',
  },
];
