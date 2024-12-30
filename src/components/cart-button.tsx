"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/cart-context";
import Link from "next/link";
import { motion } from "framer-motion";

export function CartButton() {
  const { totalItems } = useCart();

  return (
    <Link href="/carrinho">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-2 rounded-full hover:bg-accent transition-colors"
      >
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
          >
            {totalItems}
          </motion.div>
        )}
      </motion.div>
    </Link>
  );
}
