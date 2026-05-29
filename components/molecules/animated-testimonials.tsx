"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
  extraBadge?: string;
};

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: AnimatedTestimonialsProps) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  const rotations = useMemo(
    () => testimonials.map(() => Math.floor(Math.random() * 21) - 10),
    [testimonials],
  );

  if (!testimonials.length) return null;

  return (
    <div
      className={cn(
        "mx-auto max-w-7xl px-6 py-12 md:py-10 font-sans antialiased",
        className,
      )}
    >
      <div className="relative grid grid-cols-1 gap-16 md:grid-cols-2 items-center">
        <div className="relative">
          <div className="relative h-[350px] md:h-[450px] w-full max-w-[500px] mx-auto">
            <AnimatePresence mode="popLayout">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: rotations[index],
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.6,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : rotations[index],
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -40, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: rotations[index],
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Card className="h-full w-full overflow-hidden rounded-[3rem] border-[12px] border-white shadow-2xl dark:border-neutral-800 ring-1 ring-slate-200/50">
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      draggable={false}
                      className="h-full w-full object-cover object-center"
                    />
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">
              {testimonials[active].name}
            </h3>

            <div className="flex items-center gap-3 mt-4">
              <Badge
                variant="secondary"
                className="bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-widest text-[11px] font-black px-3 py-1"
              >
                {testimonials[active].designation}
              </Badge>
              {testimonials[active].extraBadge && (
                <Badge
                  variant="outline"
                  className="text-[11px] uppercase font-black border-slate-200 px-3 py-1"
                >
                  {testimonials[active].extraBadge}
                </Badge>
              )}
            </div>

            <motion.p className="mt-10 text-xl leading-relaxed text-slate-500 dark:text-neutral-400 font-medium italic">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.015 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          <div className="flex gap-4 mt-12">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              className="rounded-full h-12 w-12 bg-white hover:bg-emerald-500 hover:text-white transition-all shadow-md border-slate-200 group"
            >
              <IconArrowLeft className="h-6 w-6 text-slate-700 group-hover:text-white transition-colors" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="rounded-full h-12 w-12 bg-white hover:bg-emerald-500 hover:text-white transition-all shadow-md border-slate-200 group"
            >
              <IconArrowRight className="h-6 w-6 text-slate-700 group-hover:text-white transition-colors" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
