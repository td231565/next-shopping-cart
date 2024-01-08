"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setValue("paymentMethod", paymentMethod);
  }, [paymentMethod, router, setValue, shippingAddress]);

  const submitHandler = ({ paymentMethod }: { paymentMethod: string }) => {
    dispatch(savePaymentMethod(paymentMethod));

    router.push("/placeorder");
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
          <div key={payment} className="mb-4">
            <input
              type="radio"
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              value={payment}
              {...register("paymentMethod", {
                required: "Please select payment method",
              })}
            />
            <label htmlFor={payment} className="p-2">
              {payment}
            </label>
          </div>
        ))}
        {errors.paymentMethod && (
          <div className="text-red-500">{errors.paymentMethod.message}</div>
        )}

        <div className="mb-4 flex justify-between">
          <button className="btn btn--primary">Next</button>
        </div>
      </form>
    </div>
  );
}
