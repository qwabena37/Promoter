import { useState, useEffect } from "react";
import entrepreneurs from "../data/entrepreneurs";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import EntrepreneurCard from "../components/EntrepreneurCard";
import EntrepreneurModal from "../components/EntrepreneurModal";

export default function Home() {
  const [selected, setSelected] = useState(null);

  // Counter states
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
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <Hero />

      {/* FEATURED ENTREPRENEURS */}
      <section className="py-16 px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900">
            Our Young Entrepreneurs
          </h2>

          <div className="w-24 h-1 bg-amber-400 mx-auto mt-4 rounded-full"></div>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Meet inspiring young business leaders who are creating impact,
            driving innovation, and shaping the future through entrepreneurship.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
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

      {/* STATS SECTION */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-10">
            Our Growing Impact
          </h2>

          <div className="flex flex-col md:flex-row justify-center gap-12">
            <div>
              <h3 className="text-5xl font-bold text-amber-400">
                {entreCount}+
              </h3>
              <p className="mt-3 text-slate-200">
                Young Entrepreneurs Exposed
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-amber-400">
                {bizCount}+
              </h3>
              <p className="mt-3 text-slate-200">
                Businesses Promoted
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}