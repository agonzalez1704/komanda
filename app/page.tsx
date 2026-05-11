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
import {
  TRIAL_DAYS,
  PRICE_MXN,
  PRICE_USD_APPROX,
  PRICE_CURRENCY,
  PRICE_CADENCE_ES,
} from "./_lib/config";

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
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2 text-[#343433]">
          <Logo className="h-7 w-7" />
          <span className="font-display text-[22px] tracking-[-0.6px] leading-none">
            komanda
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-[14px] font-medium text-[#343433]">
          <a className="hover:text-[#121212] transition-colors" href="#features">Funciones</a>
          <a className="hover:text-[#121212] transition-colors" href="#how">Cómo funciona</a>
          <a className="hover:text-[#121212] transition-colors" href="#pricing">Precio</a>
          <a className="hover:text-[#121212] transition-colors" href="#stories">Historias</a>
        </nav>
        <div className="flex items-center gap-2">
          <a className="pill-light hidden sm:inline-flex" href="/signin">Entrar</a>
          <a className="pill-dark" href="/signup">
            Empezar
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
            Ya disponible · iOS y Android
          </span>
          <h1 className="font-display text-[44px] leading-[1.05] tracking-[-1.4px] text-[#343433] md:text-[68px] md:tracking-[-2.11px] md:leading-[1.09] max-w-[820px]">
            El nuevo mesero favorito
            <br className="hidden md:block" /> de tu{" "}
            <span className="relative inline-block">
              taquería
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
            Komanda convierte cualquier celular en un POS de mesa. Toma pedidos
            en segundos, trabaja sin internet cuando se cae el WiFi, cobra con
            un toque y manda el recibo por WhatsApp antes de que el cliente
            llegue a la puerta.
          </p>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row">
            <a className="pill-dark px-6 py-4" href="/signup">
              Empieza gratis {TRIAL_DAYS} días
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path d="M3 6h6m0 0L6.5 3.5M9 6L6.5 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a className="link-ember px-2 py-3" href="#demo">
              <PlayIcon /> Ver demo de 60 segundos
            </a>
          </div>
          <p className="mt-6 text-[12px] tracking-[-0.14px] text-[#848281]">
            Sin tarjeta · Lista en menos de 4 minutos · Cancelas cuando quieras
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
          Sirviendo en taquerías de todo México · CDMX, GDL, MTY
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
            Qué hay en el menú
          </p>
          <h2 className="mt-4 text-[36px] md:text-[44px] font-semibold tracking-[-1.14px] leading-[1.09] text-[#121212]">
            Hecha al ritmo de una taquería de verdad —
            <span className="text-[#ff3e00]"> ruidosa, rápida y siempre de pie</span>.
          </h2>
          <p className="mt-5 text-[17px] leading-[1.53] tracking-[-0.22px] text-[#474645] max-w-[560px]">
            Tres cosas importan en la mesa: que el pedido salga bien, cobrar
            rápido y nunca perder la cuenta. Komanda está diseñada alrededor de
            eso — y nada más.
          </p>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={<OrdersIcon />}
            title="Pedidos en segundos"
            body="Tocas el platillo, deslizas para agregar modificador, va a cocina. Seis toques desde que se sientan hasta que entra a la plancha."
            accent="#0090ff"
          />
          <FeatureCard
            icon={<OfflineIcon />}
            title="Funciona sin señal"
            body="¿El módem en la trastienda? ¿WiFi peleándose con el microondas? Komanda guarda cada pedido en el celular y sincroniza al primer rayita."
            accent="#00ca48"
          />
          <FeatureCard
            icon={<ChargeIcon />}
            title="Cierra y cobra con un toque"
            body="Efectivo, transferencia o tarjeta — cobras, marcas pagado y mandas el recibo en PDF por WhatsApp en el mismo gesto."
            accent="#ffbb26"
          />
          <FeatureCard
            icon={<MenuIcon />}
            title="Menú que editas al mediodía"
            body="¿Se acabaron las carnitas? Las marcas como agotadas desde el panel y todos tus meseros lo ven al siguiente toque. Sin recompilar, sin reiniciar."
            accent="#ff3e00"
          />
          <FeatureCard
            icon={<ShieldIcon />}
            title="Lista para auditar de fábrica"
            body="Cada cancelación, cada cortesía, cada cierre de día — con fecha, hora y firma de quien lo hizo. Tu contador te lo va a agradecer."
            accent="#9f4fff"
          />
          <FeatureCard
            icon={<TeamIcon />}
            title="Da de alta un mesero en 12 segundos"
            body="Le mandas el link de invitación, instala Komanda, ya está en piso. Sin gerente, sin SIM que provisionar."
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
    <div className="card-stone card-stone-hover p-9 md:p-10">
      <div
        className="mb-6 grid h-12 w-12 place-items-center rounded-[14px]"
        style={{ background: `${accent}1A`, color: accent }}
      >
        {icon}
      </div>
      <h3 className="text-[19px] font-semibold tracking-[-0.25px] leading-[1.38] text-[#343433]">
        {title}
      </h3>
      <p className="mt-3 text-[15px] leading-[1.47] tracking-[-0.2px] text-[#474645]">
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
              La comanda, en el bolsillo
            </p>
            <h2 className="mt-4 text-[36px] md:text-[44px] font-semibold tracking-[-1.14px] leading-[1.09] text-[#121212]">
              Cada komanda tiene número, mesa e historia.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.53] tracking-[-0.22px] text-[#474645] max-w-[480px]">
              Platillos, modificadores, cancelaciones, cortesías — Komanda
              guarda el hilo completo de cada cuenta para que un gerente retome
              justo donde el mesero se quedó.
            </p>
            <ul className="mt-8 space-y-4">
              <CheckItem>Folios automáticos por día y por sucursal</CheckItem>
              <CheckItem>Totales corrientes por mesa con propina sugerida</CheckItem>
              <CheckItem>Cancelaciones y cortesías siempre piden motivo</CheckItem>
              <CheckItem>Cierras el día con un botón y te llega un PDF firmado al correo</CheckItem>
            </ul>
            <div className="mt-9">
              <a href="#features" className="link-ember">
                Ver el recorrido completo →
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
      title: "Regístrate e invita a tu piso",
      body: "Crea la organización, pega tu menú (o impórtalo de un CSV) y manda los links de invitación a tus meseros. Listo en menos de 4 minutos.",
      illo: <WaiterBlob className="h-20 w-20" />,
    },
    {
      n: "02",
      color: "#0090ff",
      title: "Abre komandas en la mesa",
      body: "Cada mesero abre los pedidos desde su celular. Los folios se generan solos y la cocina ve el ticket en cuanto se confirma.",
      illo: <ReceiptBlob className="h-20 w-20" />,
    },
    {
      n: "03",
      color: "#00ca48",
      title: "Cobra, cierra y revisa",
      body: "Cobras, marcas pagado y compartes el recibo. Al final del servicio cierras el día — los totales cuadran en la bitácora.",
      illo: <PesoBlob className="h-20 w-20" />,
    },
  ];
  return (
    <section id="how" className="bg-[#f8f7f4] px-6 py-28 md:py-36">
      <div className="mx-auto max-w-[1100px]">
        <div className="max-w-[640px]">
          <p className="text-[13px] font-medium uppercase tracking-[1.4px] text-[#848281]">
            Cómo funciona
          </p>
          <h2 className="mt-4 text-[36px] md:text-[44px] font-semibold tracking-[-1.14px] leading-[1.09] text-[#121212]">
            Del cuaderno al POS en tres pasos cortos.
          </h2>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="card-stone p-9 md:p-10">
              <div className="flex items-start justify-between">
                <span
                  className="font-display text-[44px] leading-none tracking-[-1.1px]"
                  style={{ color: s.color }}
                >
                  {s.n}
                </span>
                <div className="float-slow">{s.illo}</div>
              </div>
              <h3 className="mt-7 text-[19px] font-semibold tracking-[-0.25px] leading-[1.38] text-[#343433]">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.47] tracking-[-0.2px] text-[#474645]">
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
              Por qué cambiar
            </p>
            <h2 className="mt-4 text-[36px] md:text-[44px] font-semibold tracking-[-1.14px] leading-[1.09] text-[#121212]">
              Diseñada para taquerías. No es un POS de cadena adaptado.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.53] tracking-[-0.22px] text-[#474645] max-w-[460px]">
              La mayoría de los POS se hicieron para una cadena gringa en 2008
              y te cobran MXN 1,800 por terminal. Komanda corre en el celular
              del mesero y cuesta más o menos un kilo de carnitas al mes.
            </p>
          </div>

          <div className="grid gap-5">
            <CompareCard
              kind="bad"
              title="POS de toda la vida"
              points={[
                "Más de MXN 22,000 de hardware por terminal",
                "Se reinicia cuando parpadea el WiFi",
                "¿Recibos en PDF? Te los cobran aparte",
                "Capacitación: una semana y un instructor",
              ]}
            />
            <CompareCard
              kind="good"
              title="Komanda"
              points={[
                "Corre en los celulares que ya tienen tus meseros",
                "Funciona sin internet y sincroniza al volver la señal",
                "Recibos por WhatsApp incluidos de fábrica",
                "Tu primera komanda en menos de 4 minutos",
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
      className="card-stone p-8 md:p-9"
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
            Amigos de Komanda
          </p>
          <h2 className="mt-4 text-[36px] md:text-[44px] font-semibold tracking-[-1.14px] leading-[1.09] text-[#121212] max-w-[720px]">
            Taquerías que cambiaron el cuaderno por un teléfono y no miran atrás.
          </h2>
        </div>

        <div className="mt-12 -mx-6 overflow-x-auto no-scrollbar">
          <div className="flex gap-5 px-6 pb-2">
            {items.map((t) => (
              <article
                key={t.handle}
                className="card-stone shrink-0 w-[340px] sm:w-[380px] p-8 md:p-9"
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
  const includedLeft = [
    "Meseros y mesas ilimitados",
    "Komandas ilimitadas por día",
    "Motor de sincronización sin internet",
    "Recibos por WhatsApp y PDF",
    "Manejo de menú + platillos agotados",
    "Cierre de día y exportaciones",
  ];
  const includedRight = [
    "Bitácora (cancelaciones, cortesías, ediciones)",
    "Aislamiento por sucursal con RLS",
    "Apps de iOS y Android",
    "Panel del dueño (web)",
    "Soporte por correo, en español",
    "Actualizaciones gratis, para siempre",
  ];

  return (
    <section id="pricing" className="relative px-6 py-28 md:py-36 bg-[#f8f7f4] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute left-[6%] top-16 float-slow opacity-90">
          <PesoBlob className="h-20 w-20" />
        </div>
        <div className="absolute right-[8%] top-24 float-medium opacity-90">
          <CoinBlob className="h-16 w-16" />
        </div>
        <div className="absolute right-[14%] bottom-12 float-fast opacity-90">
          <StarBlob className="h-12 w-12" />
        </div>
      </div>

      <div className="relative mx-auto max-w-[1100px]">
        <div className="text-center max-w-[700px] mx-auto">
          <p className="text-[13px] font-medium uppercase tracking-[1.4px] text-[#ff3e00]">
            Precio
          </p>
          <h2 className="mt-4 text-[36px] md:text-[44px] font-semibold tracking-[-1.14px] leading-[1.09] text-[#121212]">
            Una taquería, un precio.{" "}
            <span className="text-[#ff3e00]">Sin letra chiquita.</span>
          </h2>
          <p className="mt-5 text-[17px] leading-[1.53] tracking-[-0.22px] text-[#474645]">
            Sin cobro por mesero. Sin comisión por transacción. Sin paquete
            &quot;premium&quot; que te quieran vender después. Una tarifa plana
            en pesos y todos tus meseros en piso con celular.
          </p>
        </div>

        <div className="relative mt-14 mx-auto max-w-[860px] rounded-[28px] bg-[#121212] text-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-[0.08]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(#ffffff 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
          </div>

          <div className="relative grid md:grid-cols-[1.1fr_1fr]">
            <div className="p-10 md:p-14 border-b md:border-b-0 md:border-r border-white/10">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff3e00] px-3 py-1 text-[11px] font-semibold uppercase tracking-[1px] text-white">
                  Plan único
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium tracking-[0.4px] text-white/80">
                  Prueba gratis {TRIAL_DAYS} días
                </span>
              </div>

              <h3 className="mt-6 font-display text-[34px] tracking-[-1px] leading-none">
                Komanda Completo
              </h3>
              <p className="mt-3 text-[15px] leading-[1.47] tracking-[-0.2px] text-white/70 max-w-[360px]">
                Todo lo de abajo. Todos tus meseros. Todas tus mesas. Una
                taquería. Cancelas cuando quieras — sin penalización ni
                amarre anual.
              </p>

              <div className="mt-9 flex items-end gap-2">
                <span className="font-display text-[80px] leading-[0.9] tracking-[-2.4px] tabular text-white">
                  ${PRICE_MXN}
                </span>
                <div className="pb-3 flex flex-col">
                  <span className="text-[13px] font-semibold uppercase tracking-[1.6px] text-[#ffbb26] leading-none">
                    {PRICE_CURRENCY}
                  </span>
                  <span className="mt-1.5 text-[14px] text-white/60 tracking-[-0.18px]">
                    {PRICE_CADENCE_ES}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-[12px] tracking-[-0.14px] text-white/50">
                ≈ USD ${PRICE_USD_APPROX} · Pagas en pesos, sin sorpresas de tipo de cambio.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[14px] font-semibold tracking-[-0.18px] text-[#121212] transition-transform hover:translate-y-[-1px]"
                >
                  Empezar gratis {TRIAL_DAYS} días
                  <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                    <path d="M3 6h6m0 0L6.5 3.5M9 6L6.5 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-[14px] font-medium text-white/90 transition-colors hover:bg-white/5"
                >
                  Hablar con ventas
                </a>
              </div>

              <p className="mt-5 text-[12px] tracking-[-0.14px] text-white/50">
                Sin tarjeta. Sin contrato. Cancelas cuando quieras.
              </p>
            </div>

            <div className="p-10 md:p-14 bg-white/2">
              <p className="text-[12px] font-semibold uppercase tracking-[1.4px] text-white/55">
                Lo que incluye
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {[...includedLeft, ...includedRight].map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-[#00ca48]/15 text-[#00ca48] shrink-0">
                      <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-[13.5px] leading-[1.4] tracking-[-0.18px] text-white/85">
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3 max-w-[860px] mx-auto">
          <PricingFootCard
            color="#ff3e00"
            title="¿Más de una sucursal?"
            body="Cada taquería corre su propio plan. Te conectamos un dashboard combinado sin costo extra cuando son 3+."
          />
          <PricingFootCard
            color="#0090ff"
            title="¿Y el hardware?"
            body="Cero. Komanda corre en los teléfonos que ya traen tus meseros. Si necesitas dispositivos, te recomendamos opciones desde MXN 2,500."
          />
          <PricingFootCard
            color="#00ca48"
            title="¿Devoluciones?"
            body="Si el primer mes no te convence, te regresamos el pago completo sin preguntas. Te quedas con tus datos exportados."
          />
        </div>
      </div>
    </section>
  );
}

function PricingFootCard({
  color,
  title,
  body,
}: {
  color: string;
  title: string;
  body: string;
}) {
  return (
    <div className="card-stone p-7 md:p-8">
      <span
        className="inline-block h-1.5 w-8 rounded-full"
        style={{ background: color }}
      />
      <h4 className="mt-4 text-[15px] font-semibold tracking-[-0.2px] text-[#343433]">
        {title}
      </h4>
      <p className="mt-2 text-[13.5px] leading-[1.45] tracking-[-0.18px] text-[#474645]">
        {body}
      </p>
    </div>
  );
}

function FinalCta() {
  return (
    <section id="get-started" className="px-6 py-28 md:py-36">
      <div className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[28px] bg-[#121212] px-10 py-20 md:px-20 md:py-28 text-white">
        <div className="pointer-events-none absolute inset-0 select-none opacity-90">
          <div className="absolute -left-6 -top-6 float-slow"><TacoBlob className="h-28 w-28" /></div>
          <div className="absolute right-8 -top-4 float-medium"><PesoBlob className="h-20 w-20" /></div>
          <div className="absolute right-[28%] bottom-4 float-fast"><StarBlob className="h-14 w-14" /></div>
          <div className="absolute -right-4 bottom-6 float-slow"><ChiliBlob className="h-20 w-20" /></div>
          <div className="absolute left-[20%] -bottom-4 float-medium"><CoinBlob className="h-16 w-16" /></div>
        </div>
        <div className="relative max-w-[640px]">
          <h2 className="font-display text-[40px] md:text-[58px] leading-[1.05] tracking-[-1.6px] md:tracking-[-2px]">
            Toma la próxima komanda en un teléfono.
          </h2>
          <p className="mt-5 text-[17px] leading-[1.53] tracking-[-0.22px] text-white/70 max-w-[480px]">
            Prueba gratis {TRIAL_DAYS} días. Sin tarjeta. La configuras antes
            de la comida y la corres en la cena. Si no se paga sola, te vas
            sin compromiso.
          </p>
          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff3e00] px-6 py-4 text-[14px] font-semibold tracking-[-0.18px] text-white transition-transform hover:translate-y-[-1px]"
            >
              Empezar gratis
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path d="M3 6h6m0 0L6.5 3.5M9 6L6.5 8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-4 text-[14px] font-medium text-white/90 transition-colors hover:bg-white/5"
            >
              Agendar demo de 15 min
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
              El POS para taquerías que cabe en el bolsillo del mesero. Hecho
              en México para taquerías de todos lados.
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
            title="Producto"
            links={[
              ["Funciones", "#features"],
              ["Cómo funciona", "#how"],
              ["Precio", "#pricing"],
              ["Novedades", "#"],
            ]}
          />
          <FooterCol
            title="Empresa"
            links={[
              ["Nosotros", "#"],
              ["Blog", "#"],
              ["Historias", "#stories"],
              ["Prensa", "#"],
            ]}
          />
          <FooterCol
            title="Soporte"
            links={[
              ["Centro de ayuda", "#"],
              ["Onboarding", "#"],
              ["Estado", "#"],
              ["Contacto", "mailto:hola@komanda.app"],
            ]}
          />
        </div>
        <div className="mt-12 flex flex-col-reverse gap-3 border-t border-[#f2f0ed] pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-[13px] text-[#a7a7a7] tracking-[-0.17px]">
            © 2026 Komanda. Hecho con cariño en CDMX.
          </p>
          <div className="flex items-center gap-5 text-[13px] text-[#848281]">
            <a className="hover:text-[#343433] transition-colors" href="#">Privacidad</a>
            <a className="hover:text-[#343433] transition-colors" href="#">Términos</a>
            <a className="hover:text-[#343433] transition-colors" href="#">Seguridad</a>
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
