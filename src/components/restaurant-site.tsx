import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flame,
  Heart,
  Instagram,
  Facebook,
  MapPin,
  Menu as MenuIcon,
  MessageCircle,
  Minus,
  Navigation,
  Phone,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import { toast } from "sonner";
import heroImage from "@/assets/dilse-hero-bbq.jpg";
import grillImage from "@/assets/dilse-story-grill.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { categories, galleryImages, menuItems, restaurant, type MenuCategory, type MenuItem } from "@/lib/restaurant-data";

type Cart = Record<string, number>;
const navItems = ["Home", "About", "Menu", "Gallery", "Reviews", "Contact"];
const money = new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 });

function scrollTo(id: string) {
  document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
}

export function RestaurantSite() {
  const [category, setCategory] = useState<MenuCategory>("BBQ");
  const [cart, setCart] = useState<Cart>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const [checkout, setCheckout] = useState(false);
  const [details, setDetails] = useState({ name: "", phone: "", address: "", notes: "" });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const cartRows = useMemo(
    () => menuItems.filter((item) => cart[item.id]).map((item) => ({ ...item, quantity: cart[item.id] ?? 0 })),
    [cart],
  );
  const itemCount = cartRows.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartRows.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const addItem = (item: MenuItem) => {
    setCart((current) => ({ ...current, [item.id]: (current[item.id] ?? 0) + 1 }));
    toast.success(`${item.name} added to your order`);
  };
  const changeQuantity = (id: string, amount: number) => {
    setCart((current) => {
      const next = Math.max(0, (current[id] ?? 0) + amount);
      const updated = { ...current };
      if (next === 0) delete updated[id];
      else updated[id] = next;
      return updated;
    });
  };
  const openOrder = () => { setCartOpen(true); setCheckout(false); setMobileOpen(false); };
  const whatsappOrder = () => {
    const lines = cartRows.map((item) => `• ${item.name} x${item.quantity} — ${money.format(item.price * item.quantity)}`);
    const message = [
      "Assalam o Alaikum, I'd like to place an order from Dil Se BBQ.", "", ...lines,
      "", `Total: ${money.format(total)}`, "", `Name: ${details.name}`, `Phone: ${details.phone}`,
      `Delivery address: ${details.address}`, details.notes ? `Notes: ${details.notes}` : "",
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };
  const platterItem = menuItems.find((item) => item.id === "dil-se-platter");

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-cream/10 bg-charcoal/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <button onClick={() => scrollTo("home")} className="brand-lockup text-left" aria-label="Dil Se BBQ home">
            <span className="font-display text-2xl text-cream">Dil Se <span className="text-gold">BBQ</span></span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/55">{restaurant.tagline}</span>
          </button>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => <button key={item} onClick={() => scrollTo(item)} className="nav-link">{item}</button>)}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="gold" size="lg" onClick={openOrder} className="hidden sm:inline-flex">
              <ShoppingBag /> Order Now {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </Button>
            <Button variant="ghostCream" size="icon" onClick={() => setMobileOpen(true)} className="lg:hidden" aria-label="Open menu"><MenuIcon /></Button>
          </div>
        </div>
      </header>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent className="w-[88%] border-gold/20 bg-charcoal px-7 text-cream">
          <SheetTitle className="font-display text-3xl text-cream">Dil Se <span className="text-gold">BBQ</span></SheetTitle>
          <SheetDescription className="text-cream/60">{restaurant.tagline}</SheetDescription>
          <nav className="mt-10 flex flex-col" aria-label="Mobile navigation">
            {navItems.map((item) => <button key={item} onClick={() => { scrollTo(item); setMobileOpen(false); }} className="border-b border-cream/10 py-4 text-left text-lg text-cream">{item}</button>)}
          </nav>
          <Button variant="gold" size="xl" onClick={openOrder} className="mt-8 w-full"><ShoppingBag /> Order Now</Button>
        </SheetContent>
      </Sheet>

      <main>
        <section id="home" className="relative flex min-h-[760px] items-end overflow-hidden pt-20 md:min-h-[820px] md:items-center">
          <img src={heroImage} alt="A generous Dil Se BBQ platter with kebabs, tikka, naan and chutneys" width={1920} height={1200} className="absolute inset-0 h-full w-full object-cover object-[68%_center]" />
          <div className="hero-overlay absolute inset-0" />
          <div className="jali-pattern absolute inset-y-0 left-0 w-24 opacity-25" />
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 md:px-8 md:pb-0">
            <div className="max-w-2xl animate-hero-in">
              <div className="mb-5 flex items-center gap-3 text-gold"><span className="h-px w-10 bg-gold" /><span className="text-xs font-bold uppercase tracking-[0.24em]">From Lahore, with love</span></div>
              <h1 className="font-display text-5xl leading-[1.02] text-cream sm:text-6xl md:text-7xl lg:text-[5.3rem]">The Taste of Lahore,<br /><em className="font-normal text-gold">Served with Love.</em></h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-cream/78 md:text-lg">Authentic Pakistani BBQ &amp; Desi Flavours, grilled fresh and served straight from our kitchen.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button variant="gold" size="xl" onClick={() => scrollTo("menu")}>View Our Menu <ArrowRight /></Button>
                <Button variant="outlineCream" size="xl" onClick={openOrder}><ShoppingBag /> Order Now</Button>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/65">
                <span>Authentic taste</span><span className="text-gold">•</span><span>Freshly grilled</span><span className="text-gold">•</span><span>Made with love</span>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-8 hidden items-center gap-3 border-l border-gold/50 pl-4 text-xs uppercase tracking-[0.18em] text-cream/55 lg:flex"><Flame className="text-gold" /> Cooked over real charcoal</div>
        </section>

        <section id="about" className="section-pad bg-cream text-ink">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-20">
            <div className="reveal relative">
              <img src={grillImage} alt="Chef grilling Pakistani BBQ over charcoal" loading="lazy" width={1408} height={1104} className="aspect-[5/4] w-full object-cover" />
              <div className="absolute -bottom-5 right-5 bg-maroon px-6 py-5 text-cream shadow-2xl md:-right-5">
                <span className="font-display text-3xl text-gold">Dil Se</span><span className="block text-[10px] uppercase tracking-[0.2em]">From the heart</span>
              </div>
            </div>
            <div className="reveal">
              <SectionHeading eyebrow="Our story" title="A Taste of Lahore, Straight from the Heart" dark />
              <p className="mt-6 text-base leading-8 text-ink/70">Dil Se BBQ was born from a simple belief: the finest meals are made with patience, fire and generosity. We bring together the smoky flavours of Lahore’s famous food streets, time-honoured family recipes and the warmth of Pakistani hospitality.</p>
              <p className="mt-4 text-base leading-8 text-ink/70">Every skewer is marinated with our house spices, every karahi is cooked fresh, and every naan arrives hot from the tandoor. It is honest Lahori food, served the way it should be.</p>
              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                <StoryPoint icon={<Flame />} title="Freshly Grilled" text="Prepared to order." />
                <StoryPoint icon={<ChefHat />} title="Authentic Flavours" text="Traditional recipes." />
                <StoryPoint icon={<Heart />} title="Made with Love" text="Lahore at heart." />
              </div>
            </div>
          </div>
        </section>

        <section id="menu" className="section-pad bg-background">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <SectionHeading eyebrow="From our kitchen" title="Signature Menu" />
              <p className="max-w-md text-sm leading-7 text-muted-foreground">Marinated in-house, cooked fresh, and best enjoyed together. Prices are shown in Pakistani rupees.</p>
            </div>
            <div className="mt-10 flex gap-2 overflow-x-auto border-b border-border pb-3" role="tablist" aria-label="Menu categories">
              {categories.map((item) => <Button key={item} variant={category === item ? "gold" : "menuTab"} onClick={() => setCategory(item)} role="tab" aria-selected={category === item}>{item}</Button>)}
            </div>
            <div className="mt-8 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
              {menuItems.filter((item) => item.category === category).map((item) => <MenuCard key={item.id} item={item} onAdd={() => addItem(item)} />)}
            </div>
            <div className="mt-10 text-center"><Button variant="outlineGold" size="lg" onClick={openOrder}>View Full Menu <ArrowRight /></Button></div>
          </div>
        </section>

        <section className="relative min-h-[650px] overflow-hidden">
          <img src={heroImage} alt="The Dil Se signature mixed BBQ platter" loading="lazy" width={1920} height={1200} className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
          <div className="signature-overlay absolute inset-0" />
          <div className="relative mx-auto flex min-h-[650px] max-w-7xl items-center px-5 py-24 md:px-8">
            <div className="reveal max-w-xl text-cream">
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-gold">Made for the table</span>
              <h2 className="mt-4 font-display text-5xl leading-tight md:text-6xl">The Dil Se<br />BBQ Platter</h2>
              <p className="mt-5 max-w-lg leading-7 text-cream/75">A generous selection of freshly grilled BBQ favourites, perfect for sharing with family and friends.</p>
              <p className="mt-6 text-sm leading-7 text-cream/85">Seekh kabab · Chicken tikka · Malai boti · BBQ wings · Naan · Chutney · Raita</p>
              <Button variant="gold" size="xl" className="mt-8" onClick={() => { if (platterItem) addItem(platterItem); setCartOpen(true); }}>Order This Platter <ArrowRight /></Button>
            </div>
          </div>
        </section>

        <section className="section-pad bg-cream text-ink">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="reveal text-center"><SectionHeading eyebrow="The Dil Se difference" title="Why Lahore Chooses Us" dark centered /></div>
            <div className="mt-12 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
              <Feature icon={<Flame />} title="Freshly Grilled" text="Prepared fresh for every order." />
              <Feature icon={<UtensilsCrossed />} title="Authentic Pakistani Taste" text="Traditional flavours with quality ingredients." />
              <Feature icon={<Heart />} title="Made with Love" text="Every dish is prepared with care." />
              <Feature icon={<Truck />} title="Easy Ordering" text="Quick ordering for takeaway and delivery." />
            </div>
          </div>
        </section>

        <section id="gallery" className="section-pad bg-background">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="reveal"><SectionHeading eyebrow="A feast for the senses" title="From Our Table" /></div>
            <div className="mt-10 grid auto-rows-[210px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4">
              {galleryImages.map((image, index) => (
                <button key={`${image.label}-${index}`} onClick={() => setGalleryIndex(index)} className={`gallery-tile group relative overflow-hidden text-left ${index === 0 ? "col-span-2 row-span-2" : ""} ${index === 3 ? "col-span-2" : ""}`} aria-label={`Open image: ${image.label}`}>
                  <img src={image.src} alt={image.alt} loading="lazy" width={1408} height={1104} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="absolute inset-x-0 bottom-0 bg-charcoal/75 p-4 text-sm font-medium text-cream opacity-0 transition-opacity group-hover:opacity-100">{image.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <GalleryDialog index={galleryIndex} setIndex={setGalleryIndex} />

        <section id="reviews" className="section-pad border-y border-border bg-maroon-deep">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="reveal text-center"><SectionHeading eyebrow="Guest book" title="Shared Around the Table" centered /></div>
            <div className="mt-12 grid gap-px bg-cream/10 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["Ayesha K.", "Absolutely loved the BBQ. The flavours were authentic and everything was served fresh."],
                ["Hamza R.", "Perfect place for a family dinner. Great food and a beautiful atmosphere."],
                ["Sara M.", "The smoky BBQ flavour was the best part. We are definitely coming back."],
                ["Bilal A.", "Loved the Lahori taste, warm service and generous portions."],
              ].map(([name, quote]) => <blockquote key={name} className="bg-maroon-deep p-7 md:p-9"><div className="flex gap-1 text-gold" aria-label="5 out of 5 stars">{[1,2,3,4,5].map((s) => <Star key={s} className="size-4 fill-current" />)}</div><p className="mt-6 font-display text-xl leading-8 text-cream">“{quote}”</p><footer className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-cream/50">{name}</footer></blockquote>)}
            </div>
          </div>
        </section>

        <section id="contact" className="section-pad bg-cream text-ink">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
            <div className="reveal">
              <SectionHeading eyebrow="Come dine with us" title="Visit Dil Se BBQ" dark />
              <div className="mt-8 space-y-6">
                <ContactLine icon={<MapPin />} label="Location" value={restaurant.address} />
                <ContactLine icon={<Phone />} label="Phone" value={restaurant.phone} />
                <ContactLine icon={<Clock3 />} label="Opening hours" value={`Monday – Sunday\n${restaurant.hours}`} />
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button variant="maroon" asChild><a href={restaurant.phoneHref}><Phone /> Call Us</a></Button>
                <Button variant="whatsapp" asChild><a href={`https://wa.me/${restaurant.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle /> WhatsApp</a></Button>
                <Button variant="outlineInk" asChild><a href="https://maps.google.com/?q=Lahore+Pakistan" target="_blank" rel="noreferrer"><Navigation /> Directions</a></Button>
              </div>
            </div>
            <div className="reveal relative min-h-[420px] overflow-hidden border border-ink/10 bg-charcoal">
              <iframe title="Dil Se BBQ Location" src={restaurant.mapsEmbed} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              <a href={restaurant.mapsUrl} target="_blank" rel="noreferrer" className="absolute bottom-4 right-4 z-10 bg-gold px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-charcoal shadow-lg transition hover:opacity-90">Get Directions</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-cream/10 bg-charcoal py-14 text-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-2 md:px-8 lg:grid-cols-4">
          <div><div className="font-display text-3xl">Dil Se <span className="text-gold">BBQ</span></div><p className="mt-1 text-xs uppercase tracking-[0.22em] text-cream/50">{restaurant.tagline}</p><p className="mt-5 max-w-xs text-sm leading-6 text-cream/55">Authentic Pakistani BBQ, timeless Lahori flavours and generous hospitality — served from the heart.</p></div>
          <FooterGroup title="Quick Links">{["Home","About","Menu","Gallery","Contact"].map((item) => <button key={item} onClick={() => scrollTo(item)} className="text-left text-sm text-cream/60 transition hover:text-gold">{item}</button>)}</FooterGroup>
          <FooterGroup title="Visit"><span>{restaurant.address}</span><span>{restaurant.phone}</span><span>Monday – Sunday</span><span>{restaurant.hours}</span></FooterGroup>
          <FooterGroup title="Follow Dil Se"><div className="flex gap-2"><SocialIcon label="Instagram" href={restaurant.instagram}><Instagram /></SocialIcon><SocialIcon label="Facebook"><Facebook /></SocialIcon><SocialIcon label="WhatsApp" href={`https://wa.me/${restaurant.whatsapp}`}><MessageCircle /></SocialIcon></div></FooterGroup>
        </div>
        <div className="mx-auto mt-12 max-w-7xl border-t border-cream/10 px-5 pt-6 text-xs text-cream/35 md:px-8">© 2026 Dil Se BBQ. All rights reserved.</div>
      </footer>

      <Button variant="whatsapp" size="floating" asChild className="fixed bottom-5 right-5 z-30 shadow-2xl"><a href={`https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent("Assalam o Alaikum, I’d like to place an order from Dil Se BBQ.")}`} target="_blank" rel="noreferrer" aria-label="Order on WhatsApp"><MessageCircle className="size-6" /></a></Button>

      <OrderSheet open={cartOpen} setOpen={setCartOpen} rows={cartRows} total={total} count={itemCount} changeQuantity={changeQuantity} checkout={checkout} setCheckout={setCheckout} details={details} setDetails={setDetails} placeOrder={whatsappOrder} addItem={addItem} />
    </div>
  );
}

function SectionHeading({ eyebrow, title, dark = false, centered = false }: { eyebrow: string; title: string; dark?: boolean; centered?: boolean }) {
  return <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}><p className={`text-xs font-bold uppercase tracking-[0.24em] ${dark ? "text-maroon" : "text-gold"}`}>{eyebrow}</p><h2 className={`mt-3 font-display text-4xl leading-tight md:text-5xl ${dark ? "text-ink" : "text-cream"}`}>{title}</h2></div>;
}

function StoryPoint({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <div className="border-t border-gold-dark pt-4"><div className="text-maroon [&_svg]:size-5">{icon}</div><h3 className="mt-3 text-sm font-bold">{title}</h3><p className="mt-1 text-xs text-ink/55">{text}</p></div>; }
function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) { return <article className="reveal bg-cream p-7 md:p-9"><div className="mb-6 flex size-11 items-center justify-center border border-gold-dark text-maroon [&_svg]:size-5">{icon}</div><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-ink/60">{text}</p></article>; }

function MenuCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  return <article className="group grid min-h-[190px] grid-cols-[38%_62%] bg-card transition duration-300 hover:bg-secondary"><div className="overflow-hidden"><img src={item.image} alt={item.name} loading="lazy" width={500} height={500} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><div className="flex min-w-0 flex-col p-5"><div className="flex items-start justify-between gap-3"><h3 className="font-display text-xl text-cream">{item.name}</h3><span className="shrink-0 text-xs font-bold text-gold">{money.format(item.price)}</span></div><p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">{item.description}</p><Button variant="menuAdd" size="sm" onClick={onAdd} className="mt-auto self-start"><Plus /> Add to Order</Button></div></article>;
}

function GalleryDialog({ index, setIndex }: { index: number | null; setIndex: (value: number | null) => void }) {
  const image = index === null ? null : galleryImages[index];
  if (index === null || !image) return null;
  return <Dialog open onOpenChange={(open) => !open && setIndex(null)}><DialogContent className="max-w-5xl border-gold/20 bg-charcoal p-2 text-cream"><DialogTitle className="sr-only">Food gallery</DialogTitle><DialogDescription className="sr-only">A closer view from the Dil Se BBQ gallery.</DialogDescription><img src={image.src} alt={image.alt} width={1408} height={1104} className="max-h-[78vh] w-full object-contain" /><div className="flex items-center justify-between px-3 pb-2"><Button variant="ghostCream" size="icon" onClick={() => setIndex((index - 1 + galleryImages.length) % galleryImages.length)} aria-label="Previous image"><ChevronLeft /></Button><span className="text-sm text-cream/70">{image.label}</span><Button variant="ghostCream" size="icon" onClick={() => setIndex((index + 1) % galleryImages.length)} aria-label="Next image"><ChevronRight /></Button></div></DialogContent></Dialog>;
}

type CartRow = MenuItem & { quantity: number };
function OrderSheet({ open, setOpen, rows, total, count, changeQuantity, checkout, setCheckout, details, setDetails, placeOrder, addItem }: { open: boolean; setOpen: (v: boolean) => void; rows: CartRow[]; total: number; count: number; changeQuantity: (id: string, amount: number) => void; checkout: boolean; setCheckout: (v: boolean) => void; details: { name: string; phone: string; address: string; notes: string }; setDetails: React.Dispatch<React.SetStateAction<{ name: string; phone: string; address: string; notes: string }>>; placeOrder: () => void; addItem: (item: MenuItem) => void }) {
  const [browseCategory, setBrowseCategory] = useState<MenuCategory>("BBQ");
  return <Sheet open={open} onOpenChange={setOpen}><SheetContent className="flex w-full flex-col border-gold/20 bg-background p-0 text-foreground sm:max-w-xl">
    <div className="border-b border-border p-6"><SheetTitle className="font-display text-3xl">{checkout ? "Your Details" : "Your Order"}</SheetTitle><SheetDescription>{count ? `${count} item${count === 1 ? "" : "s"} ready to order` : "Choose your Lahori favourites"}</SheetDescription></div>
    <div className="flex-1 overflow-y-auto p-6">
      {checkout ? <div className="space-y-4"><FormField label="Name"><Input value={details.name} onChange={(e) => setDetails((v) => ({ ...v, name: e.target.value }))} placeholder="Your name" /></FormField><FormField label="Phone"><Input type="tel" value={details.phone} onChange={(e) => setDetails((v) => ({ ...v, phone: e.target.value }))} placeholder="03XX XXXXXXX" /></FormField><FormField label="Delivery address"><Textarea value={details.address} onChange={(e) => setDetails((v) => ({ ...v, address: e.target.value }))} placeholder="House, street and area" className="min-h-24" /></FormField><FormField label="Order notes"><Textarea value={details.notes} onChange={(e) => setDetails((v) => ({ ...v, notes: e.target.value }))} placeholder="Spice preference or special instructions" /></FormField></div> : <>
        {rows.length > 0 && <div className="space-y-3">{rows.map((item) => <div key={item.id} className="flex items-center gap-3 border-b border-border pb-3"><img src={item.image} alt="" width={72} height={72} className="size-16 object-cover" /><div className="min-w-0 flex-1"><h4 className="truncate font-semibold">{item.name}</h4><span className="text-xs text-gold">{money.format(item.price * item.quantity)}</span></div><QuantityControl quantity={item.quantity} decrease={() => changeQuantity(item.id, -1)} increase={() => changeQuantity(item.id, 1)} /></div>)}</div>}
        <div className={rows.length ? "mt-8" : ""}><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold">Browse menu</p><div className="flex gap-2 overflow-x-auto pb-3">{categories.map((cat) => <Button key={cat} variant={browseCategory === cat ? "gold" : "menuTab"} size="sm" onClick={() => setBrowseCategory(cat)}>{cat}</Button>)}</div><div className="mt-3 space-y-2">{menuItems.filter((item) => item.category === browseCategory).map((item) => <div key={item.id} className="flex items-center gap-3 bg-card p-3"><img src={item.image} alt="" width={56} height={56} className="size-14 object-cover" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{item.name}</p><span className="text-xs text-gold">{money.format(item.price)}</span></div><Button variant="ghostCream" size="icon" onClick={() => addItem(item)} aria-label={`Add ${item.name}`}><Plus /></Button></div>)}</div></div>
      </>}
    </div>
    <div className="border-t border-border bg-card p-6"><div className="mb-5 flex items-center justify-between"><span className="text-sm text-muted-foreground">Total</span><strong className="font-display text-2xl text-gold">{money.format(total)}</strong></div>{checkout ? <div className="flex gap-3"><Button variant="outlineGold" onClick={() => setCheckout(false)}>Back</Button><Button variant="whatsapp" className="flex-1" disabled={!details.name || !details.phone || !details.address || !rows.length} onClick={placeOrder}><MessageCircle /> Place Order on WhatsApp</Button></div> : <Button variant="gold" size="xl" className="w-full" disabled={!rows.length} onClick={() => setCheckout(true)}>Proceed to Checkout <ArrowRight /></Button>}</div>
  </SheetContent></Sheet>;
}

function QuantityControl({ quantity, decrease, increase }: { quantity: number; decrease: () => void; increase: () => void }) { return <div className="flex items-center border border-border"><Button variant="quantity" size="iconSm" onClick={decrease} aria-label="Decrease quantity"><Minus /></Button><span className="w-7 text-center text-sm">{quantity}</span><Button variant="quantity" size="iconSm" onClick={increase} aria-label="Increase quantity"><Plus /></Button></div>; }
function FormField({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</span>{children}</label>; }
function ContactLine({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="flex gap-4"><div className="mt-1 text-maroon [&_svg]:size-5">{icon}</div><div><span className="text-xs font-bold uppercase tracking-[0.15em] text-ink/45">{label}</span><p className="mt-1 whitespace-pre-line font-medium leading-6">{value}</p></div></div>; }
function FooterGroup({ title, children }: { title: string; children: React.ReactNode }) { return <div className="flex flex-col gap-3 text-sm text-cream/55"><h3 className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">{title}</h3>{children}</div>; }
function SocialIcon({ label, href, children }: { label: string; href?: string; children: React.ReactNode }) { return <Button variant="social" size="icon" aria-label={label} asChild={!!href}>{href ? <a href={href} target="_blank" rel="noreferrer">{children}</a> : children}</Button>; }