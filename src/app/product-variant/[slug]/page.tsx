import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { productVariantTable, productTable } from "@/db/schema";
import Image from "next/image";
import { formatCentsToBRL } from "@/helpers/money";
import { Button } from "@/components/ui/button";
import ProductList from "@/components/common/product-list";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;

  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      {/* Imagem */}
      <Image
        src={productVariant.imageUrl}
        alt={productVariant.name}
        sizes="100vw"
        width={0}
        height={0}
        className="h-auto w-full rounded-3xl"
      />
      {/* Variantes */}
      <div className="px-5">
        <VariantSelector
          selectedVariantSlug={productVariant.slug}
          variants={productVariant.product.variants}
        />
      </div>
      <div className="px-5">
        {/* descricao */}
        <h2 className="text-lg font-semibold">{productVariant.product.name}</h2>
        <h3 className="text-muted-foreground text-sm">{productVariant.name}</h3>
        <h3 className="text-lg font-semibold">
          {formatCentsToBRL(productVariant.priceInCents)}
        </h3>
      </div>

      <div className="PX-5"></div>
      <div className="flex flex-col space-y-4 px-5">
        {/* comprar */}
        <Button className="rounded-full" size="lg" variant="outline">
          Adicionar à sacola
        </Button>
        <Button className="rounded-full" size="lg">
          Comprar agora
        </Button>
      </div>

      <div className="px-5">
        <p className="text-sm">{productVariant.product.description}</p>
      </div>

      <ProductList title="Produtos relacionados" products={likelyProducts} />
    </div>
  );
};

export default ProductVariantPage;
