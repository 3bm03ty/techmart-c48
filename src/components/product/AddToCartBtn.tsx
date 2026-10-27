"use client";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { toast } from "../ui/toast";
import apiServices from "@/services/apiServices";
import { counterContext } from "@/contexts/counterContext";

export default function AddToCartBtn({ productId }: { productId: string }) {
  const [IsAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const { setNumOfCartItems } = useContext(counterContext);

  async function addProductToCart() {
    setIsAddingToCart(true);
    try {
      const response = await apiServices.addProductToCart(productId);
      console.log(response.numOfCartItems);
      
      setNumOfCartItems(response.numOfCartItems);
      toast.add({
        title: response.status ?? response.statusMsg,
        description: response.message,
        type: "success",
      });
      setIsAddingToCart(false);
    } catch (error: any) {
      toast.add({
        title: error.message,
        type: "error",
      });
      setIsAddingToCart(false);
    }
  }

  return (
    <Button onClick={addProductToCart} className="w-full shrink">
      {IsAddingToCart ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Adding...
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
