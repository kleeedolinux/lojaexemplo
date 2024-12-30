"use client";

import { motion } from "framer-motion";
import { getOfferProducts } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Timer } from "lucide-react";

export default function OffersPage() {
  const offers = getOfferProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ofertas</h1>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-blue-950 to-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/patterns/grid.png')",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Ofertas Imperdíveis
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Aproveite nossos melhores preços em produtos selecionados
            </p>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <Timer className="w-8 h-8 mb-2 mx-auto text-primary" />
                <p className="text-sm text-gray-300">Ofertas por tempo limitado</p>
              </div>
              <div className="text-center">
                <ShoppingBag className="w-8 h-8 mb-2 mx-auto text-primary" />
                <p className="text-sm text-gray-300">Frete grátis nas ofertas</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {offers.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Link href={`/produtos/${product.id}`}>
                  <div className="relative">
                    <div className="relative h-64">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {Math.round(((product.price - (product.offerPrice || 0)) / product.price) * 100)}% OFF
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="text-muted-foreground line-through">
                          R$ {product.price.toFixed(2)}
                        </div>
                        <div className="text-primary font-bold text-2xl">
                          R$ {product.offerPrice?.toFixed(2)}
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                      >
                        Comprar Agora
                      </motion.button>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          {[...Array(product.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 text-yellow-400 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                          ))}
                        </div>
                        <span>Frete Grátis</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">
              Não Perca Nenhuma Oferta!
            </h2>
            <p className="text-muted-foreground mb-8">
              Cadastre-se para receber nossas melhores ofertas em primeira mão
            </p>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 px-4 py-3 rounded-lg border border-input bg-background"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Cadastrar
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
