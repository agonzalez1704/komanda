type Variant = "komanda-list" | "komanda-detail" | "charge";

export function PhoneFrame({
  variant,
  tall = false,
}: {
  variant: Variant;
  tall?: boolean;
}) {
  const height = tall ? 620 : 540;
  return (
    <div
      className="relative mx-auto w-full max-w-[300px]"
      style={{
        filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.18))",
      }}
    >
      <div
        className="relative overflow-hidden rounded-[36px] bg-black p-[6px]"
        style={{ height }}
      >
        {/* Notch */}
        <div className="absolute left-1/2 top-2 z-10 h-[22px] w-[88px] -translate-x-1/2 rounded-full bg-black" />
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[30px] bg-[#fbfaf9]">
          {variant === "komanda-list" && <KomandaListUI />}
          {variant === "komanda-detail" && <KomandaDetailUI tall={tall} />}
          {variant === "charge" && <ChargeUI />}
        </div>
      </div>
    </div>
  );
}

function StatusBar({ title }: { title: string }) {
  return (
    <>
      <div className="flex items-center justify-between px-5 pt-5 pb-1 text-[11px] font-semibold tracking-[-0.1px] text-[#121212] tabular">
        <span>9:41</span>
        <span className="flex items-center gap-1">
          <svg width="14" height="9" viewBox="0 0 14 9" fill="currentColor">
            <rect x="0" y="6" width="2" height="3" rx="0.5" />
            <rect x="3" y="4" width="2" height="5" rx="0.5" />
            <rect x="6" y="2" width="2" height="7" rx="0.5" />
            <rect x="9" y="0" width="2" height="9" rx="0.5" />
          </svg>
          <svg width="16" height="9" viewBox="0 0 16 9" fill="currentColor">
            <rect x="0.5" y="0.5" width="13" height="8" rx="2" stroke="currentColor" fill="none" />
            <rect x="2" y="2" width="9" height="5" rx="1" />
            <rect x="14" y="3" width="1.5" height="3" rx="0.5" />
          </svg>
        </span>
      </div>
      <div className="px-5 pt-3 pb-3 flex items-center justify-between">
        <h4 className="font-display text-[24px] tracking-[-0.7px] leading-none text-[#121212]">
          {title}
        </h4>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#121212] text-white">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </div>
    </>
  );
}

function KomandaListUI() {
  const items = [
    { n: "#042", table: "Mesa 4", items: 6, total: "$386", state: "Abierta", color: "#0090ff" },
    { n: "#041", table: "Barra 2", items: 3, total: "$162", state: "Abierta", color: "#0090ff" },
    { n: "#040", table: "Mesa 9", items: 8, total: "$524", state: "Cobrada", color: "#00ca48" },
    { n: "#039", table: "Mesa 1", items: 4, total: "$248", state: "Cobrada", color: "#00ca48" },
    { n: "#038", table: "Mesa 7", items: 5, total: "$310", state: "Cobrada", color: "#00ca48" },
  ];
  return (
    <>
      <StatusBar title="Komandas" />
      <div className="px-5">
        <div className="flex items-center gap-2 rounded-[10px] bg-[#f2f0ed] px-3 py-2.5 text-[13px] text-[#848281]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>
          Buscar mesa o número…
        </div>
      </div>
      <div className="mt-3 px-5 flex items-center gap-2 text-[12px]">
        <span className="rounded-full bg-[#121212] text-white px-3 py-1 font-medium">Hoy</span>
        <span className="rounded-full bg-[#f2f0ed] text-[#474645] px-3 py-1">Abiertas</span>
        <span className="rounded-full bg-[#f2f0ed] text-[#474645] px-3 py-1">Cobradas</span>
      </div>
      <div className="mt-4 flex-1 overflow-hidden px-5 space-y-2.5">
        {items.map((it) => (
          <div
            key={it.n}
            className="flex items-center justify-between rounded-[14px] bg-white p-3.5 shadow-[var(--shadow-subtle)]"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-[10px] bg-[#f8f7f4] text-[12px] font-semibold tracking-[-0.1px] text-[#121212] tabular">
                {it.n}
              </div>
              <div>
                <div className="text-[13px] font-semibold tracking-[-0.17px] text-[#121212]">
                  {it.table}
                </div>
                <div className="text-[11px] text-[#848281]">{it.items} platillos</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[13px] font-semibold tracking-[-0.17px] text-[#121212] tabular">
                {it.total}
              </div>
              <div className="flex items-center justify-end gap-1 text-[10px]" style={{ color: it.color }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: it.color }} />
                {it.state}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 pb-5 pt-4">
        <div className="rounded-[14px] bg-[#121212] text-white px-4 py-3 flex items-center justify-between">
          <span className="text-[12px] tracking-[-0.14px]">Ventas del día</span>
          <span className="font-display text-[18px] tracking-[-0.4px] tabular">$5,840</span>
        </div>
      </div>
    </>
  );
}

function KomandaDetailUI({ tall = false }: { tall?: boolean }) {
  const lines = [
    { name: "Taco al pastor", qty: 4, price: "$96" },
    { name: "Taco campechano", qty: 2, price: "$56" },
    { name: "Quesadilla suadero", qty: 1, price: "$78" },
    { name: "Agua de jamaica 1L", qty: 1, price: "$65" },
    { name: "Guacamole extra", qty: 2, price: "$48" },
  ];
  return (
    <>
      <StatusBar title="#042 · Mesa 4" />
      <div className="px-5">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="rounded-full bg-[#0090ff]/10 text-[#0086fc] px-2.5 py-1 font-medium">
            Abierta · 18 min
          </span>
          <span className="rounded-full bg-[#f2f0ed] text-[#474645] px-2.5 py-1">
            Mesera: Lupita
          </span>
        </div>
      </div>
      <div className="mt-4 flex-1 overflow-hidden px-5 space-y-2">
        {lines.slice(0, tall ? lines.length : 4).map((l) => (
          <div
            key={l.name}
            className="flex items-center justify-between rounded-[12px] bg-white p-3 shadow-[var(--shadow-subtle)]"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-7 w-7 place-items-center rounded-[8px] bg-[#ff3e00]/10 text-[11px] font-semibold text-[#ff3e00] tabular">
                {l.qty}×
              </div>
              <span className="text-[12.5px] font-medium tracking-[-0.15px] text-[#343433]">
                {l.name}
              </span>
            </div>
            <span className="text-[12.5px] font-semibold tracking-[-0.15px] text-[#121212] tabular">
              {l.price}
            </span>
          </div>
        ))}
      </div>
      <div className="px-5 pb-5 pt-3 space-y-2">
        <div className="flex items-center justify-between text-[12px] text-[#848281]">
          <span>Subtotal</span>
          <span className="tabular">$343</span>
        </div>
        <div className="flex items-center justify-between text-[12px] text-[#848281]">
          <span>Propina sugerida (10%)</span>
          <span className="tabular">$34</span>
        </div>
        <div className="flex items-center justify-between rounded-[14px] bg-[#121212] text-white px-4 py-3">
          <span className="text-[12px] tracking-[-0.14px]">Total</span>
          <span className="font-display text-[20px] tracking-[-0.5px] tabular">$377</span>
        </div>
        <button className="w-full rounded-full bg-[#ff3e00] py-3 text-[13px] font-semibold tracking-[-0.18px] text-white">
          Cobrar y cerrar
        </button>
      </div>
    </>
  );
}

function ChargeUI() {
  return (
    <>
      <StatusBar title="Cobrar" />
      <div className="flex flex-1 flex-col items-center px-5">
        <div className="w-full rounded-[16px] bg-[#121212] text-white p-5">
          <div className="text-[11px] uppercase tracking-[1.2px] text-white/60">
            Total a cobrar
          </div>
          <div className="font-display text-[44px] tracking-[-1.2px] leading-none mt-1 tabular">
            $377
          </div>
          <div className="mt-2 text-[12px] text-white/60">
            Komanda #042 · Mesa 4 · 5 platillos
          </div>
        </div>

        <div className="mt-4 grid w-full grid-cols-3 gap-2">
          {[
            { l: "Efectivo", c: "#00ca48" },
            { l: "Transfer", c: "#0090ff" },
            { l: "Tarjeta", c: "#ffbb26" },
          ].map((p, i) => (
            <button
              key={p.l}
              className={`rounded-[14px] p-3 text-[11.5px] font-semibold tracking-[-0.14px] ${
                i === 0
                  ? "bg-[#121212] text-white"
                  : "bg-white text-[#343433] shadow-[var(--shadow-subtle)]"
              }`}
            >
              <span
                className="mb-2 block h-1 w-6 mx-auto rounded-full"
                style={{ background: p.c }}
              />
              {p.l}
            </button>
          ))}
        </div>

        <div className="mt-4 w-full rounded-[14px] bg-white p-3.5 shadow-[var(--shadow-subtle)]">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#474645]">Recibo por WhatsApp</span>
            <span className="grid h-5 w-9 items-center rounded-full bg-[#00ca48] px-0.5">
              <span className="ml-auto block h-4 w-4 rounded-full bg-white" />
            </span>
          </div>
          <div className="mt-2 flex items-center gap-2 rounded-[10px] bg-[#f8f7f4] px-3 py-2 text-[12px] text-[#343433]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>
            +52 55 1234 5678
          </div>
        </div>
      </div>
      <div className="px-5 pb-5 pt-4">
        <button className="w-full rounded-full bg-[#121212] py-3.5 text-[13.5px] font-semibold tracking-[-0.18px] text-white">
          Confirmar cobro
        </button>
      </div>
    </>
  );
}
