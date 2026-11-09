"use client";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { toast } from "../ui/toast";
import apiServices from "@/services/apiServices";
import { counterContext } from "@/contexts/counterContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddToCartBtn({ productId }: { productId: string }) {
  const [IsAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const { setNumOfCartItems } = useContext(counterContext);
  const { data: session, status } = useSession();
  const router = useRouter();

  async function addProductToCart() {
    const token = session?.user.token;
    if (!token) {
      if (status === "unauthenticated") router.push("/auth/signin");
      else toast.add({ title: "Sign in again to add items to your cart.", type: "error" });
      return;
    }

    setIsAddingToCart(true);
    try {
      const response = await apiServices.addProductToCart(productId, token);
      setNumOfCartItems(response.numOfCartItems);
      toast.add({
        title: response.status ?? response.statusMsg,
        description: response.message,
        type: "success",
      });
    } catch (error) {
      toast.add({
        title: error instanceof Error ? error.message : "Could not add this item to your cart.",
        type: "error",
      });
    } finally {
      setIsAddingToCart(false);
    }
  }

  return (
    <Button onClick={addProductToCart} disabled={status === "loading" || IsAddingToCart} className="w-full shrink">
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
