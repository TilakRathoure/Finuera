"use client";
import React, { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext<{
  dark: boolean;
  setdark: React.Dispatch<React.SetStateAction<boolean>>;
  chat:boolean;
  setChat:React.Dispatch<React.SetStateAction<boolean>>;
}>({
  dark: false,
  setdark: () => {},
  chat: false,
  setChat:()=>{},
});

const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setdark] = useState(false);
  const [chat,setChat]=useState<boolean>(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <DarkModeContext.Provider value={{ dark, setdark,chat,setChat }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
