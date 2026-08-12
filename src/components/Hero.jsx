import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white py-24 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold text-amber-400"
      >
        Young Entrepreneurs Hub
      </motion.h1>

      <p className="mt-4 text-lg text-slate-200">
        Discover and Support Young Business Leaders
      </p>
    </section>
  );
}