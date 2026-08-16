import { useState, useEffect } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import EntrepreneurCard from "../components/EntrepreneurCard";
import EntrepreneurModal from "../components/EntrepreneurModal";

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Counter states
  const [entreCount, setEntreCount] = useState(0);
  const [bizCount, setBizCount] = useState(0);

  // Fetch entrepreneurs from backend
  useEffect(() => {
    fetchEntrepreneurs();
  }, []);

  const fetchEntrepreneurs = async () => {
    try {
      const response = await api.get("/entrepreneurs/");
      setEntrepreneurs(response.data);
    } catch (error) {
      console.error("Error fetching entrepreneurs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Animated counters based on actual data
  useEffect(() => {
    if (!entrepreneurs.length) return;

    let entrepreneurCounter = 0;
    let businessCounter = 0;

    const totalEntrepreneurs = entrepreneurs.length;

    const interval = setInterval(() => {
      if (entrepreneurCounter < totalEntrepreneurs) {
        entrepreneurCounter++;
        setEntreCount(entrepreneurCounter);
      }

      if (businessCounter < totalEntrepreneurs) {
        businessCounter++;
        setBizCount(businessCounter);
      }

      if (
        entrepreneurCounter >= totalEntrepreneurs &&
        businessCounter >= totalEntrepreneurs
      ) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [entrepreneurs]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500 mx-auto"></div>
          <p className="mt-4 text-slate-600 font-medium">
            Loading entrepreneurs...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <Hero />

      {/* FEATURED ENTREPRENEURS */}
      <section className="py-16 px-6 md:px-8 max-w-7xl mx-auto">
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

        {entrepreneurs.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-slate-700">
              No entrepreneurs available yet.
            </h3>
            <p className="text-slate-500 mt-2">
              Check back later for new profiles.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {entrepreneurs.map((person) => (
              <EntrepreneurCard
                key={person.id}
                person={person}
                onClick={setSelected}
              />
            ))}
          </div>
        )}
      </section>

      {/* Entrepreneur Details Modal */}
      <EntrepreneurModal
        person={selected}
        onClose={() => setSelected(null)}
      />

      {/* STATS SECTION */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white py-16">
        <div className="max-w-5xl mx-auto text-center px-6">
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