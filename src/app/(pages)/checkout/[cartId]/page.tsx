"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useParams } from "next/navigation";
import apiServices from "@/services/apiServices";
export default function Checkout() {
  const [details, setDetails] = useState("6 tahreer st");
  const [phone, setPhone] = useState("01095536545");
  const [city, setCity] = useState("Dokki");

  const { cartId } = useParams();

  async function handleCheckout() {
    const response = await apiServices.checkout(cartId as string, {
      shippingAddress: {
        details,
        phone,
        city,
      },
    });

    // window.location.href = response.session.url;

    // location.
    open(response.session.url, "_self");
  }

  return (
    <div className="py-10">
      <div className="container max-w-2xl grid gap-6">
        <h1 className="text-3xl font-bold">Shipping Address</h1>
        <Input
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Details"
        />
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
        />
        <Button onClick={handleCheckout}>Checkout</Button>
      </div>
    </div>
  );
}
