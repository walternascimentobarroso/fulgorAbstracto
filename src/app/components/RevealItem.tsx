"use client";
import { motion } from "motion/react";

type Props = {
  index: number;
  className?: string;
  children: React.ReactNode;
};

const RevealItem = ({ index, className, children }: Props) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.li>
  );
};

export default RevealItem;
