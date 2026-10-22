import apiServices from "@/services/apiServices";
import ProductGallery from "@/components/product/ProductGallery";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, ChevronRight, Package, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartBtn from "@/components/product/AddToCartBtn";

interface ProductDetailsProps {
  params: Promise<{ productId: string }>;
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
  const productDetails = await params.then(async ({ productId }) => {
    const { data } = await apiServices.getProductDetails(productId);
    return data;
  });

  if (!productDetails) notFound();

  const inStock = productDetails.quantity > 0;

  return (
    <main className="container flex-1 px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
      >
        <Link
          href="/products"
          className="rounded-sm hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Products
        </Link>
        <ChevronRight aria-hidden="true" className="size-3.5" />
        <span>{productDetails.category.name}</span>
        <ChevronRight aria-hidden="true" className="size-3.5" />
        <span aria-current="page" className="min-w-0 truncate text-foreground">
          {productDetails.title}
        </span>
      </nav>

      <div className="grid items-start gap-10 lg:grid-cols-5 lg:gap-16">
        <div className="col-span-2">
          <ProductGallery
            key={productDetails._id}
            title={productDetails.title}
            imageCover={productDetails.imageCover}
            images={productDetails.images}
          />
        </div>

        <section
          aria-labelledby="product-title"
          className="min-w-0 lg:py-4 col-span-3"
        >
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold tracking-wide text-foreground">
              {productDetails.category.name}
            </span>
            <span className="text-sm text-muted-foreground">
              By {productDetails.brand.name}
            </span>
          </div>
          <h1
            id="product-title"
            className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
          >
            {productDetails.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <Star
                aria-hidden="true"
                className="size-4 fill-amber-500 text-amber-500"
              />
              <span className="font-semibold">
                {productDetails.ratingsAverage.toFixed(1)}
                <span className="font-normal text-muted-foreground"> / 5</span>
              </span>
            </span>
            <span className="text-muted-foreground">
              {productDetails.ratingsQuantity.toLocaleString("en-US")} ratings
            </span>
            <span className="border-l pl-4 text-muted-foreground">
              {productDetails.sold.toLocaleString("en-US")} sold
            </span>
          </div>

          <div className="my-8 rounded-2xl border bg-muted/40 p-6">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Price
            </p>
            <p className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              {formatPrice(productDetails.price)}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
              <span
                className={`size-2 rounded-full ${inStock ? "bg-emerald-600" : "bg-muted-foreground"}`}
                aria-hidden="true"
              />
              <span className="font-medium">
                {inStock ? "In stock" : "Out of stock"}
              </span>
              {inStock && (
                <span className="text-muted-foreground">
                  · {productDetails.quantity.toLocaleString("en-US")} available
                </span>
              )}
            </div>
          </div>

          <h2 className="text-lg font-semibold">About this product</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
            {productDetails.description ||
              "No description available for this product."}
          </p>

          <div className="mt-8 border-t pt-6">
            <h2 className="flex items-center gap-2 text-sm font-semibold">
              <Package aria-hidden="true" className="size-4" />
              Product details
            </h2>
            <dl className="mt-4 divide-y text-sm">
              {[
                ["Brand", productDetails.brand.name],
                ["Category", productDetails.category.name],
                [
                  "Subcategory",
                  productDetails.subcategory
                    .map((item) => item.name)
                    .join(", "),
                ],
              ]
                .filter(([, value]) => value)
                .map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[6rem_1fr] gap-4 py-3"
                  >
                    <dt className="text-muted-foreground">{label}</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ))}
            </dl>
          </div>
          <div className="mt-8">
            <AddToCartBtn productId={productDetails._id} />
          </div>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Continue shopping
          </Link>
        </section>
      </div>
    </main>
  );
}
