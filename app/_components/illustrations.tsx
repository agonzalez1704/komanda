import type { SVGProps } from "react";

type IlloProps = SVGProps<SVGSVGElement> & { className?: string };

export function TacoBlob({ className, ...rest }: IlloProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} {...rest} aria-hidden>
      {/* shell */}
      <path
        d="M10 70 Q50 20 90 70 Z"
        fill="#ffbb26"
        stroke="#d48f00"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* lettuce */}
      <path
        d="M16 70 Q24 60 32 70 Q40 60 48 70 Q56 60 64 70 Q72 60 80 70 Q86 64 90 70"
        fill="#00ca48"
        stroke="#00a83a"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* meat */}
      <path
        d="M22 70 Q26 64 32 70 Q38 64 44 70 Q50 64 56 70 Q62 64 68 70 Q74 64 80 70 Z"
        fill="#ff3e00"
      />
      {/* eyes */}
      <circle cx="44" cy="58" r="2.6" fill="#121212" />
      <circle cx="58" cy="58" r="2.6" fill="#121212" />
      <path
        d="M46 64 q4 3 8 0"
        stroke="#121212"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* sparkle */}
      <circle cx="86" cy="32" r="2" fill="#ff3e00" />
      <circle cx="14" cy="38" r="2" fill="#0090ff" />
    </svg>
  );
}

export function CoinBlob({ className, ...rest }: IlloProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} {...rest} aria-hidden>
      <circle cx="50" cy="50" r="36" fill="#ffbb26" stroke="#d48f00" strokeWidth="3" />
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="32"
        fontWeight="700"
        fill="#d48f00"
      >
        $
      </text>
      <circle cx="36" cy="38" r="4" fill="#fff8e0" opacity="0.7" />
    </svg>
  );
}

export function PesoBlob({ className, ...rest }: IlloProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} {...rest} aria-hidden>
      <circle cx="50" cy="50" r="36" fill="#00ca48" stroke="#008f33" strokeWidth="3" />
      <text
        x="50"
        y="64"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui"
        fontSize="34"
        fontWeight="700"
        fill="#008f33"
      >
        ₱
      </text>
    </svg>
  );
}

export function ReceiptBlob({ className, ...rest }: IlloProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} {...rest} aria-hidden>
      <path
        d="M22 12 H78 V86 L70 80 L62 86 L54 80 L46 86 L38 80 L30 86 L22 80 Z"
        fill="#fbfaf9"
        stroke="#121212"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <line x1="32" y1="30" x2="68" y2="30" stroke="#848281" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="32" y1="40" x2="62" y2="40" stroke="#848281" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="32" y1="50" x2="68" y2="50" stroke="#848281" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="32" y1="60" x2="56" y2="60" stroke="#848281" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="68" cy="68" r="6" fill="#ff3e00" />
      <path d="M65 68 l2 2 4-4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

export function StarBlob({ className, ...rest }: IlloProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} {...rest} aria-hidden>
      <path
        d="M50 8 L60 38 L92 40 L66 60 L76 92 L50 72 L24 92 L34 60 L8 40 L40 38 Z"
        fill="#ffbb26"
        stroke="#d48f00"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeartBlob({ className, ...rest }: IlloProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} {...rest} aria-hidden>
      <path
        d="M50 86 C 14 60, 14 24, 38 24 C 46 24, 50 32, 50 32 C 50 32, 54 24, 62 24 C 86 24, 86 60, 50 86 Z"
        fill="#ff58ae"
        stroke="#c2387f"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChiliBlob({ className, ...rest }: IlloProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} {...rest} aria-hidden>
      <path
        d="M30 20 Q44 16 50 24 Q60 18 64 24 Q60 30 56 28 Q66 38 70 56 Q74 80 50 88 Q26 86 22 64 Q22 44 36 32 Q30 28 30 20 Z"
        fill="#ff3e00"
        stroke="#b32a00"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M44 26 q6 -10 16 -4" stroke="#00ca48" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="44" cy="58" r="2.4" fill="#fff" />
      <circle cx="58" cy="58" r="2.4" fill="#fff" />
      <path d="M46 66 q4 3 8 0" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function WaiterBlob({ className, ...rest }: IlloProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} {...rest} aria-hidden>
      {/* tray */}
      <ellipse cx="78" cy="34" rx="18" ry="4" fill="#0090ff" stroke="#0070cc" strokeWidth="2" />
      <rect x="74" y="26" width="8" height="8" rx="2" fill="#ffbb26" stroke="#d48f00" strokeWidth="2" />
      {/* body */}
      <path
        d="M50 22 Q66 22 70 42 L66 80 Q50 86 34 80 L30 42 Q34 22 50 22 Z"
        fill="#fbfaf9"
        stroke="#121212"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* bowtie */}
      <path d="M44 38 L50 42 L56 38 L56 46 L50 42 L44 46 Z" fill="#ff3e00" />
      {/* head */}
      <circle cx="50" cy="22" r="14" fill="#fbfaf9" stroke="#121212" strokeWidth="3" />
      {/* eyes */}
      <circle cx="45" cy="22" r="1.8" fill="#121212" />
      <circle cx="55" cy="22" r="1.8" fill="#121212" />
      <path d="M46 28 q4 3 8 0" stroke="#121212" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* hat */}
      <rect x="38" y="6" width="24" height="6" fill="#121212" />
      <rect x="42" y="2" width="16" height="6" fill="#121212" />
      {/* arm holding tray */}
      <path d="M66 50 Q78 44 80 36" stroke="#121212" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowBlob({ className, ...rest }: IlloProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} {...rest} aria-hidden>
      <path
        d="M14 50 Q40 18 80 40 L74 30 M80 40 L72 50"
        stroke="#0090ff"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SaltShakerBlob({ className, ...rest }: IlloProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} {...rest} aria-hidden>
      <rect x="34" y="28" width="32" height="50" rx="6" fill="#fbfaf9" stroke="#121212" strokeWidth="3" />
      <rect x="32" y="22" width="36" height="10" rx="3" fill="#ffbb26" stroke="#d48f00" strokeWidth="2.4" />
      <circle cx="42" cy="26" r="1.4" fill="#121212" />
      <circle cx="50" cy="26" r="1.4" fill="#121212" />
      <circle cx="58" cy="26" r="1.4" fill="#121212" />
      <text x="50" y="58" textAnchor="middle" fontSize="12" fontWeight="700" fill="#121212" fontFamily="ui-sans-serif">SAL</text>
      <circle cx="44" cy="68" r="1.6" fill="#121212" />
      <circle cx="56" cy="68" r="1.6" fill="#121212" />
      <path d="M46 74 q4 2 8 0" stroke="#121212" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </svg>
  );
}
