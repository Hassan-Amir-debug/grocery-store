"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-[#f8faf7] px-5 py-16 text-gray-800">

      <div className="mx-auto max-w-6xl">

        <div className="mb-12 text-center">
          <p className="font-semibold uppercase tracking-widest text-green-700">
            Customer Support
          </p>

          <h1 className="mt-3 text-4xl font-bold text-[#173d2b]">
            Get in Touch
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-gray-500">
            Have a question or need assistance?
            We'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-5">

          <section className="rounded-2xl bg-[#173d2b] p-8 text-white md:col-span-2">

            <h2 className="text-2xl font-bold">
              Contact Information
            </h2>

            <p className="mt-4 leading-7 text-green-100">
              We're here to make your grocery shopping experience
              smooth and convenient.
            </p>

            <div className="mt-10 space-y-7">

              <div className="flex items-start gap-4">
                <span className="text-2xl">📍</span>
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="mt-1 text-sm text-green-100">
                    Lahore, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-2xl">🛒</span>
                <div>
                  <h3 className="font-semibold">Shopping Assistance</h3>
                  <p className="mt-1 text-sm text-green-100">
                    Questions about products and orders.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-2xl">🚚</span>
                <div>
                  <h3 className="font-semibold">Delivery Support</h3>
                  <p className="mt-1 text-sm text-green-100">
                    Assistance with delivery-related queries.
                  </p>
                </div>
              </div>

            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:col-span-3">

            <h2 className="mb-6 text-2xl font-bold text-[#173d2b]">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="rounded-xl bg-green-50 p-8 text-center">
                <div className="text-4xl">✓</div>

                <h3 className="mt-4 text-xl font-bold text-[#173d2b]">
                  Message Saved!
                </h3>

                <p className="mt-2 text-gray-600">
                  This is a frontend demo. Message delivery
                  will be enabled when the contact backend is connected.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-5 font-semibold text-green-800 underline"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:border-green-700"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:border-green-700"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="What is your message about?"
                    className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:border-green-700"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write your message..."
                    className="w-full rounded-lg border border-gray-200 p-3 outline-none focus:border-green-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-[#173d2b] py-3 font-semibold text-white transition hover:bg-green-900"
                >
                  Send Message
                </button>

              </form>
            )}

          </section>

        </div>

        <div className="mt-10 text-center">
          <Link href="/" className="font-semibold text-green-800 hover:underline">
            ← Back to Home
          </Link>
        </div>

      </div>
    </main>
  );
}