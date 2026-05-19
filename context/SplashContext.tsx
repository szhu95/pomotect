"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

type SplashContextType = {
  isRevealed: boolean;
  setRevealed: (value: boolean) => void;
};

const SplashContext = createContext<SplashContextType | undefined>(undefined);

export function useSplash() {
  const ctx = useContext(SplashContext);
  if (!ctx) throw new Error("useSplash must be used within SplashProvider");
  return ctx;
}

export function SplashProvider({ children }: { children: ReactNode }) {
  // Default true so content is visible until SplashScreen explicitly hides it on first home visit
  const [isRevealed, setRevealed] = useState(true);
  return (
    <SplashContext.Provider value={{ isRevealed, setRevealed }}>
      {children}
    </SplashContext.Provider>
  );
}
