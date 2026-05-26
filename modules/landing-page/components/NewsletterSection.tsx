import React from "react";

export default function NewsletterSection() {
  return (
    <section className="py-20 px-6 bg-[#FCFDF8]">
      <div className="max-w-4xl mx-auto bg-green-50 p-16 rounded-[2.5rem] border border-green-100 grid md:grid-cols-2 gap-12 items-center">
        <h2 className="text-3xl font-extrabold text-green-950">
          Dapatkan Insight Pertanian AI Terbaru.
        </h2>
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Alamat email Anda..."
            className=" px-5 py-3 rounded-full bg-white border border-green-100 text-sm focus:ring-2 focus:ring-green-100 transition"
          />
          <button
            type="submit"
            className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-green-700 transition"
          >
            Berlangganan
          </button>
        </form>
      </div>
    </section>
  );
}
