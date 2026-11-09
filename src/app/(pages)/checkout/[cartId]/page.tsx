"use client";

import AddressBook from "@/components/addresses/AddressBook";
import { useParams } from "next/navigation";

export default function Checkout() {
  const { cartId } = useParams<{ cartId: string }>();
  return <AddressBook cartId={cartId} />;
}
