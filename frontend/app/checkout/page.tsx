
"use client";
 import { useEffect, useState } from "react";
interface Product {
  title: string;
  image: string;
  price: number;
  quantity?: number;

}

export default function CheckoutPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    const savedCart = localStorage.getItem("grocery-cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const total = cart.reduce(
  (sum, product) =>
    sum + Number(product.price) * (product.quantity || 1),
  0
);

  const formatPrice = (price: number) =>
    `Rs. ${price}`;

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10 text-gray-800">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-2 text-3xl font-bold text-[#173d2b]">
          Checkout
        </h1>

        <p className="mb-8 text-gray-500">
          Complete your order details below.
        </p>

        <div className="grid gap-8 md:grid-cols-2">

          {/* CUSTOMER DETAILS */}
          <section className="rounded-xl bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-bold">
              Delivery Information
            </h2>

            <form
  className="space-y-4"
  onSubmit={(e) => {
  e.preventDefault();
  localStorage.removeItem("grocery-cart");
  setShowSuccess(true);
}}
>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-lg border p-3 outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="03XXXXXXXXX"
                  required
                  className="w-full rounded-lg border p-3 outline-none focus:border-green-700"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Enter your city"
                  required
                  className="w-full rounded-lg border p-3 outline-none focus:border-green-700"
                />
              </div>

                <label className="mb-1 block text-sm font-medium">
                  Full Delivery Address
                </label>
                <textarea
                  placeholder="House number, street, area..."
                  required
                  rows={4}
                  className="w-full rounded-lg border p-3 outline-none focus:border-green-700"
                />
             <div className="rounded-lg border p-4">
  <p className="font-semibold">Cash on Delivery</p>
  <p className="text-sm text-gray-500">
    Pay when your order arrives.
  </p>
</div>      
              <button
                type="submit"
                className="w-full rounded-lg bg-[#173d2b] py-3 font-semibold text-white hover:bg-green-900"
              >
                Place Order
              </button>

            </form>
          </section>

          {/* ORDER SUMMARY */}
          <section className="h-fit rounded-xl bg-white p-6 shadow-sm">

            <h2 className="mb-6 text-xl font-bold">
              Order Summary
            </h2>

            {cart.length === 0 ? (
              <p className="text-gray-500">
                Your cart is empty.
              </p>
            ) : (
              <div className="space-y-5">

                {cart.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-16 w-16 object-contain"
                    />

                  <div className="flex-1">
  <p className="font-semibold">
    {product.title}
  </p>

  <p className="text-sm text-gray-500">
    Quantity: {product.quantity || 1}
  </p>

  <p className="text-sm text-green-700">
    {formatPrice(product.price)} × {product.quantity || 1}
  </p>

  <p className="font-semibold text-green-800">
    {formatPrice(product.price * (product.quantity || 1))}
  </p>
</div>
                  </div>
                ))}

                <div className="flex justify-between pt-3 text-lg font-bold">
                  <span>Total</span>
                  <span className="text-green-800">
                    {formatPrice(total)}
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  Expected delivery: 24–36 hours.
                </p>

              </div>
            )}
          </section>

        </div>
      </div>
      {showSuccess && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">

      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-700">
        ✓
      </div>

      <h2 className="mb-3 text-2xl font-bold text-[#173d2b]">
        Order Placed Successfully!
      </h2>

      <p className="mb-6 text-gray-500">
        Thank you for shopping with us. Your order will be delivered within 24–36 hours.
      </p>

      <button
        onClick={() => {
          window.location.href = "/";
        }}
        className="w-full rounded-lg bg-[#173d2b] py-3 font-semibold text-white transition hover:bg-green-900"
      >
        Back to Home
      </button>

    </div>
  </div>
)}
    </main>
  );
}
