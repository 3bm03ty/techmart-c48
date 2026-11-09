import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import { formatDate, formatPrice } from "@/lib/utils";
import apiServices from "@/services/apiServices";
import type { Order } from "@/types/response";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

function OrderCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Order #{order.id}</h2>
          <CardDescription>
            Placed on{" "}
            <time dateTime={order.createdAt}>{formatDate(order.createdAt)}</time>
          </CardDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant={order.isPaid ? "default" : "secondary"}>
            {order.isPaid ? "Paid" : "Unpaid"}
          </Badge>
          <Badge variant={order.isDelivered ? "default" : "secondary"}>
            {order.isDelivered ? "Delivered" : "Awaiting delivery"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="divide-y border-y">
          {order.cartItems.map((item) => (
            <li key={item._id} className="flex justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="font-medium">
                  {item.product?.title ?? "Unavailable product"}
                </p>
                <p className="text-muted-foreground">Quantity {item.count}</p>
              </div>
              <span className="shrink-0 tabular-nums">
                {formatPrice(item.price * item.count)}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex-wrap justify-between gap-2">
        <span className="capitalize text-muted-foreground">
          {order.paymentMethodType} payment
        </span>
        <span className="font-semibold tabular-nums">
          Total {formatPrice(order.totalOrderPrice)}
        </span>
      </CardFooter>
    </Card>
  );
}

export default async function Orders() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/auth/signin");
  }

  const orders = session.user.token
    ? await apiServices.getUserOrders(session.user.token).catch(() => undefined)
    : null;
  const message =
    orders === null
      ? "Your session has expired. Sign out and sign in again to view your orders."
      : "We couldn't load your orders. Refresh the page to try again.";

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6 sm:py-12">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
        <p className="text-muted-foreground">View your order history and delivery status.</p>
      </header>

      {orders == null ? (
        <Card role="alert">
          <CardContent>{message}</CardContent>
        </Card>
      ) : orders.length === 0 ? (
        <Card>
          <CardContent className="space-y-2 py-6 text-center">
            <h2 className="text-lg font-semibold">No orders yet</h2>
            <Link href="/products" className="font-medium underline underline-offset-4">
              Browse products
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders
            .toSorted((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
            .map((order) => <OrderCard key={order._id} order={order} />)}
        </div>
      )}
    </main>
  );
}
