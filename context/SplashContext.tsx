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
  const [isRevealed, setRevealed] = useState(false);
  return (
    <SplashContext.Provider value={{ isRevealed, setRevealed }}>
      {children}
    </SplashContext.Provider>
  );
}
