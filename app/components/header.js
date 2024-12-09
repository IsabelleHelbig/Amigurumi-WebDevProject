"use client";

import Link from "next/link";
import { useUserAuth } from "../_utils/auth-context";

export default function Header() {
  const { user } = useUserAuth();
  return (
    <div className="flex items-center py-4 px-4 bg-slate-200 fixed top-0 left-0 w-full justify-between shadow-md z-10">
      {user ? (
        <div className="flex justify-center flex-grow ml-36">
          <img src="/icons/logo.png" className="w-28" alt="Logo" />
        </div>
      ) : (
        <div className="flex justify-center flex-grow ml-24">
          <img src="/icons/logo.png" className="w-28" alt="Logo" />
        </div>
      )}

      {/* Icons on the right */}
      <div className="flex space-x-5">
        {user ? (
          <Link href="/add-item">
            <img
              src="/icons/add.png"
              className="w-9 h-9 hover:scale-110 transition-transform duration-200"
              alt="Add"
            />
          </Link>
        ) : null}

        <Link href="/profile">
          <img
            src="/icons/user.png"
            className="w-9 h-9 hover:scale-110 transition-transform duration-200"
            alt="User"
          />
        </Link>
        <Link href="/">
          <img
            src="/icons/Home.png"
            className="w-9 h-9 hover:scale-110 transition-transform duration-200"
          />
        </Link>
      </div>
    </div>
  );
}
