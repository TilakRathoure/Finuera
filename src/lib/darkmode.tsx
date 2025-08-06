"use client";
import React, { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext<{
  dark: boolean;
  setdark: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  dark: false,
  setdark: () => {},
});

const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setdark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <DarkModeContext.Provider value={{ dark, setdark }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
