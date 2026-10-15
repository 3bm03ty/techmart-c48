import { Loader2 } from "lucide-react";
import React from "react";

export default function LoadingScreen() {
  return (
    <div className="py-60 text-center">
      <Loader2 className="mx-auto animate-spin" />
    </div>
  );
}
