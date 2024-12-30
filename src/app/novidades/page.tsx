"use client";

import { motion } from "framer-motion";
import { getNewArrivalsData, getNewArrivalProducts } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

export default function NewArrivalsPage() {
  const newArrivalsData = getNewArrivalsData();
  const newProducts = getNewArrivalProducts();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={newArrivalsData.banner.image}
            alt="Novidades"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-full container mx-auto px-4 flex flex-col items-center justify-center text-center text-white"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {newArrivalsData.banner.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            {newArrivalsData.banner.subtitle}
          </p>
        </motion.div>
      </section>

      {/* New Arrivals Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-card rounded-xl shadow-lg overflow-hidden"
              >
                <Link href={`/produtos/${product.slug}`} className="block">
                  <div className="relative h-72">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {newArrivalsData.newArrivalBadge.text}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        {[...Array(product.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                      <span className="text-muted-foreground ml-2">
                        {product.rating} estrelas
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        {product.isOffer ? (
                          <div>
                            <span className="text-muted-foreground line-through text-sm">
                              R$ {product.price.toFixed(2)}
                            </span>
                            <span className="text-primary font-bold text-lg ml-2">
                              R$ {product.offerPrice?.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-primary font-bold text-lg">
                            R$ {product.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center text-primary font-semibold"
                      >
                        Ver Detalhes
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 bg-card rounded-2xl p-8 md:p-12"
          >
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Fique por dentro das novidades
              </h2>
              <p className="text-muted-foreground mb-8">
                Cadastre-se para receber em primeira mão as últimas novidades e
                ofertas exclusivas da nossa loja.
              </p>
              <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  className="flex-1 px-4 py-3 rounded-lg bg-background border border-input focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
                >
                  Cadastrar
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
