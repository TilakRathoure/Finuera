"use client";

import React, { useContext, useState } from "react";
import { Menu, Moon, Sun, User, X } from "lucide-react";
import { DarkModeContext } from "@/lib/darkmode";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Side {
  title: string;
  link: string;
}

const Header = () => {
  const moveto = (link: string) => {
    setside(false);
    redirect(link);
  };

  const [side, setside] = useState<boolean>(false);

  const sidebar: Side[] = [
    { title: "Features", link: "/#features" },
    { title: "Technology", link: "/#technology" },
    { title: "Pricing", link: "/price" },
    { title: "Log In", link: "/login" },
  ];

  const { dark, setdark } = useContext(DarkModeContext);

  return (
    <div className="fixed z-30 w-full bg-white dark:bg-black border-b-2">
      <div className="mx-auto h-[10vh] px-5 max-w-[80rem] flex justify-between">
        <div className="text-2xl flex justify-center items-center font-bold">
          <Link href={"/"}>
            Finu<span className="text-blue-500">era</span>
          </Link>
        </div>
        <ul className="flex items-center gap-4">
          <ul className="hidden sm:flex gap-3">
            {sidebar.map((e, i) => (
                <li key={i} onClick={() => {
                    moveto( e.link);
                  }}
                  className="cursor-pointer"
                >
                  {e.title}
                </li>
            ))}
          </ul>

          <li>
            <User
              className="bg-slate-300 dark:bg-slate-800 rounded-full p-2"
              size={35}
            />
          </li>
          <li
            className="cursor-pointer"
            onClick={() => {
              setdark((prev) => !prev);
            }}
          >
            {dark ? <Sun /> : <Moon className="" />}
          </li>
          <li className="cursor-pointer sm:hidden">
            <Menu
              onClick={() => {
                setside((prev) => !prev);
              }}
            />
          </li>
        </ul>
      </div>

      <ul
        className={`z-40 fixed ${
          side ? "right-0" : "-right-[100%]"
        } transition-all h-screen`}
      >
        <div className="bg-white dark:bg-black h-[100vh] w-[50vw] text-xl flex flex-col gap-2 p-4 justify-start pt-[120px] items-center">
          <X
            className="absolute top-5 right-5 cursor-pointer"
            onClick={() => {
              setside((prev) => !prev);
            }}
            size={30}
          />
          {sidebar.map((e, i) => (
              <li key={i} className="cursor-pointer" onClick={()=>moveto(e.link)}>{e.title}</li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Header;
