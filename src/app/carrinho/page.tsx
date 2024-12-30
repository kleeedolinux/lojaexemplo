"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const shipping = subtotal > 199 ? 0 : 19.90;
  const total = subtotal + shipping;

  const handleCheckout = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    // Here you would typically redirect to checkout
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-bold">Seu carrinho está vazio</h1>
              <p className="text-muted-foreground">
                Parece que você ainda não adicionou nenhum produto ao carrinho.
              </p>
              <Link
                href="/produtos"
                className="inline-flex items-center text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continuar comprando
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Carrinho de Compras</h1>
            <span className="text-muted-foreground">
              {totalItems} {totalItems === 1 ? "item" : "itens"}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-card rounded-xl p-6 shadow-lg"
                >
                  <div className="flex gap-6">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold">{item.product.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.product.shortDescription}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1 rounded-md hover:bg-accent transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-medium">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 rounded-md hover:bg-accent transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="text-right">
                          {item.product.isOffer ? (
                            <>
                              <div className="text-muted-foreground line-through text-sm">
                                R$ {item.product.price.toFixed(2)}
                              </div>
                              <div className="text-primary font-bold">
                                R${" "}
                                {(
                                  (item.product.offerPrice || item.product.price) *
                                  item.quantity
                                ).toFixed(2)}
                              </div>
                            </>
                          ) : (
                            <div className="text-primary font-bold">
                              R$ {(item.product.price * item.quantity).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl p-6 shadow-lg sticky top-6"
              >
                <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Frete</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-500">Grátis</span>
                      ) : (
                        `R$ ${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <div className="text-sm text-muted-foreground">
                      Falta R$ {(199 - subtotal).toFixed(2)} para frete grátis
                    </div>
                  )}
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>R$ {total.toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Em até 12x sem juros
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-primary text-white rounded-lg font-semibold mt-6 hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Processando..." : "Finalizar Compra"}
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
