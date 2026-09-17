import heroImage from "@/assets/dilse-hero-bbq.jpg";
import grillImage from "@/assets/dilse-story-grill.jpg";
import spreadImage from "@/assets/dilse-karahi-spread.jpg";
import ambienceImage from "@/assets/dilse-ambience.jpg";

export const restaurant = {
  name: "Dil Se BBQ",
  tagline: "Taste of Lahore",
  phone: "0327 4792847",
  phoneHref: "tel:+923274792847",
  whatsapp: "923274792847",
  address: "Noor Jahan Road, Liberty, G85R+RW7, Commercial Area Gulberg III, Lahore, Punjab 54000",
  hours: "12:00 PM – 2:00 AM",
  instagram: "https://www.instagram.com/dil.se.bbq/",
  mapsUrl: "https://maps.app.goo.gl/wWToEwvSDma9UQkk8?g_st=com.google.maps",
  mapsEmbed: "https://www.google.com/maps?q=G85R%2BRW7+Commercial+Area+Gulberg+III+Lahore&output=embed",
};

export type MenuCategory = "BBQ" | "Karahi" | "Desi Favorites" | "Sides";

export type MenuItem = {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
  image: string;
};

export const menuItems: MenuItem[] = [
  { id: "dil-se-platter", name: "The Dil Se BBQ Platter", category: "BBQ", description: "Seekh kabab, tikka, malai boti, wings, naan, chutney and raita.", price: 4995, image: heroImage },
  { id: "chicken-tikka", name: "Chicken Tikka", category: "BBQ", description: "Charcoal-grilled chicken, Lahori spices and fresh lemon.", price: 695, image: heroImage },
  { id: "malai-boti", name: "Chicken Malai Boti", category: "BBQ", description: "Tender chicken in a creamy, delicately spiced marinade.", price: 745, image: heroImage },
  { id: "beef-seekh", name: "Beef Seekh Kabab", category: "BBQ", description: "Hand-pressed beef kebabs with roasted cumin and herbs.", price: 795, image: grillImage },
  { id: "chicken-seekh", name: "Chicken Seekh Kabab", category: "BBQ", description: "Juicy minced chicken skewers, grilled over glowing coals.", price: 695, image: grillImage },
  { id: "reshmi-kabab", name: "Reshmi Kabab", category: "BBQ", description: "Silky chicken kebabs with cream, cashew and green chilli.", price: 795, image: heroImage },
  { id: "chicken-karahi", name: "Chicken Karahi", category: "Karahi", description: "Fresh tomato masala, ginger, green chilli and coriander.", price: 1595, image: spreadImage },
  { id: "mutton-karahi", name: "Mutton Karahi", category: "Karahi", description: "Slow-cooked mutton in our robust house karahi masala.", price: 2895, image: spreadImage },
  { id: "beef-karahi", name: "Beef Karahi", category: "Karahi", description: "Tender beef tossed with tomatoes and cracked spices.", price: 2195, image: spreadImage },
  { id: "chicken-handi", name: "Chicken Handi", category: "Desi Favorites", description: "Creamy clay-pot curry finished with butter and fenugreek.", price: 1695, image: spreadImage },
  { id: "mutton-handi", name: "Mutton Handi", category: "Desi Favorites", description: "Rich, slow-cooked mutton with a velvety masala gravy.", price: 2795, image: spreadImage },
  { id: "daal", name: "Daal Tarka", category: "Desi Favorites", description: "Comforting lentils tempered with garlic, cumin and chilli.", price: 545, image: spreadImage },
  { id: "biryani", name: "Lahori Chicken Biryani", category: "Desi Favorites", description: "Fragrant basmati rice layered with spiced chicken.", price: 595, image: spreadImage },
  { id: "garlic-naan", name: "Garlic Naan", category: "Sides", description: "Tandoor-baked naan brushed with garlic butter.", price: 195, image: heroImage },
  { id: "roghni-naan", name: "Roghni Naan", category: "Sides", description: "Soft sesame naan, golden from the tandoor.", price: 225, image: heroImage },
  { id: "cheese-naan", name: "Cheese Naan", category: "Sides", description: "Warm naan filled with a generous layer of cheese.", price: 395, image: heroImage },
  { id: "salad", name: "Fresh Salad", category: "Sides", description: "Cucumber, tomato, onion, lemon and fresh herbs.", price: 245, image: spreadImage },
  { id: "raita", name: "Mint Raita", category: "Sides", description: "Cooling whipped yoghurt with mint and roasted cumin.", price: 195, image: heroImage },
];

export const categories: MenuCategory[] = ["BBQ", "Karahi", "Desi Favorites", "Sides"];

export const galleryImages = [
  { src: heroImage, alt: "Dil Se BBQ mixed grill platter with naan and chutneys", label: "The Dil Se Platter" },
  { src: grillImage, alt: "Chicken tikka and seekh kebabs cooking over charcoal", label: "Fresh from the coals" },
  { src: spreadImage, alt: "Pakistani karahi and BBQ spread", label: "A Lahori feast" },
  { src: ambienceImage, alt: "Elegant Dil Se BBQ restaurant dining room", label: "An evening at Dil Se" },
  { src: heroImage, alt: "Close-up of seekh kebabs and malai boti", label: "Grilled with care" },
  { src: spreadImage, alt: "Fresh naan served with rich karahi", label: "Made for sharing" },
];