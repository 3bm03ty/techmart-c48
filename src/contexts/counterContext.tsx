import apiServices from "@/services/apiServices";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";

export const counterContext = createContext({
  numOfCartItems: 0,
  setNumOfCartItems: (_count: number) => {},
});

export default function CounterContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session } = useSession();
  const token = session?.user.token;
  const [cartCount, setCartCount] = useState<{ token: string; count: number }>();
  const numOfCartItems = cartCount && cartCount.token === token ? cartCount.count : 0;

  useEffect(() => {
    if (!token) return;

    let active = true;
    apiServices.getUserCart(token).then(
      (cart) => {
        if (active) {
          setCartCount((current) =>
            current?.token === token ? current : { token, count: cart?.numOfCartItems ?? 0 },
          );
        }
      },
      () => {},
    );
    return () => {
      active = false;
    };
  }, [token]);

  function setNumOfCartItems(count: number) {
    if (token) setCartCount({ token, count });
  }

  return (
    <counterContext.Provider value={{ numOfCartItems, setNumOfCartItems }}>
      {children}
    </counterContext.Provider>
  );
}
