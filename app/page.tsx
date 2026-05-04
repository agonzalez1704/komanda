import {
  TacoBlob,
  CoinBlob,
  ReceiptBlob,
  StarBlob,
  HeartBlob,
  ChiliBlob,
  PesoBlob,
  WaiterBlob,
  SaltShakerBlob,
} from "./_components/illustrations";
import { PhoneFrame } from "./_components/phone";
import { Logo } from "./_components/logo";

export default function Home() {
  return (
    <div className="bg-[#fbfaf9] text-[#474645] min-h-screen w-full overflow-x-hidden">
      <Nav />
      <Hero />
      <LogoStrip />
      <Features />
      <ShowcaseSection />
      <HowItWorks />
      <ComparisonSection />
      <Testimonials />
      <Pricing />
      <FinalCta />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 bg-[#fbfaf9]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 text-[#343433]">
          <Logo className="h-7 w-7" />
          <span className="font-display text-[22px] tracking-[-0.6px] leading-none">
            komanda
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-[14px] font-medium text-[#343433]">
          <a className="hover:text-[#121212] transition-colors" href="#features">Features</a>
          <a className="hover:text-[#121212] transition-colors" href="#how">How it works</a>
          <a className="hover:text-[#121212] transition-colors" href="#pricing">Pricing</a>
          <a className="hover:text-[#121212] transition-colors" href="#stories">Stories</a>
        </nav>
        <div className="flex items-center gap-2">
          <a className="pill-light hidden sm:inline-flex" href="#">Log in</a>
          <a className="pill-dark" href="#get-started">
            Get started
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 6h6m0 0L6.5 3.5M9 6L6.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative px-6 pt-12 pb-24 md:pt-20 md:pb-32">
      <div className="relative mx-auto max-w-[1100px]">
        {/* Floating illustrations */}
        <div className="pointer-events-none absolute inset-0 select-none">
          <div className="absolute -left-2 top-6 float-slow"><TacoBlob className="h-[110px] w-[110px]" /></div>
          <div className="absolute left-[8%] bottom-6 float-medium"><PesoBlob className="h-[88px] w-[88px]" /></div>
          <div className="absolute -right-2 top-12 float-fast"><WaiterBlob className="h-[120px] w-[120px]" /></div>
          <div className="absolute right-[10%] bottom-2 float-slow"><ReceiptBlob className="h-[100px] w-[100px]" /></div>
          <div className="absolute right-[26%] -top-4 float-medium"><StarBlob className="h-[54px] w-[54px]" /></div>
          <div className="absolute left-[28%] -top-2 float-fast"><CoinBlob className="h-[60px] w-[60px]" /></div>
          <div className="absolute left-[44%] -bottom-2 float-medium"><HeartBlob className="h-[44px] w-[44px]" /></div>
          <div className="hidden md:block absolute left-[54%] top-2 float-slow"><ChiliBlob className="h-[64px] w-[64px]" /></div>
          <div className="hidden md:block absolute right-[6%] top-[60%] float-fast"><SaltShakerBlob className="h-[70px] w-[70px]" /></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12px] font-medium tracking-[-0.14px] text-[#474645] shadow-[var(--shadow-subtle)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00ca48]" />
            Now serving · iOS & Android
          </span>
          <h1 className="font-display text-[44px] leading-[1.05] tracking-[-1.4px] text-[#343433] md:text-[68px] md:tracking-[-2.11px] md:leading-[1.09] max-w-[820px]">
            Your taqueria&apos;s new
            <br className="hidden md:block" /> favorite{" "}
            <span className="relative inline-block">
              waiter
              <svg
                aria-hidden
                className="absolute -bottom-3 left-0 w-full"
                viewBox="0 0 280 18"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 12 C 70 4, 140 4, 277 11"
                  stroke="#ff3e00"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
            .
          </h1>
          <p className="mt-7 max-w-[520px] text-[17px] leading-[1.53] tracking-[-0.22px] text-[#474645]">
            Komanda turns any phone into a tableside POS. Take orders in seconds,
            work offline when the WiFi dies, charge in one tap, and send the
            receipt by WhatsApp before your customer reaches the door.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <a className="pill-dark px-6 py-4" href="#get-started">
              Start free for 30 days
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path d="M3 6h6m0 0L6.5 3.5M9 6L6.5 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a className="link-ember px-2 py-3" href="#demo">
              <PlayIcon /> Watch the 60-sec demo
            </a>
          </div>
          <p className="mt-6 text-[12px] tracking-[-0.14px] text-[#848281]">
            No card required · Set up in under 4 minutes · Cancel anytime
          </p>
        </div>

        {/* Hero phone mockup row */}
        <div className="relative z-10 mt-20 grid gap-8 md:grid-cols-3 md:gap-6">
          <div className="md:translate-y-6">
            <PhoneFrame variant="komanda-list" />
          </div>
          <div className="md:-translate-y-2">
            <PhoneFrame variant="komanda-detail" />
          </div>
          <div className="md:translate-y-10">
            <PhoneFrame variant="charge" />
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoStrip() {
  const names = [
    "Taquería La Esquina",
    "El Compa",
    "Mariscos Don Beto",
    "La Doña",
    "Carnitas Uruapan",
    "Tacos El Güero",
  ];
  return (
    <section className="border-y border-[#f2f0ed] bg-[#fbfaf9] py-10">
      <div className="mx-auto max-w-[1100px] px-6">
        <p className="text-center text-[12px] font-medium uppercase tracking-[1.4px] text-[#848281]">
          Cooking for taquerías across México · CDMX, GDL, MTY
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[#474645]">
          {names.map((n) => (
            <span
              key={n}
              className="font-display text-[20px] leading-none tracking-[-0.6px] opacity-70 hover:opacity-100 transition-opacity"
            >
              {n}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-[1100px]">
        <div className="max-w-[640px]">
          <p className="text-[13px] font-medium uppercase tracking-[1.4px] text-[#ff3e00]">
            What&apos;s on the menu
          </p>
          <h2 className="mt-4 text-[36px] md:text-[44px] font-semibold tracking-[-1.14px] leading-[1.09] text-[#121212]">
            Built for the rhythm of a real taquería —
            <span className="text-[#ff3e00]"> loud, fast, and on its feet</span>.
          </h2>
          <p className="mt-5 text-[17px] leading-[1.53] tracking-[-0.22px] text-[#474645] max-w-[560px]">
            Three things matter at the table: get the order right, charge fast,
            never lose the ticket. Komanda is engineered around that — and
            nothing else.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={<OrdersIcon />}
            title="Orders in seconds"
            body="Tap a menu item, swipe to add a modifier, send it to the kitchen. Six taps from sit-down to fired."
            accent="#0090ff"
          />
          <FeatureCard
            icon={<OfflineIcon />}
            title="Works without signal"
            body="Server in the back? WiFi fighting the microwave? Komanda queues every order locally and syncs the moment a bar appears."
            accent="#00ca48"
          />
          <FeatureCard
            icon={<ChargeIcon />}
            title="Close & charge in one tap"
            body="Cash, transfer, or card — collect, mark paid, and ship a PDF receipt to WhatsApp in the same gesture."
            accent="#ffbb26"
          />
          <FeatureCard
            icon={<MenuIcon />}
            title="Menu you can edit at noon"
            body="Out of carnitas? Mark it 86'd from the dashboard and every waiter sees it on the next tap. No app rebuild, no restart."
            accent="#ff3e00"
          />
          <FeatureCard
            icon={<ShieldIcon />}
            title="Audit-ready by default"
            body="Every void, every comp, every closed day — timestamped and signed by the user who did it. Your accountant will thank you."
            accent="#9f4fff"
          />
          <FeatureCard
            icon={<TeamIcon />}
            title="Add a waiter in 12 seconds"
            body="Send an invite link, they install Komanda, they're on the floor. No manager required, no SIM card to provision."
            accent="#ff58ae"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  body,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  accent: string;
}) {
  return (
    <div className="card-stone card-stone-hover p-8">
      <div
        className="mb-5 grid h-11 w-11 place-items-center rounded-[14px]"
        style={{ background: `${accent}1A`, color: accent }}
      >
        {icon}
      </div>
      <h3 className="text-[19px] font-semibold tracking-[-0.25px] leading-[1.38] text-[#343433]">
        {title}
      </h3>
      <p className="mt-2 text-[15px] leading-[1.47] tracking-[-0.2px] text-[#474645]">
        {body}
      </p>
    </div>
  );
}

function ShowcaseSection() {
  return (
    <section className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-[1100px]">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[1.4px] text-[#0090ff]">
              The order, in the pocket
            </p>
            <h2 className="mt-4 text-[36px] md:text-[44px] font-semibold tracking-[-1.14px] leading-[1.09] text-[#121212]">
              Every komanda has a number, a table, and a story.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.53] tracking-[-0.22px] text-[#474645] max-w-[480px]">
              Items, modifiers, voids, comps — Komanda keeps the full thread of
              every ticket so a manager can pick up exactly where the waiter
              left off.
            </p>
            <ul className="mt-8 space-y-4">
              <CheckItem>Auto-numbered tickets, per-day, per-location</CheckItem>
              <CheckItem>Per-table running totals with tip estimation</CheckItem>
              <CheckItem>Voids and comps require a reason — always</CheckItem>
              <CheckItem>Close the day with one button, signed PDF in your inbox</CheckItem>
            </ul>
            <div className="mt-9">
              <a href="#features" className="link-ember">
                See the full feature tour →
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-6 top-6 float-medium pointer-events-none">
              <CoinBlob className="h-16 w-16" />
            </div>
            <div className="absolute -right-3 -top-4 float-slow pointer-events-none">
              <StarBlob className="h-12 w-12" />
            </div>
            <div className="rounded-[24px] bg-[#f8f7f4] p-8 md:p-10">
              <PhoneFrame variant="komanda-detail" tall />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-[#00ca48] text-white">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-[15px] leading-[1.47] tracking-[-0.2px] text-[#474645]">
        {children}
      </span>
    </li>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      color: "#ff3e00",
      title: "Sign up & invite your floor",
      body: "Create the org, paste your menu (or import from a CSV), send invite links to your meseros. Done in under 4 minutes.",
      illo: <WaiterBlob className="h-20 w-20" />,
    },
    {
      n: "02",
      color: "#0090ff",
      title: "Open komandas at the table",
      body: "Each waiter opens orders straight from their phone. Numbers auto-increment, the kitchen sees the new ticket the second it's confirmed.",
      illo: <ReceiptBlob className="h-20 w-20" />,
    },
    {
      n: "03",
      color: "#00ca48",
      title: "Charge, close, and review",
      body: "Collect, mark paid, share the receipt. At the end of service, close the day — totals reconcile in the audit log.",
      illo: <PesoBlob className="h-20 w-20" />,
    },
  ];
  return (
    <section id="how" className="bg-[#f8f7f4] px-6 py-28 md:py-36">
      <div className="mx-auto max-w-[1100px]">
        <div className="max-w-[640px]">
          <p className="text-[13px] font-medium uppercase tracking-[1.4px] text-[#848281]">
            How it works
          </p>
          <h2 className="mt-4 text-[36px] md:text-[44px] font-semibold tracking-[-1.14px] leading-[1.09] text-[#121212]">
            From paper pad to live POS in three short steps.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="card-stone p-8">
              <div className="flex items-start justify-between">
                <span
                  className="font-display text-[44px] leading-none tracking-[-1.1px]"
                  style={{ color: s.color }}
                >
                  {s.n}
                </span>
                <div className="float-slow">{s.illo}</div>
              </div>
              <h3 className="mt-6 text-[19px] font-semibold tracking-[-0.25px] leading-[1.38] text-[#343433]">
                {s.title}
              </h3>
              <p className="mt-2 text-[15px] leading-[1.47] tracking-[-0.2px] text-[#474645]">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-[1100px]">
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[1.4px] text-[#ff3e00]">
              Why switch
            </p>
            <h2 className="mt-4 text-[36px] md:text-[44px] font-semibold tracking-[-1.14px] leading-[1.09] text-[#121212]">
              Designed for taquerías. Not retrofitted from a sit-down chain.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.53] tracking-[-0.22px] text-[#474645] max-w-[460px]">
              Most POS systems were built for a Cheesecake Factory in 2008 and
              charge you $89 per terminal. Komanda runs on the phone in your
              waiter&apos;s pocket and costs less than a kilo of carnitas.
            </p>
          </div>

          <div className="grid gap-5">
            <CompareCard
              kind="bad"
              title="Legacy POS terminals"
              points={[
                "$1,200 hardware per station",
                "Reboots when the WiFi blinks",
                "PDF receipts? That'll be an upsell",
                "Onboarding: a week and a trainer",
              ]}
            />
            <CompareCard
              kind="good"
              title="Komanda"
              points={[
                "Runs on phones your team already owns",
                "Offline-first, syncs the moment WiFi returns",
                "WhatsApp receipts ship by default",
                "First komanda taken in under 4 minutes",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CompareCard({
  kind,
  title,
  points,
}: {
  kind: "good" | "bad";
  title: string;
  points: string[];
}) {
  const isGood = kind === "good";
  return (
    <div
      className="card-stone p-7"
      style={
        isGood
          ? { background: "#121212", boxShadow: "none", color: "#fff" }
          : undefined
      }
    >
      <div className="flex items-center gap-2">
        <span
          className="grid h-6 w-6 place-items-center rounded-full"
          style={{
            background: isGood ? "#00ca48" : "#f2f0ed",
            color: isGood ? "#fff" : "#848281",
          }}
        >
          {isGood ? (
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
              <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </span>
        <h4
          className="text-[15px] font-semibold tracking-[-0.2px]"
          style={{ color: isGood ? "#fff" : "#343433" }}
        >
          {title}
        </h4>
      </div>
      <ul className="mt-4 space-y-2.5">
        {points.map((p) => (
          <li
            key={p}
            className="text-[15px] leading-[1.47] tracking-[-0.2px]"
            style={{ color: isGood ? "rgba(255,255,255,0.78)" : "#474645" }}
          >
            — {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Testimonials() {
  const items = [
    {
      name: "Beto Ramírez",
      handle: "@taqueria_lacalle",
      body: "Cambiamos del cuaderno al teléfono y la cocina dejó de gritar. Una de las mejores decisiones que hemos tomado en cinco años.",
      color: "#ff3e00",
      initials: "BR",
    },
    {
      name: "Ana Patricia Solís",
      handle: "@elcompa_cdmx",
      body: "Sin internet en la terraza y los pedidos llegan igual a cocina. La primera vez que lo vi funcionar sin señal me convertí.",
      color: "#0090ff",
      initials: "AS",
    },
    {
      name: "Luis Garcés",
      handle: "@mariscos_donbeto",
      body: "El cierre de día tarda 20 segundos. Antes me tomaba media hora cuadrando con calculadora.",
      color: "#00ca48",
      initials: "LG",
    },
    {
      name: "Mariana Quintero",
      handle: "@ladonatacos",
      body: "Mis meseros agarran komanda en su primer turno. Cero capacitación, cero llamadas a soporte.",
      color: "#9f4fff",
      initials: "MQ",
    },
    {
      name: "Daniel Esparza",
      handle: "@carnitasuruapan",
      body: "El recibo por WhatsApp es lo que más le gusta a los clientes. Suena tonto, pero ese detalle vale doble.",
      color: "#ffbb26",
      initials: "DE",
    },
  ];
  return (
    <section id="stories" className="px-6 py-28 md:py-36">
      <div className="mx-auto max-w-[1200px]">
        <div className="px-0 md:px-12">
          <p className="text-[13px] font-medium uppercase tracking-[1.4px] text-[#848281]">
            Friends of Komanda
          </p>
          <h2 className="mt-4 text-[36px] md:text-[44px] font-semibold tracking-[-1.14px] leading-[1.09] text-[#121212] max-w-[720px]">
            Taquerías that trade their notepads for a phone, and don&apos;t look back.
          </h2>
        </div>

        <div className="mt-12 -mx-6 overflow-x-auto no-scrollbar">
          <div className="flex gap-5 px-6 pb-2">
            {items.map((t) => (
              <article
                key={t.handle}
                className="card-stone shrink-0 w-[320px] sm:w-[360px] p-7"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="grid h-10 w-10 place-items-center rounded-full text-white text-[13px] font-semibold"
                      style={{ background: t.color }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-[14px] font-medium text-[#343433] tracking-[-0.18px]">
                        {t.name}
                      </div>
                      <div className="text-[13px] text-[#848281] tracking-[-0.17px]">
                        {t.handle}
                      </div>
                    </div>
                  </div>
                  <XLogo />
                </div>
                <p className="mt-4 text-[15px] leading-[1.47] tracking-[-0.2px] text-[#474645]">
                  {t.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="px-6 py-28 md:py-36 bg-[#f8f7f4]">
      <div className="mx-auto max-w-[1100px]">
        <div className="text-center max-w-[680px] mx-auto">
          <p className="text-[13px] font-medium uppercase tracking-[1.4px] text-[#ff3e00]">
            Pricing
          </p>
          <h2 className="mt-4 text-[36px] md:text-[44px] font-semibold tracking-[-1.14px] leading-[1.09] text-[#121212]">
            One price. Every waiter. Every table.
          </h2>
          <p className="mt-5 text-[17px] leading-[1.53] tracking-[-0.22px] text-[#474645]">
            No per-terminal fees, no transaction cuts, no &quot;premium support&quot; tier.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3 max-w-[980px] mx-auto">
          <PriceCard
            name="Esquina"
            price="0"
            tagline="For one taquería, one waiter, learning the ropes."
            features={["1 location", "Up to 2 waiters", "30-day audit log", "Email support"]}
            cta="Start free"
            highlight={false}
          />
          <PriceCard
            name="Mercado"
            price="49"
            tagline="The plan most taquerías run on. Fits a busy floor."
            features={[
              "1 location",
              "Unlimited waiters",
              "Full audit log",
              "WhatsApp receipts",
              "Menu manager",
              "Daily close-out exports",
            ]}
            cta="Start 30-day trial"
            highlight={true}
          />
          <PriceCard
            name="Cadena"
            price="129"
            tagline="Multi-location operators with a back office."
            features={[
              "Up to 5 locations",
              "Unlimited waiters",
              "Cross-location reports",
              "Priority support",
              "Custom menu imports",
            ]}
            cta="Talk to us"
            highlight={false}
          />
        </div>
        <p className="mt-8 text-center text-[13px] text-[#848281] tracking-[-0.17px]">
          Prices in USD per location, per month. Pesos at checkout — we don&apos;t play FX games.
        </p>
      </div>
    </section>
  );
}

function PriceCard({
  name,
  price,
  tagline,
  features,
  cta,
  highlight,
}: {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  cta: string;
  highlight: boolean;
}) {
  return (
    <div
      className={`relative p-8 ${
        highlight
          ? "rounded-[16px] bg-[#121212] text-white"
          : "card-stone"
      }`}
    >
      {highlight && (
        <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-[#ff3e00] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1px] text-white">
          Most popular
        </span>
      )}
      <div className={highlight ? "text-white" : "text-[#343433]"}>
        <h3 className="font-display text-[28px] tracking-[-0.8px] leading-none">
          {name}
        </h3>
        <p
          className={`mt-3 text-[14px] leading-[1.43] ${
            highlight ? "text-white/70" : "text-[#848281]"
          }`}
        >
          {tagline}
        </p>
      </div>
      <div className="mt-6 flex items-end gap-1">
        <span
          className={`font-display text-[60px] leading-none tracking-[-1.8px] tabular ${
            highlight ? "text-white" : "text-[#121212]"
          }`}
        >
          ${price}
        </span>
        <span
          className={`pb-2 text-[14px] ${
            highlight ? "text-white/60" : "text-[#848281]"
          }`}
        >
          /mo
        </span>
      </div>
      <ul className="mt-6 space-y-2.5">
        {features.map((f) => (
          <li
            key={f}
            className={`flex items-start gap-2 text-[14px] leading-[1.43] tracking-[-0.18px] ${
              highlight ? "text-white/85" : "text-[#474645]"
            }`}
          >
            <span
              className="mt-1 grid h-4 w-4 place-items-center rounded-full"
              style={{
                background: highlight ? "rgba(255,255,255,0.12)" : "#f2f0ed",
                color: highlight ? "#fff" : "#00ca48",
              }}
            >
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {f}
          </li>
        ))}
      </ul>
      <a
        href="#get-started"
        className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-5 py-3.5 text-[14px] font-medium tracking-[-0.18px] transition-colors ${
          highlight
            ? "bg-white text-[#121212] hover:bg-[#f8f7f4]"
            : "bg-[#121212] text-white hover:bg-[#343433]"
        }`}
      >
        {cta}
      </a>
    </div>
  );
}

function FinalCta() {
  return (
    <section id="get-started" className="px-6 py-28 md:py-36">
      <div className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[28px] bg-[#121212] px-8 py-16 md:px-16 md:py-24 text-white">
        <div className="pointer-events-none absolute inset-0 select-none opacity-90">
          <div className="absolute -left-6 -top-6 float-slow"><TacoBlob className="h-28 w-28" /></div>
          <div className="absolute right-8 -top-4 float-medium"><PesoBlob className="h-20 w-20" /></div>
          <div className="absolute right-[28%] bottom-4 float-fast"><StarBlob className="h-14 w-14" /></div>
          <div className="absolute -right-4 bottom-6 float-slow"><ChiliBlob className="h-20 w-20" /></div>
          <div className="absolute left-[20%] -bottom-4 float-medium"><CoinBlob className="h-16 w-16" /></div>
        </div>
        <div className="relative max-w-[640px]">
          <h2 className="font-display text-[40px] md:text-[58px] leading-[1.05] tracking-[-1.6px] md:tracking-[-2px]">
            Take the next komanda on a phone.
          </h2>
          <p className="mt-5 text-[17px] leading-[1.53] tracking-[-0.22px] text-white/70 max-w-[480px]">
            30-day free trial. No card. Set up before lunch service, run it
            through dinner. If it doesn&apos;t pay for itself, walk away.
          </p>
          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff3e00] px-6 py-4 text-[14px] font-semibold tracking-[-0.18px] text-white transition-transform hover:translate-y-[-1px]"
            >
              Start free
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path d="M3 6h6m0 0L6.5 3.5M9 6L6.5 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-4 text-[14px] font-medium text-white/90 transition-colors hover:bg-white/5"
            >
              Book a 15-min walkthrough
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 pb-14 pt-8">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-10 border-t border-[#f2f0ed] pt-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#" className="flex items-center gap-2 text-[#343433]">
              <Logo className="h-7 w-7" />
              <span className="font-display text-[22px] tracking-[-0.6px] leading-none">komanda</span>
            </a>
            <p className="mt-4 max-w-[280px] text-[14px] leading-[1.5] text-[#848281] tracking-[-0.18px]">
              The POS for taquerías that runs in your waiter&apos;s pocket. Built in México for taquerías everywhere.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <SocialIcon><XLogo /></SocialIcon>
              <SocialIcon>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7C18.34 21.21 22 17.06 22 12.06c0-5.53-4.5-10.02-10-10.02z"/></svg>
              </SocialIcon>
              <SocialIcon>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.86 5.86 0 0 0-2.13 1.38A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.73 1.46 1.38 2.13.67.65 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.13-1.38 5.86 5.86 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
              </SocialIcon>
            </div>
          </div>
          <FooterCol
            title="Product"
            links={[
              ["Features", "#features"],
              ["How it works", "#how"],
              ["Pricing", "#pricing"],
              ["Changelog", "#"],
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              ["About", "#"],
              ["Blog", "#"],
              ["Stories", "#stories"],
              ["Press", "#"],
            ]}
          />
          <FooterCol
            title="Support"
            links={[
              ["Help center", "#"],
              ["Onboarding", "#"],
              ["Status", "#"],
              ["Contact", "mailto:hola@komanda.app"],
            ]}
          />
        </div>
        <div className="mt-12 flex flex-col-reverse gap-3 border-t border-[#f2f0ed] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] text-[#a7a7a7] tracking-[-0.17px]">
            © 2026 Komanda. Hecho con cariño en CDMX.
          </p>
          <div className="flex items-center gap-5 text-[13px] text-[#848281]">
            <a className="hover:text-[#343433] transition-colors" href="#">Privacy</a>
            <a className="hover:text-[#343433] transition-colors" href="#">Terms</a>
            <a className="hover:text-[#343433] transition-colors" href="#">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h4 className="text-[13px] font-semibold uppercase tracking-[1.2px] text-[#343433]">
        {title}
      </h4>
      <ul className="mt-4 space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <a
              className="text-[14px] text-[#474645] tracking-[-0.18px] hover:text-[#121212] transition-colors"
              href={href}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="#"
      className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#474645] shadow-[var(--shadow-subtle)] transition-colors hover:text-[#121212]"
    >
      {children}
    </a>
  );
}

/* Inline icons */

function PlayIcon() {
  return (
    <span className="grid h-7 w-7 place-items-center rounded-full bg-[#ff3e00] text-white">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
        <path d="M3 1.5l5 3.5-5 3.5z" />
      </svg>
    </span>
  );
}

function OrdersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4h11l3 3v13H5z" />
      <path d="M8 9h8M8 13h8M8 17h5" />
    </svg>
  );
}
function OfflineIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 9c5-5 15-5 20 0" />
      <path d="M5 13c4-4 10-4 14 0" />
      <path d="M9 17c2-2 4-2 6 0" />
      <path d="M3 3l18 18" />
    </svg>
  );
}
function ChargeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h3" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3h11l3 3v15H5z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  );
}
function ShieldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function TeamIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="3" />
      <circle cx="17" cy="11" r="2.5" />
      <path d="M3 19c0-3 3-5 6-5s6 2 6 5" />
      <path d="M14 19c0-2 2-3.5 4-3.5s4 1.5 4 3.5" />
    </svg>
  );
}
function XLogo() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h3l-7.5 8.6L22 22h-6.8l-5.3-6.5L3.7 22H1l8-9.2L1.6 2h7l4.8 6z" />
    </svg>
  );
}
