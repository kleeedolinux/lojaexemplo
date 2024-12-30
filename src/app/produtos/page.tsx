"use client";

import { motion } from "framer-motion";
import { getAllProducts, getAllCategories } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export default function ProductsPage() {
  const allProducts = getAllProducts();
  const categories = getAllCategories();
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState("featured");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterProducts(value, selectedCategory, priceRange, sortBy);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterProducts(searchTerm, category, priceRange, sortBy);
  };

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
    filterProducts(searchTerm, selectedCategory, range, sortBy);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    filterProducts(searchTerm, selectedCategory, priceRange, sort);
  };

  const filterProducts = (
    search: string,
    category: string,
    price: [number, number],
    sort: string
  ) => {
    let filtered = allProducts;

    // Apply search filter
    if (search) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply category filter
    if (category) {
      filtered = filtered.filter((product) => product.category === category);
    }

    // Apply price filter
    filtered = filtered.filter(
      (product) => product.price >= price[0] && product.price <= price[1]
    );

    // Apply sorting
    switch (sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nossos Produtos
          </h1>
          <p className="text-muted-foreground text-lg">
            Explore nossa coleção completa de produtos
          </p>
        </motion.div>

        {/* Filters Section */}
        <div className="bg-card rounded-xl p-6 mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
              >
                <option value="">Todas Categorias</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="md:w-48">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
              >
                <option value="featured">Em Destaque</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="name">Nome A-Z</option>
                <option value="rating">Melhor Avaliados</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/produtos/${product.id}`}>
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {product.isOffer && (
                    <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-md text-sm font-semibold">
                      Oferta
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
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
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <SlidersHorizontal className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-muted-foreground">
              Tente ajustar seus filtros de busca
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
