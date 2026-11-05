import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8faf7] text-gray-800">

      <section className="bg-[#173d2b] px-6 py-20 text-center text-white">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-green-300">
          Welcome to Grocery Store
        </p>

        <h1 className="text-4xl font-bold md:text-5xl">
          Freshness Delivered to Your Door
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-green-100">
          Your everyday grocery shopping made simple.
          Explore quality products, enjoy convenient shopping
          and get your essentials delivered to your home.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-[#173d2b] transition hover:bg-green-100"
        >
          Start Shopping
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">

        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#173d2b]">
            About Our Store
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Grocery Store by Hassan is an online grocery shopping
            platform designed to make everyday shopping easier
            and more convenient.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {[
            {
              icon: "🥬",
              title: "Fresh Products",
              description:
                "Explore a selection of grocery products across different categories."
            },
            {
              icon: "🛒",
              title: "Easy Shopping",
              description:
                "Browse products, manage your cart and place your order with ease."
            },
            {
              icon: "🚚",
              title: "Home Delivery",
              description:
                "Get your groceries delivered conveniently to your doorstep."
            }
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 text-5xl">{item.icon}</div>

              <h3 className="text-xl font-bold text-[#173d2b]">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                {item.description}
              </p>
            </div>
          ))}

        </div>

        <div className="mt-16 rounded-2xl bg-green-50 p-8 text-center md:p-12">
          <h2 className="text-2xl font-bold text-[#173d2b]">
            Your Everyday Grocery Partner
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            From fruits and vegetables to snacks, grains and frozen
            foods, find your everyday essentials in one place.
          </p>
        </div>

      </section>
    </main>
  );
}