"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-primary-black text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          ASTUDIO Practical Assessment
        </Link>
        <div className="flex gap-6">
          <Link
            href="/users"
            className={`hover:text-primary-yellow transition-colors ${
              pathname === "/users" ? "text-primary-yellow" : ""
            }`}
          >
            Users
          </Link>
          <Link
            href="/products"
            className={`hover:text-primary-yellow transition-colors ${
              pathname === "/products" ? "text-primary-yellow" : ""
            }`}
          >
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
}
