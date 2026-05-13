"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export const SpotlightCard = ({
  children,
  className,
  spotlightColor = "rgba(34, 197, 94, 0.15)", // Default warna emerald
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Menambahkan spring physics agar gerakan spotlight lebih natural
  const springConfig = { damping: 20, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      className={cn(
        "group relative rounded-[32px] border border-slate-100 bg-white overflow-hidden shadow-sm",
        className,
      )}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[32px] opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [smoothX, smoothY],
            ([x, y]) =>
              `radial-gradient(650px circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`,
          ),
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
};
