import { useState, useEffect } from "react";
import entrepreneurs from "../data/entrepreneurs";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import EntrepreneurCard from "../components/EntrepreneurCard";
import EntrepreneurModal from "../components/EntrepreneurModal";

export default function Home() {
  const [selected, setSelected] = useState(null);

  // Countdown states
  const [entreCount, setEntreCount] = useState(0);
  const [bizCount, setBizCount] = useState(0);

  useEffect(() => {
    let e = 0;
    let b = 0;

    const interval = setInterval(() => {
      if (e < 20) e++;
      if (b < 15) b++;

      setEntreCount(e);
      setBizCount(b);

      if (e === 20 && b === 15) {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />

      {/* FEATURED */}
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
      {/* COUNTDOWN SECTION */}
      <section className="bg-black text-white py-12 text-center">
        <div className="max-w-4xl mx-auto flex justify-center gap-12">
          <div>
            <h2 className="text-4xl font-bold text-yellow-800">
              {entreCount}+
            </h2>
            <p className="mt-2 text-lg">Young Entrepreneurs Exposed</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-yellow-800">
              {bizCount}+
            </h2>
            <p className="mt-2 text-lg">Businesses Promoted</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}