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

const formRules = [
  {
    name: "fullName",
    label: "Full Name",
    rule: { required: "Please enter field" },
  },
  {
    name: "address",
    label: "Address",
    rule: {
      required: "Please enter field",
      minLength: {
        value: 3,
        message: "Address is more than 2 chars",
      },
    },
  },
  {
    name: "city",
    label: "City",
    rule: { required: "Please enter field" },
  },
  {
    name: "postalCode",
    label: "Postal Code",
    rule: { required: "Please enter field" },
  },
  {
    name: "country",
    label: "Country",
    rule: { required: "Please enter field" },
  },
];

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
    formRules
      .map((item) => item.name)
      .forEach((name: string) => {
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
          {formRules.map((item) => (
            <div key={item.name} className="form-item">
              <label htmlFor={item.name}>{item.label}</label>
              <input
                type="text"
                className="w-full"
                id={item.name}
                autoFocus
                {...register(item.name, item.rule)}
              />
              <p className="error">{errors[item.name]?.message}</p>
            </div>
          ))}
        </div>
        <div className="">
          <button className="btn btn--primary">Next</button>
        </div>
      </form>
    </div>
  );
}
