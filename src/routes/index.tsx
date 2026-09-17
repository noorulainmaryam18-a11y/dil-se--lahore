import { createFileRoute } from "@tanstack/react-router";
import { RestaurantSite } from "@/components/restaurant-site";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dil Se BBQ | Authentic Pakistani BBQ in Lahore" },
      { name: "description", content: "Experience authentic Pakistani BBQ, karahi and desi favourites at Dil Se BBQ — the Taste of Lahore." },
      { property: "og:title", content: "Dil Se BBQ — Taste of Lahore" },
      { property: "og:description", content: "Freshly grilled Pakistani BBQ and traditional Lahori flavours, served with love." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <RestaurantSite />;
}
