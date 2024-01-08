"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  saveShippingAddress,
  type ShippingAddressForm,
} from "@/redux/slices/cartSlice";
import CheckoutWizard from "@/components/CheckoutWizard";

export default function ShippingAddressPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<ShippingAddressForm>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { shippingAddress } = useAppSelector((state) => state.cart);

  useEffect(() => {
    const formLabels = ["fullName", "address", "city", "postalCode", "country"];
    formLabels.forEach((name: string) => {
      setValue(name, shippingAddress[name]);
    });
  }, [setValue, shippingAddress]);

  const submitHandler = ({
    fullName,
    address,
    city,
    postalCode,
    country,
  }: ShippingAddressForm) => {
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );

    router.push("/payment");
  };

  return (
    <div>
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            className="w-full"
            id="fullName"
            autoFocus
            {...register("fullName", { required: "Please enter field" })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName?.message}</div>
          )}
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="w-full"
            id="address"
            autoFocus
            {...register("address", {
              required: "Please enter field",
              minLength: {
                value: 3,
                message: "Address is more than 2 chars",
              },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address?.message}</div>
          )}
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="w-full"
            id="city"
            autoFocus
            {...register("city", { required: "Please enter field" })}
          />
          {errors.city && (
            <div className="text-red-500">{errors.city?.message}</div>
          )}
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            className="w-full"
            id="postalCode"
            autoFocus
            {...register("postalCode", { required: "Please enter field" })}
          />
          {errors.postalCode && (
            <div className="text-red-500">{errors.postalCode?.message}</div>
          )}
          <label htmlFor="country">Country</label>
          <input
            type="text"
            className="w-full"
            id="country"
            autoFocus
            {...register("country", { required: "Please enter field" })}
          />
          {errors.country && (
            <div className="text-red-500">{errors.country?.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="btn btn--primary">Next</button>
        </div>
      </form>
    </div>
  );
}
