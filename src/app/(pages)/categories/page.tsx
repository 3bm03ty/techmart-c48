"use client";

import { ProductCard } from "@/components/product/ProductCard";
import { getAllProducts } from "@/redux/slices/productsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Categories() {
  const { products } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

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
