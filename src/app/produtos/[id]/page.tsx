import { getProductById, getRelatedProducts } from "@/lib/data";
import ProductDetails from "./ProductDetails";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await Promise.resolve(getProductById(params.id));
  
  return {
    title: product ? `${product.name} - Loja Exemplo` : "Produto não encontrado",
    description: product?.description || "Produto não encontrado em nossa loja",
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await Promise.resolve(getProductById(params.id));
  const relatedProducts = await Promise.resolve(getRelatedProducts(params.id));

  return <ProductDetails product={product} relatedProducts={relatedProducts} />;
}
