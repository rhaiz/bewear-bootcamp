import { Button } from "@/components/ui/button";
import Header from "@/components/common/header";
import Image from "next/image";
import { db } from "@/db";
import ProductList from "@/components/common/product-list";
import CategorySelector from "@/components/common/category-selector";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany({});

  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: (table, { desc }) => [desc(table.createdAt)],
    limit: 10,
    with: {
      variants: true,
    },
  });

  return (
    <div className="space-y-6">
      <div className="px-5">
        <Image
          src="/banner-01.png"
          alt="Leve uma vida com estilo"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>
      <ProductList products={products} title="Mais vendidos" />
      <CategorySelector categories={categories} />

      <div className="px-5">
        <Image
          src="/banner-02.png"
          alt="Seja autêntico"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>

      <ProductList products={newlyCreatedProducts} title="Novos produtos" />
    </div>
  );
};

export default Home;
