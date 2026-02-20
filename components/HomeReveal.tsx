"use client";

import { motion } from "framer-motion";
import { useSplash } from "@/context/SplashContext";
import { usePathname } from "next/navigation";

export default function HomeReveal({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isRevealed } = useSplash();
  const isHome = pathname === "/";

  if (!isHome) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isRevealed ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="min-h-0"
    >
      {children}
    </motion.div>
  );
}
