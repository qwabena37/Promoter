import { useState } from "react";
import entrepreneurs from "../data/entrepreneurs";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer"
import EntrepreneurCard from "../components/EntrepreneurCard";
import EntrepreneurModal from "../components/EntrepreneurModal";

export default function Home() {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <Navbar />
      <Hero />

      <section className="p-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Entrepreneurs
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {entrepreneurs.map((person) => (
            <EntrepreneurCard
              key={person.id}
              person={person}
              onClick={setSelected}
            />
          ))}
        </div>
      </section>

      <EntrepreneurModal
        person={selected}
        onClose={() => setSelected(null)}
      />
      <Footer />
    </div>
  );
}