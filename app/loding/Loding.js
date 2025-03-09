"use client";
import { motion } from "framer-motion";


export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <motion.div
        className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </div>
  );
}
