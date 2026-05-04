export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
    >
      <rect x="1" y="1" width="30" height="30" rx="9" fill="#121212" />
      {/* K formed by knife/fork stems */}
      <path
        d="M11 7v18"
        stroke="#fbfaf9"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Fork tine — orange accent */}
      <path
        d="M21 7l-9 9 9 9"
        stroke="#ff3e00"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="7" r="1.6" fill="#ffbb26" />
    </svg>
  );
}
