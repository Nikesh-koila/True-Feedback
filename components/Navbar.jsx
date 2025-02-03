"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const url = window.location.pathname;

  return (
    <nav className="p-4 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className="text-3xl font-bold mb-4 md:mb-0">
          True Feedback
        </a>
        {session ? (
          <>
            <div className="w-full md:w-auto md:gap-10 flex justify-between items-center">
              <span className=" text-lg font-bold ">
                Welcome, {user.userName}
              </span>
              <Button
                className="w-auto  bg-slate-100 text-black"
                variant="outline"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </div>
          </>
        ) : (
          <Link href={"/sign-in"}>
            <Button
              className="w-full md:w-auto bg-slate-100 text-black"
              variant="outline"
            >
              {url.startsWith("/u") ? "Get your message board" : "Login"}
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
