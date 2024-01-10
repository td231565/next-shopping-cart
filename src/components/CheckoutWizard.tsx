export default function CheckoutWizard({ activeStep = 0 }) {
  return (
    <div className="mb-5 flex flex-wrap">
      {["User Login", "Shipping Address", "Payment Method", "Place Order"].map(
        (step, idx) => (
          <div
            key={step}
            className={`flex-1 border-b-2 flex items-center justify-center text-center ${
              idx < activeStep
                ? "border-indigo-300 text-indigo-500"
                : idx === activeStep
                ? "border-indigo-500 text-indigo-500 font-bold"
                : "border-gray-400 text-gray-400"
            }`}
          >
            {step}
          </div>
        )
      )}
    </div>
  );
}
