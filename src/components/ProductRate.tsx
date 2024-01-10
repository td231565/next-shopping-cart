"use client";

import "@smastrom/react-rating/style.css";
import { Rating } from "@smastrom/react-rating";

interface Rate {
  rate: number;
  count: number;
  align?: "center" | "left" | "right";
}

export default function ProductRate({ rate, count, align = "center" }: Rate) {
  return (
    <div className={`text-${align}`}>
      <div className="flex items-center">
        <Rating style={{ maxWidth: 100 }} value={rate} readOnly />
        <p className="ml-1 text-orange-800">{rate}</p>
      </div>
      <p className="text-sm">
        <span>{count}</span>
        <span className="text-gray-600 ml-1">reviews</span>
      </p>
    </div>
  );
}
