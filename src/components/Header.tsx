"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="mt-4 mx-5 bg-gray-200 py-6 rounded-2xl">
      <div className="flex items-center justify-between px-6">
        <Image src="/conecta.png" alt="Logo" width={240} height={39} />

        <button
          className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <nav className={`hidden md:flex md:items-center md:gap-8 md:ml-auto`}>
          <Link href="/login">
            <Button className="bg-black text-white hover:cursor-pointer w-auto">
              Login
            </Button>
          </Link>
        </nav>
      </div>

      <nav
        className={`md:hidden px-6 overflow-hidden transition-[max-height] duration-300 ease-in-out bg-gray-200 rounded-b-2xl ${
          menuOpen ? "max-h-[80px]" : "max-h-0"
        }`}
      >
        <div className="flex justify-center py-4">
          <Link href="/login" onClick={() => setMenuOpen(false)}>
            <Button className="bg-black text-white w-full">Login</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
