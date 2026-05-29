"use client";

import { AnimatedTestimonials } from "@/components/molecules/animated-testimonials";
import { insights } from "../const/data";

export default function DiagnosisResultSection() {
  return (
    <section className="">
      <div className="max-w-7xl mx-auto">
        <AnimatedTestimonials testimonials={insights} autoplay={false} />
      </div>
    </section>
  );
}
