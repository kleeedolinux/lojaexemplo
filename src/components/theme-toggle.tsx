import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-accent"
    >
      <Sun className="h-5 w-5 absolute transition-all dark:opacity-0 dark:scale-0 dark:rotate-90" />
      <Moon className="h-5 w-5 absolute transition-all opacity-0 scale-0 rotate-90 dark:opacity-100 dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </motion.button>
  );
}
