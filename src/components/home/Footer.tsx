"use client";

import Link from "next/link";
import React from "react";

const foot:{title:string, link:string}[]=[{title:"Features",link:"#feature"},{title:"Github",link:"#github"},{title:"Privacy",link:"#feature"}]

const Footer = () => {
  return (
    <div className="flex h-[20vh] flex-col justify-center items-center text-sm font-light">
      <ul>
        <li className="w-full text-center text-lg font-bold">
          Finuera<span className="text-blue-500">AI</span>
        </li>
        <ul className="flex justify-center gap-2">{foot.map((e,i)=>(<li key={i}>
            <Link href={e.link}>
             {e.title}
            </Link>
        </li>))}
        </ul>
        <li>© FinueraAI. All rights reserved.</li>
      </ul>
    </div>
  );
};

export default Footer;
