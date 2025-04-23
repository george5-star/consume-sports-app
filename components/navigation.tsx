'use client'

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const handleSignUp = () => {
    signIn('google', { 
      callbackUrl: '/',
      prompt: 'select_account'
    });
  };

  const handleLogin = () => {
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="flex justify-between items-center w-full">
      <div className="uppercase font-bold">
        <Link href="/" className="flex items-center hover:text-amber-200 transition-colors duration-300">consumesports</Link>
      </div>
      <div>
        <ul className="flex items-center gap-6">
          <Link href="/news" className="flex items-center cursor-pointer hover:text-amber-200 transition-colors duration-300">News</Link>
          <Link href="/football" className="flex items-center cursor-pointer hover:text-amber-200 transition-colors duration-300">Football</Link>
          <Link href="/basketball" className="flex items-center cursor-pointer hover:text-amber-200 transition-colors duration-300">Basketball</Link>
          <Link href="/tennis" className="flex items-center cursor-pointer hover:text-amber-200 transition-colors duration-300">Tennis</Link>
          <Link href="/ice-hockey" className="flex items-center cursor-pointer hover:text-amber-200 transition-colors duration-300">Ice Hockey</Link>
          <div className="relative group">
            <Link href="/tools" className="flex items-center cursor-pointer hover:text-amber-200 transition-colors duration-300">Tools</Link>
            <div className="absolute left-0 top-full mt-2 w-48 bg-white/10 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="py-2">
                <Link href="/tools/converter" className="block px-4 py-2 hover:bg-white/20 cursor-pointer transition-colors duration-300">Converter</Link>
                <Link href="/tools/predictions" className="block px-4 py-2 hover:bg-white/20 cursor-pointer transition-colors duration-300">Predictions</Link>
              </div>
            </div>
          </div>
        </ul>
      </div>
      <div className="flex items-center gap-4">
        {session ? (
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="bg-amber-200 px-4 py-2 text-black rounded-2xl flex items-center cursor-pointer hover:bg-amber-300 transition-colors duration-300 text-sm"
          >
            Sign Out
          </button>
        ) : (
          <>
            <button
              onClick={handleSignUp}
              className="bg-amber-200 px-4 py-2 text-black rounded-2xl flex items-center cursor-pointer hover:bg-amber-300 transition-colors duration-300 text-sm"
            >
              Sign Up
            </button>
            <button
              onClick={handleLogin}
              className="flex items-center cursor-pointer hover:text-amber-200 transition-colors duration-300 text-sm"
            >
              Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
