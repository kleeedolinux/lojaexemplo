import { getProductById, getRelatedProducts } from "@/lib/data";
import ProductDetails from "./ProductDetails";

type Props = {
  params: Promise<{ id: string }>;
}

export default async function ProductPage(props: Props) {
  const { id } = await props.params;
  const product = await getProductById(id);
  const relatedProducts = await getRelatedProducts(id);

  if (!product) {
    return <div>Produto não encontrado</div>;
  }

  return <ProductDetails product={product} relatedProducts={relatedProducts} />;
}
