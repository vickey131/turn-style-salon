export interface ServiceItem {
  title: string;
  description: string;
  price: string;
}

export type ServiceCategory = "hair" | "skin" | "nails" | "makeup" | "men";

export const SERVICE_CATEGORIES: { id: ServiceCategory; label: string }[] = [
  { id: "hair", label: "Hair" },
  { id: "skin", label: "Skin" },
  { id: "nails", label: "Nails" },
  { id: "makeup", label: "Makeup" },
  { id: "men", label: "Men" },
];

export const SERVICES_DATA: Record<ServiceCategory, ServiceItem[]> = {
  hair: [
    {
      title: "Haircut & Styling",
      description: "Personalised cut, wash and finish.",
      price: "From ₹699",
    },
    {
      title: "Global Hair Colour",
      description: "Premium colour and professional finish.",
      price: "From ₹2,999",
    },
    {
      title: "Balayage Highlights",
      description: "Dimensional hand-painted colour.",
      price: "From ₹4,999",
    },
  ],
  skin: [
    {
      title: "Korean Glass Skin Facial",
      description: "Deep hydration and dewy radiance.",
      price: "From ₹2,999",
    },
    {
      title: "Hydrafacial",
      description: "Deep cleanse, hydration and glow.",
      price: "From ₹2,999",
    },
    {
      title: "Face Cleanup",
      description: "A quick refresh for clearer skin.",
      price: "Ask salon",
    },
  ],
  nails: [
    {
      title: "Cut, Shape & Polish",
      description: "Neat, polished everyday nails.",
      price: "From ₹799",
    },
    {
      title: "Gel Polish",
      description: "Long-lasting colour and shine.",
      price: "Ask salon",
    },
    {
      title: "Nail Art & Extensions",
      description: "Designed for your style.",
      price: "Ask salon",
    },
  ],
  makeup: [
    {
      title: "Party Makeup",
      description: "Polished special-occasion makeup.",
      price: "Ask salon",
    },
    {
      title: "HD Makeup",
      description: "Camera-ready seamless finish.",
      price: "Ask salon",
    },
    {
      title: "Hair & Makeup",
      description: "Complete event-ready look.",
      price: "Ask salon",
    },
  ],
  men: [
    {
      title: "Complete Grooming",
      description: "Everything you need in one package.",
      price: "From ₹1,999",
    },
    {
      title: "All-in-One Package",
      description: "Head-to-toe grooming.",
      price: "From ₹2,999",
    },
    {
      title: "Haircut & Beard",
      description: "Sharp cut and beard styling.",
      price: "Ask salon",
    },
  ],
};

export const OFFERS_DATA = [
  {
    title: "Women’s Beauty Package",
    price: "From ₹1,999",
    image: "/images/img_2.webp",
    alt: "Women's beauty package",
  },
  {
    title: "Balayage Highlights",
    price: "From ₹4,999",
    image: "/images/img_6.webp",
    alt: "Balayage highlights",
  },
  {
    title: "Complete Men’s Grooming",
    price: "From ₹1,999",
    image: "/images/img_7.webp",
    alt: "Men's grooming package",
  },
];

export const REVIEWS_DATA = [
  {
    rating: 5,
    text: "“The stylist understood exactly what I wanted and my colour turned out rich, polished and natural.”",
    author: "Ananya R. · Koramangala",
  },
  {
    rating: 5,
    text: "“Clean, premium and professional. Every service was done patiently without rushing.”",
    author: "Rahul M. · Bengaluru",
  },
  {
    rating: 5,
    text: "“Loved the welcoming team and the final result. My facial left my skin visibly brighter.”",
    author: "Megha S. · Koramangala",
  },
];

export const TRUST_STATS = [
  { highlight: "4.8 ★", label: "Loved by Bengaluru" },
  { highlight: "Unisex", label: "Women & men" },
  { highlight: "Premium", label: "Products & care" },
  { highlight: "7 Days", label: "Open every week" },
];

export const SALON_INFO = {
  name: "Turn Style Unisex Salon",
  branch: "Koramangala, Bengaluru",
  phone: "89716 76928",
  phoneDisplay: "+91 89716 76928",
  phoneTel: "+918971676928",
  whatsappUrl:
    "https://wa.me/918971676928?text=Hi%20Turn%20Style%20Koramangala%2C%20I%20want%20to%20book%20an%20appointment",
  mapsUrl:
    "https://www.google.com/maps/search/Turn+Style+Salon+Koramangala+Bengaluru",
  servicesList: [
    "Haircut & Styling",
    "Hair Colour / Balayage",
    "Hair Botox / Keratin",
    "Facial / Skin",
    "Nails",
    "Makeup",
    "Men’s Grooming",
  ],
};
