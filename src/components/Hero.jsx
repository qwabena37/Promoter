import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="bg-black text-yellow-800 py-24 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold"
      >
        Young Entrepreneurs Hub
      </motion.h1>

      <p className="mt-4 text-lg">
        Discover and Support Young Business Leaders
      </p>
    </section>
  );
}