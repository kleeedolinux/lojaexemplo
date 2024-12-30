"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, User } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { CartButton } from "@/components/cart-button";
import { getNavigationItems } from "@/lib/data";
import { useState } from "react";

export function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();
  const navigation = getNavigationItems();

  return (
    <div className="bg-background">
      {/* Main Header */}
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            Loja Exemplo
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={pathname === item.path ? "text-primary" : ""}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative w-64">
              <input 
                type="search"
                placeholder="Buscar..."
                className="w-full pl-8 pr-4 py-1 rounded-full border"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <CartButton />
            <ThemeToggle />
            <Link href="/conta">
              <User className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-4">
            <CartButton />
            <button onClick={() => setShowMenu(!showMenu)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="lg:hidden border-t">
          <div className="max-w-[1400px] mx-auto px-4 py-4">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <input 
                type="search"
                placeholder="Buscar..."
                className="w-full pl-8 pr-4 py-1 rounded-full border"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setShowMenu(false)}
                  className={pathname === item.path ? "text-primary" : ""}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                href="/conta" 
                onClick={() => setShowMenu(false)}
                className="flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                Minha Conta
              </Link>
              <div className="pt-2">
                <ThemeToggle />
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
