import { ProductCard } from "@/components/product/ProductCard";
import apiServices from "@/services/apiServices";

export default async function Products() {
  const products = (await apiServices.getProducts()).data;

  return (
    <div className="container">
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard {...product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
