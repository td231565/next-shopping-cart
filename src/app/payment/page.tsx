"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  savePaymentMethod,
  type PaymentMethodForm,
} from "@/redux/slices/cartSlice";
import CheckoutWizard from "@/components/CheckoutWizard";

export default function ShippingAddressPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<PaymentMethodForm>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { shippingAddress, paymentMethod } = useAppSelector(
    (state) => state.cart
  );
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setValue("paymentMethod", paymentMethod);
  }, [paymentMethod, router, setValue, shippingAddress]);

  const changePaymentMethodHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value;
    dispatch(savePaymentMethod(val));
    setErrMsg(val ? "" : "Please select payment method");
  };

  const submitHandler = async ({
    paymentMethod,
  }: {
    paymentMethod: string;
  }) => {
    // await dispatch(savePaymentMethod(paymentMethod));
    setErrMsg(paymentMethod ? "" : "Please select payment method");
    if (paymentMethod) {
      router.push("/placeorder");
    }
  };

  return (
    <div>
      <CheckoutWizard activeStep={2} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Payment Method</h1>

        {["PayPal", "Stripe", "CashOnDelivery"].map((payment) => (
          <div key={payment} className="mb-1 flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              value={payment}
              onChange={changePaymentMethodHandler}
              checked={payment === paymentMethod}
              // {...register("paymentMethod", {
              //   required: "Please select payment method",
              // })}
            />
            <label htmlFor={payment} className="p-2">
              {payment}
            </label>
          </div>
        ))}
        <p className="text-red-500 h-5">{errMsg}</p>

        <div className="my-4 flex justify-between">
          <button className="btn btn--primary">Next</button>
        </div>
      </form>
    </div>
  );
}
