"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Sobre Nós</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/sobre" className="text-muted-foreground hover:text-primary transition-colors">
                    Nossa História
                  </Link>
                </li>
                <li>
                  <Link href="/trabalhe-conosco" className="text-muted-foreground hover:text-primary transition-colors">
                    Trabalhe Conosco
                  </Link>
                </li>
                <li>
                  <Link href="/sustentabilidade" className="text-muted-foreground hover:text-primary transition-colors">
                    Sustentabilidade
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Ajuda</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/entrega" className="text-muted-foreground hover:text-primary transition-colors">
                    Política de Entrega
                  </Link>
                </li>
                <li>
                  <Link href="/devolucao" className="text-muted-foreground hover:text-primary transition-colors">
                    Trocas e Devoluções
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Contato</h3>
              <ul className="space-y-2">
                <li className="text-muted-foreground">
                  Email: contato@lojaexemplo.com.br
                </li>
                <li className="text-muted-foreground">
                  Tel: (11) 1234-5678
                </li>
                <li className="text-muted-foreground">
                  WhatsApp: (11) 98765-4321
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Redes Sociais</h3>
              <div className="flex space-x-4">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-6 w-6" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Facebook className="h-6 w-6" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-6 w-6" />
                </motion.a>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-primary">Newsletter</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Receba nossas novidades e promoções
                </p>
                <form className="mt-2 flex">
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    className="flex-1 rounded-l-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    className="rounded-r-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Assinar
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="border-t border-gray-200 py-8">
          <p className="text-center text-sm text-muted-foreground">
            {new Date().getFullYear()} Loja Exemplo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
