import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EntrepreneurCard from "../components/EntrepreneurCard";
import entrepreneurs from "../data/entrepreneurs";
import { motion } from "framer-motion";

export default function Explore() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      {/* Explore Hero */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Explore Young Entrepreneurs
          </h1>

          <div className="w-20 h-1 bg-amber-400 mx-auto mt-5 rounded-full"></div>

          <p className="mt-6 text-lg md:text-xl text-slate-200 leading-relaxed">
            Discover the businesses, skills, talents, and services
            offered by young entrepreneurs within our community.
          </p>
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Discover. Connect. Support.
          </h2>

          <p className="mt-4 text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Every entrepreneur has a story, a skill, and something valuable
            to offer. Explore the people featured on our platform and
            discover opportunities to support their businesses and services.
          </p>
        </div>
      </section>

      {/* Entrepreneurs */}
      <section className="pb-16 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                Featured Entrepreneurs
              </h2>

              <div className="w-16 h-1 bg-amber-400 mt-3 rounded-full"></div>
            </div>

            <span className="hidden sm:block bg-slate-900 text-white px-4 py-2 rounded-full text-sm">
              {entrepreneurs.length} Entrepreneurs
            </span>
          </div>

          {entrepreneurs.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {entrepreneurs.map((person, index) => (
                <motion.div
                  key={person.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                >
                  <EntrepreneurCard person={person} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <h3 className="text-xl font-bold text-slate-900">
                No entrepreneurs available yet.
              </h3>

              <p className="mt-3 text-slate-600">
                Check back soon as we continue to showcase young
                entrepreneurs and their businesses.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Support Section */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Your Support Can Make a Difference
            </h2>

            <p className="mt-5 text-slate-200 text-lg leading-relaxed">
              Supporting a young entrepreneur can be as simple as
              purchasing their product, using their service, recommending
              their business, or sharing their work with someone who needs it.
            </p>

            <p className="mt-4 text-amber-400 font-semibold text-lg">
              Discover a business. Support a dream. Build a community.
            </p>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}