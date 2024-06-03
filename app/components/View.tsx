"use client";

import { MutableRefObject, createContext, useRef } from "react";
import Script from "next/script";

import { setDarkMode } from "./utils";

export const AppearanceContext = createContext<any>(null);

function View({ children }: { children: React.ReactNode }) {
  const appearanceContextRef = useRef({
    isAppearanceScrollListenerRunning: false,
    yUnhideAppearanceDropdown: 0,
  });

  return (
    <>
      <AppearanceContext.Provider value={appearanceContextRef}>
        {children}
      </AppearanceContext.Provider>
    </>
  );
}

export default View;
