import CartContents from "@/components/cart/CartContents";
import { authOptions } from "@/lib/auth";
import apiServices from "@/services/apiServices";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Cart() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/auth/signin");

  if (!session.user.token) {
    return <CartContents cartResponse={null} error="Sign in again to view your cart." />;
  }

  const response = await apiServices.getUserCart(session.user.token).catch(() => undefined);
  if (response === undefined) {
    return (
      <CartContents
        cartResponse={null}
        error="We couldn't load your cart. Please try again."
      />
    );
  }

  return <CartContents key={response?.data?._id ?? "empty"} cartResponse={response} />;
}
