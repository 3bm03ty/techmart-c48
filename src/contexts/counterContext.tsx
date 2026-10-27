import apiServices from "@/services/apiServices";
import { createContext, ReactNode, useEffect, useState } from "react";

export const counterContext = createContext<any>(0);

export default function CounterContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  async function getUserCart() {
    const response = await apiServices.getUserCart();
    setNumOfCartItems(response.numOfCartItems);
  }

  useEffect(() => {
    getUserCart();
  }, []); 

  return (
    <counterContext.Provider value={{ numOfCartItems, setNumOfCartItems }}>
      {children}
    </counterContext.Provider>
  );
}
