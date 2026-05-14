"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export const SpotlightCard = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof Card> & { spotlightColor?: string }
>(
  (
    {
      className,
      children,
      spotlightColor = "rgba(34, 197, 94, 0.15)",
      onMouseMove,
      ...props
    },
    ref,
  ) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 150 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);

      if (onMouseMove) {
        onMouseMove(event);
      }
    }

    return (
      <Card
        ref={ref}
        onMouseMove={handleMouseMove}
        className={cn("group relative overflow-hidden", className)}
        {...props}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
          style={{
            background: useTransform(
              [smoothX, smoothY],
              ([x, y]) =>
                `radial-gradient(650px circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`,
            ),
          }}
        />

        {/* z-10 agar CardContent, CardHeader, dll tetap berada di atas efek cahaya */}
        <div className="relative z-10 h-full">{children}</div>
      </Card>
    );
  },
);

SpotlightCard.displayName = "SpotlightCard";
