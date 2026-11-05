"use client";

import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../ui/button";
import { decrement, increment, incrementByAmount } from "@/redux/slices/counterSlice";

export default function CounterWrapper() {
  const { count } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch()

  return (
    <>
      <h1 className="my-10">{count}</h1>
      <Button onClick={() => dispatch(increment()) }>Increment</Button>
      <Button onClick={() => dispatch(decrement()) }>Decrement</Button>
      <Button onClick={() => dispatch(incrementByAmount(5)) }>Increment By Amount</Button>
    </>
  );
}
