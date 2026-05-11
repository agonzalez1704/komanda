import Image from "next/image";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/komanda-mascot.png"
      alt="Komanda mascot"
      width={64}
      height={64}
      priority
      className={className}
      style={{ borderRadius: "20%" }}
    />
  );
}
