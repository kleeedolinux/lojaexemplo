"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Star } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import type { Product } from "@/lib/data";

interface ProductDetailsProps {
  product: Product | undefined;
  relatedProducts: Product[];
}

export default function ProductDetails({ product, relatedProducts }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Link
            href="/produtos"
            className="text-primary hover:underline flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para produtos
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/produtos"
            className="text-muted-foreground hover:text-primary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para produtos
          </Link>
        </motion.div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.isOffer && (
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {Math.round(
                    ((product.price - (product.offerPrice || 0)) / product.price) * 100
                  )}% OFF
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-24 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Imagem ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.rating} estrelas
                </span>
              </div>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div className="space-y-2">
              {product.isOffer ? (
                <>
                  <div className="text-muted-foreground line-through">
                    R$ {product.price.toFixed(2)}
                  </div>
                  <div className="text-primary font-bold text-3xl">
                    R$ {product.offerPrice?.toFixed(2)}
                  </div>
                </>
              ) : (
                <div className="text-primary font-bold text-3xl">
                  R$ {product.price.toFixed(2)}
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                Em até 12x sem juros
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 rounded-md hover:bg-accent transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-medium text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 rounded-md hover:bg-accent transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="w-full py-3 px-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Adicionar ao Carrinho
            </motion.button>

            {/* Specifications */}
            <div className="space-y-4 pt-6 border-t">
              <h3 className="font-semibold text-lg">Especificações</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="text-sm text-muted-foreground capitalize">
                      {key}
                    </div>
                    <div className="font-medium">
                      {Array.isArray(value) ? value.join(", ") : value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <h2 className="text-2xl font-bold mb-8">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href={`/produtos/${relatedProduct.id}`}>
                    <div className="relative h-48">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {relatedProduct.isOffer && (
                        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {Math.round(
                            ((relatedProduct.price - (relatedProduct.offerPrice || 0)) /
                              relatedProduct.price) *
                              100
                          )}% OFF
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          {relatedProduct.isOffer ? (
                            <>
                              <span className="text-muted-foreground line-through text-sm">
                                R$ {relatedProduct.price.toFixed(2)}
                              </span>
                              <span className="text-primary font-bold text-lg ml-2">
                                R$ {relatedProduct.offerPrice?.toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span className="text-primary font-bold text-lg">
                              R$ {relatedProduct.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
