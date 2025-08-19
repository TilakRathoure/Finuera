"use client";
import React, { createContext, useEffect, useState } from "react";
import { Dashboard } from "./types";

export const DarkModeContext = createContext<{
  dark: boolean;
  setdark: React.Dispatch<React.SetStateAction<boolean>>;
  chat:boolean;
  setChat:React.Dispatch<React.SetStateAction<boolean>>;
  dashboard:Dashboard | null,
  setdashboard:React.Dispatch<React.SetStateAction<Dashboard | null>>;
}>({
  dark: false,
  setdark: () => {},
  chat: false,
  setChat:()=>{},
  dashboard:null,
  setdashboard:()=>{},
});

const DarkModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setdark] = useState(false);
  const [chat,setChat]=useState<boolean>(false);
  const [dashboard,setdashboard]=useState<Dashboard|null> (null);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <DarkModeContext.Provider value={{ dark, setdark,chat,setChat,dashboard,setdashboard }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
