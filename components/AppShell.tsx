"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";

type Props = {
  children: React.ReactNode;
  /** Async server Footer passed from root layout (cannot import inside a client component). */
  footer: React.ReactNode;
};

const AppShell = ({ children, footer }: Props) => {
  const pathname = usePathname();

  if (pathname.startsWith("/paper")) {
    return <>{children}</>;
  }

  return (
    <div className="site-layout">
      <Header />
      {children}
      {footer}
    </div>
  );
};

export default AppShell;
