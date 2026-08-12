import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Vision() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />

      {/* Vision Hero */}
      <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Our Vision
          </h1>

          <div className="w-20 h-1 bg-amber-400 mx-auto mt-5 rounded-full"></div>

          <p className="mt-6 text-lg md:text-xl text-slate-200 leading-relaxed">
            Building a community where young entrepreneurs are seen,
            supported, and empowered to grow.
          </p>
        </motion.div>
      </section>

      {/* Main Message */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-md p-8 md:p-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Supporting Young Entrepreneurs
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Young people possess incredible talents, skills, ideas, and
              businesses that deserve to be recognized and supported. Many
              young entrepreneurs provide valuable products and services,
              yet their abilities often remain unknown even within their
              own communities.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              The Young Entrepreneurs Hub seeks to change this by creating
              a platform where young business owners and skilled
              professionals can showcase what they do and connect with
              people who need their products and services.
            </p>

            <p className="text-slate-600 text-lg leading-relaxed">
              We believe this is especially important within the church.
              The church is not only a place of worship, but also a
              community of people with diverse talents, professions,
              businesses, and abilities. When we intentionally support
              one another, we create opportunities for young people to
              grow, gain experience, build sustainable businesses, and
              contribute meaningfully to society.
            </p>
          </motion.div>

          {/* Vision Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-7 text-center"
            >
              <div className="w-14 h-14 mx-auto bg-amber-400 rounded-full flex items-center justify-center mb-5">
                <span className="text-2xl font-bold text-slate-900">
                  01
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Showcase
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Give young entrepreneurs a platform to showcase their
                businesses, talents, skills, and professional services.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-7 text-center"
            >
              <div className="w-14 h-14 mx-auto bg-amber-400 rounded-full flex items-center justify-center mb-5">
                <span className="text-2xl font-bold text-slate-900">
                  02
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Support
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Encourage members of the community to intentionally
                support, recommend, and patronize businesses owned by
                young people.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-7 text-center"
            >
              <div className="w-14 h-14 mx-auto bg-amber-400 rounded-full flex items-center justify-center mb-5">
                <span className="text-2xl font-bold text-slate-900">
                  03
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Empower
              </h3>

              <p className="text-slate-600 leading-relaxed">
                Create opportunities for young people to grow their
                businesses, develop their skills, and make a lasting
                impact.
              </p>
            </motion.div>

          </div>

          {/* Closing Message */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-12 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              See a young entrepreneur.{" "}
              <span className="text-amber-500">
                Support their dream.
              </span>
            </h2>

            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
              Sometimes, supporting someone does not require a donation.
              It can simply mean choosing their service, recommending
              their business, sharing their work, or giving them an
              opportunity.
            </p>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}