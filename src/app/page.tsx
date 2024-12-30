"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShoppingBag, Truck, Shield } from "lucide-react";
import { useRef } from "react";
import { getFeaturedProductsData, getHomepageData } from "@/lib/data";

const featuredProducts = getFeaturedProductsData();

const ShapesBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/10"
          style={{
            width: Math.random() * 300 + 50,
            height: Math.random() * 300 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const homepageData = getHomepageData();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Enhanced Hero Section */}
      <section 
        ref={targetRef}
        className="relative min-h-[90vh] overflow-hidden bg-gradient-to-b from-blue-950 via-blue-900 to-black"
      >
        <ShapesBackground />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/80 to-black/80 backdrop-blur-sm" />
        
        <motion.div 
          style={{ opacity, scale, y }}
          className="relative container mx-auto px-4 h-full flex flex-col md:flex-row items-center justify-between py-20"
        >
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2 text-white space-y-8 text-center md:text-left"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Descubra seu
              <span className="text-primary block">Estilo Único</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Explore nossa coleção exclusiva de produtos selecionados especialmente para você.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/produtos"
                  className="inline-flex items-center px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors group"
                >
                  Explorar Produtos
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/colecao"
                  className="inline-flex items-center px-8 py-4 rounded-full bg-white/10 text-white font-semibold hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  Ver Coleção
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div>
                <div className="text-3xl font-bold text-primary">50k+</div>
                <div className="text-sm text-gray-400">Clientes Felizes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-gray-400">Marcas Premium</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-gray-400">Suporte</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Floating Products */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:w-1/2 relative h-[500px] mt-12 md:mt-0"
          >
            <motion.div
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 right-0 w-64 h-64"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/products/product1.jpg"
                  alt="Featured Product"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              animate={{
                y: [0, 20, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-0 left-0 w-48 h-48"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/products/product2.jpg"
                  alt="Featured Product"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center"
        >
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-3 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-muted-foreground">
              Confira nossa seleção especial de produtos
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-card rounded-lg shadow-lg overflow-hidden"
              >
                <Link href={`/produtos/${product.slug}`} className="block">
                  <div className="relative h-64">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.isOffer && (
                      <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {Math.round(((product.price - (product.offerPrice || 0)) / product.price) * 100)}% OFF
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center mb-4">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
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
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 rounded-md bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
                      >
                        Ver Detalhes
                      </motion.button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/produtos"
              className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors group"
            >
              Ver Todos os Produtos
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Entrega Rápida",
                description: "Entrega em todo o Brasil",
                icon: "🚚",
              },
              {
                title: "Pagamento Seguro",
                description: "Diversas formas de pagamento",
                icon: "🔒",
              },
              {
                title: "Atendimento 24/7",
                description: "Suporte sempre disponível",
                icon: "💬",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center p-6 rounded-lg bg-background shadow-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
