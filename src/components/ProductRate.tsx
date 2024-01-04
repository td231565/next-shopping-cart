"use client";

import "@smastrom/react-rating/style.css";
import { Rating } from "@smastrom/react-rating";

interface Rate {
  rate: number;
  count: number;
}

export default function ProductRate({ rate, count }: Rate) {
  return (
    <div className="flex">
      <Rating style={{ maxWidth: 100 }} value={rate} readOnly />
      <span>{count} reviews</span>
    </div>
  );
}
