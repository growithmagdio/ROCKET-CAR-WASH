export const services = [
  { name: "Car Wash", line: "Snow foam pre-wash, contact wash, rinse and a streak-free hand dry.", icon: "wash" },
  { name: "Rubbing & Waxing", line: "Machine rubbing lifts dull paint and light swirls, then a wax coat seals the shine.", icon: "wax" },
  { name: "Coating", line: "A protective coat that holds the gloss and makes every next wash quicker.", icon: "coat" },
  { name: "Internal Cleaning", line: "Vacuum, dashboard, seats, mats and door panels cleaned inside out.", icon: "interior" },
  { name: "Tyre Care", line: "Tyres, rims and wheel arches cleaned and dressed to a deep black.", icon: "tyre" },
  { name: "Paint Protection", line: "Protection for your paint against sun, stains and daily road wear.", icon: "shield" },
] as const;

export const treatments = [
  { name: "Glass treatment", img: "/assets/rocket/t-glass.webp", line: "Clear, water-beading glass for safer monsoon drives." },
  { name: "Engine bay", img: "/assets/rocket/t-engine.webp", line: "Degreased and dressed, without soaking the electricals." },
  { name: "Leather care", img: "/assets/rocket/t-leather.webp", line: "Cleaned and conditioned so seats stay soft, not cracked." },
  { name: "Anti-rust", img: "/assets/rocket/t-antirust.webp", line: "Underbody protection against salt, water and mud." },
  { name: "Alloy treatment", img: "/assets/rocket/t-alloy.webp", line: "Brake dust lifted and wheels sealed to stay brighter." },
] as const;

export const launchSequence = [
  { t: "T-4", name: "Check-in", line: "We walk around the car with you and agree what it needs." },
  { t: "T-3", name: "Snow foam", line: "Thick foam softens dust and grime before anything touches the paint." },
  { t: "T-2", name: "Wash", line: "The gantry and our crew work panel by panel, wheels included." },
  { t: "T-1", name: "Rinse & dry", line: "Clean rinse, then a hand dry so no water spots are left behind." },
  { t: "T-0", name: "Lift-off", line: "Final check under the bay lights, keys back in your hand." },
] as const;

export type Branch = {
  name: string;
  area: string;
  address: string;
  phone?: string;
};

export const branches: Branch[] = [
  { name: "Villankurichi", area: "Coimbatore", address: "67/1a, Kalapatti Main Road, Rathinagiri Nagar, Villankurichi, Coimbatore, Tamil Nadu 641035", phone: "+91 79474 17502" },
  { name: "Koundampalayam", area: "Coimbatore", address: "204/3, TVS Nagar - Koundampalayam Road, Kannamal Nagar Rd, Ashok Nagar West, Koundampalayam, Coimbatore, Tamil Nadu 641030" },
  { name: "Namakkal", area: "Namakkal", address: "Pon Nagar, Salem - Namakkal Rd, opposite Indian Bank, Swamy Nagar, Namakkal, Tamil Nadu 637001", phone: "+91 73588 47473" },
  { name: "Mogappair", area: "Chennai", address: "141, Paneer Nagar Main Rd, VGP Nagar, Mogappair West, Chennai, Tamil Nadu 600037", phone: "+91 90878 11110" },
  { name: "Palamaner", area: "Andhra Pradesh", address: "Madanapalle Rd, Gangavaram, Palamaner, Reddivaripalle, Andhra Pradesh 517408" },
];

export const reviews = [
  { quote: "Super friendly staff and fantastic attention to detail. My car hasn't looked this good in years!", name: "Mathan", role: "Developer" },
  { quote: "A truly hassle-free service. Quick, professional, and worth every penny. Great job!", name: "Sowndhar", role: "Photographer" },
] as const;

export const franchisePerks = [
  { name: "Exclusive territory", line: "Your area is yours, with no Rocket branch competing next door." },
  { name: "Wash technology", line: "Fast, water-conscious equipment and the full bay fit-out." },
  { name: "Chemicals & supplies", line: "Raw material and chemical supply handled from day one." },
  { name: "Marketing support", line: "Launch and local campaigns run with the Rocket brand." },
  { name: "Trained crew", line: "Manpower and hands-on training before you open." },
  { name: "Owner community", line: "Share numbers, lessons and ideas with other Rocket owners." },
] as const;

export function mapsLink(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Rocket Car Wash ${address}`)}`;
}
