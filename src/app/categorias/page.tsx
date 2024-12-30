"use client";

import { motion } from "framer-motion";
import { getAllCategories, getProductsByCategory } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CategoriesPage() {
  const categories = getAllCategories();
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const products = getProductsByCategory(selectedCategory);

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nossas Categorias
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore nossa seleção de produtos por categoria
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={item}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`cursor-pointer group ${
                selectedCategory === category.id
                  ? "ring-2 ring-primary"
                  : "hover:ring-2 hover:ring-primary/50"
              } rounded-xl overflow-hidden transition-all duration-300`}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-200">
                    {category.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-6">
            Produtos em {categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className="bg-card rounded-xl overflow-hidden shadow-lg"
              >
                <Link href={`/produtos/${product.id}`}>
                  <div className="relative h-48">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                    {product.isOffer && (
                      <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-md text-sm font-semibold">
                        Oferta
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      {product.description.substring(0, 100)}...
                    </p>
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
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
