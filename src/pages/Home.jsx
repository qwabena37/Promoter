
import { useState, useEffect } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import EntrepreneurCard from "../components/EntrepreneurCard";
import EntrepreneurModal from "../components/EntrepreneurModal";

export default function Home() {
  const [selected, setSelected] = useState(null);

  // All entrepreneurs returned from the API
  const [entrepreneurs, setEntrepreneurs] = useState([]);

  // Entrepreneurs currently displayed on homepage
  const [displayedEntrepreneurs, setDisplayedEntrepreneurs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  // Counter states
  const [entreCount, setEntreCount] = useState(0);
  const [bizCount, setBizCount] = useState(0);

  /*
   * =====================================================
   * RANDOM ENTREPRENEUR SELECTION
   * =====================================================
   */

  const getRandomEntrepreneurs = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    // Copy array so we don't mutate the original API data
    const shuffled = [...data];

    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [shuffled[i], shuffled[j]] = [
        shuffled[j],
        shuffled[i],
      ];
    }

    // Display maximum 21 entrepreneurs
    return shuffled.slice(0, 21);
  };

  /*
   * =====================================================
   * FETCH ENTREPRENEURS
   * =====================================================
   */

  useEffect(() => {
    const fetchEntrepreneurs = async () => {
      try {
        console.log("Fetching entrepreneurs...");

        const response = await api.get(
          "/entrepreneurs/"
        );

        console.log(
          "Entrepreneurs API response:",
          response.data
        );

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.results || [];

        setEntrepreneurs(data);

        // Select the first random group
        setDisplayedEntrepreneurs(
          getRandomEntrepreneurs(data)
        );

        setApiError(false);
      } catch (error) {
        console.error(
          "Error fetching entrepreneurs:",
          error
        );

        console.error(
          "Status:",
          error.response?.status
        );

        console.error(
          "Backend response:",
          error.response?.data
        );

        setApiError(true);
        setEntrepreneurs([]);
        setDisplayedEntrepreneurs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEntrepreneurs();
  }, []);

  /*
   * =====================================================
   * ROTATE ENTREPRENEURS EVERY 30 SECONDS
   * =====================================================
   */

  useEffect(() => {
    if (entrepreneurs.length <= 21) {
      return;
    }

    const rotationInterval = setInterval(() => {
      console.log(
        "Rotating entrepreneur selection..."
      );

      setDisplayedEntrepreneurs(
        getRandomEntrepreneurs(entrepreneurs)
      );
    }, 30000);

    return () => clearInterval(rotationInterval);
  }, [entrepreneurs]);

  /*
   * =====================================================
   * OPEN ENTREPRENEUR PROFILE
   * =====================================================
   */

  const handleOpenProfile = (person) => {
    console.log(
      "Opening entrepreneur profile:",
      person
    );

    setSelected(person);
  };

  /*
   * =====================================================
   * CLOSE ENTREPRENEUR PROFILE
   * =====================================================
   */

  const handleCloseProfile = () => {
    console.log("Closing entrepreneur profile");

    setSelected(null);
  };

  /*
   * =====================================================
   * ANIMATED COUNTERS
   *
   * These use the TOTAL number of entrepreneurs,
   * not just the 21 currently displayed.
   * =====================================================
   */

  useEffect(() => {
    const totalEntrepreneurs =
      entrepreneurs.length;

    if (totalEntrepreneurs === 0) {
      setEntreCount(0);
      setBizCount(0);
      return;
    }

    let entrepreneurCounter = 0;
    let businessCounter = 0;

    const interval = setInterval(() => {
      if (
        entrepreneurCounter <
        totalEntrepreneurs
      ) {
        entrepreneurCounter++;

        setEntreCount(
          entrepreneurCounter
        );
      }

      if (
        businessCounter <
        totalEntrepreneurs
      ) {
        businessCounter++;

        setBizCount(
          businessCounter
        );
      }

      if (
        entrepreneurCounter >=
          totalEntrepreneurs &&
        businessCounter >=
          totalEntrepreneurs
      ) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [entrepreneurs.length]);

  return (
    <div className="bg-slate-50 min-h-screen">

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}

      <Hero />

      {/* =====================================================
          ENTREPRENEURS
      ====================================================== */}

      <section
        className="
          py-12
          sm:py-14
          md:py-16
          px-3
          sm:px-4
          md:px-8
          max-w-7xl
          mx-auto
        "
      >

        {/* =====================================================
            SECTION HEADER
        ====================================================== */}

        <div
          className="
            text-center
            mb-8
            sm:mb-10
            md:mb-12
          "
        >

          <h2
            className="
              text-3xl
              sm:text-4xl
              font-bold
              text-slate-900
            "
          >
            Our Young Entrepreneurs
          </h2>

          <div
            className="
              w-24
              h-1
              bg-amber-400
              mx-auto
              mt-4
              rounded-full
            "
          />

          <p
            className="
              mt-4
              text-sm
              sm:text-base
              text-slate-600
              max-w-2xl
              mx-auto
              px-2
            "
          >
            Meet inspiring young business leaders
            who are creating impact, driving
            innovation, and shaping the future
            through entrepreneurship.
          </p>

        </div>

        {/* =====================================================
            LOADING
        ====================================================== */}

        {loading && (

          <div
            className="
              text-center
              py-16
            "
          >

            <div
              className="
                animate-spin
                rounded-full
                h-14
                w-14
                border-b-4
                border-amber-500
                mx-auto
              "
            />

            <p
              className="
                mt-5
                text-slate-600
                font-medium
              "
            >
              Loading entrepreneurs...
            </p>

          </div>

        )}

        {/* =====================================================
            API ERROR
        ====================================================== */}

        {!loading && apiError && (

          <div
            className="
              text-center
              py-16
            "
          >

            <div
              className="
                max-w-lg
                mx-auto
                bg-white
                rounded-xl
                shadow-md
                p-8
              "
            >

              <h3
                className="
                  text-2xl
                  font-semibold
                  text-slate-800
                  mb-3
                "
              >
                Entrepreneurs are currently unavailable
              </h3>

              <p className="text-slate-500">
                We couldn't connect to the
                entrepreneurs database.
                Please check back shortly.
              </p>

            </div>

          </div>

        )}

        {/* =====================================================
            EMPTY DATABASE
        ====================================================== */}

        {!loading &&
          !apiError &&
          entrepreneurs.length === 0 && (

            <div
              className="
                text-center
                py-16
              "
            >

              <div
                className="
                  max-w-lg
                  mx-auto
                  bg-white
                  rounded-xl
                  shadow-md
                  p-8
                "
              >

                <h3
                  className="
                    text-2xl
                    font-semibold
                    text-slate-700
                  "
                >
                  No entrepreneurs available yet.
                </h3>

                <p
                  className="
                    text-slate-500
                    mt-3
                  "
                >
                  New entrepreneur profiles will
                  appear here once they are added
                  by the administrator.
                </p>

              </div>

            </div>

          )}

        {/* =====================================================
            ENTREPRENEUR CARDS
        ====================================================== */}

        {!loading &&
          !apiError &&
          displayedEntrepreneurs.length > 0 && (

            <div
              className="
                grid
                grid-cols-2
                md:grid-cols-2
                lg:grid-cols-3
                gap-3
                sm:gap-5
                md:gap-6
                lg:gap-8
              "
            >

              {displayedEntrepreneurs.map(
                (person) => (

                  <EntrepreneurCard
                    key={person.id}
                    person={person}
                    onClick={() =>
                      handleOpenProfile(person)
                    }
                  />

                )
              )}

            </div>

          )}

        {/* =====================================================
            ROTATION INDICATOR
        ====================================================== */}

        {!loading &&
          !apiError &&
          entrepreneurs.length > 21 && (

            <div
              className="
                flex
                items-center
                justify-center
                gap-2
                mt-8
                text-xs
                sm:text-sm
                text-slate-400
              "
            >

              <span
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-amber-400
                  animate-pulse
                "
              />

              <span>
                Entrepreneurs rotate every 30 seconds
              </span>

            </div>

          )}

      </section>

      {/* =====================================================
          ENTREPRENEUR MODAL
      ====================================================== */}

      {selected && (

        <EntrepreneurModal
          person={selected}
          onClose={handleCloseProfile}
        />

      )}

      {/* =====================================================
          STATS SECTION
      ====================================================== */}

      <section
        className="
          bg-gradient-to-r
          from-slate-900
          via-blue-900
          to-slate-800
          text-white
          py-10
          sm:py-12
          md:py-16
        "
      >

        <div
          className="
            max-w-5xl
            mx-auto
            text-center
            px-4
            sm:px-6
          "
        >

          <h2
            className="
              text-2xl
              sm:text-3xl
              font-bold
              mb-7
              sm:mb-10
            "
          >
            Our Growing Impact
          </h2>

          <div
            className="
              flex
              flex-row
              justify-center
              items-start
              gap-8
              sm:gap-12
            "
          >

            {/* =================================================
                ENTREPRENEURS
            ================================================== */}

            <div>

              <h3
                className="
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  font-bold
                  text-amber-400
                "
              >
                {entreCount}+
              </h3>

              <p
                className="
                  mt-2
                  sm:mt-3
                  text-xs
                  sm:text-sm
                  md:text-base
                  text-slate-200
                  leading-tight
                  max-w-[130px]
                  sm:max-w-none
                  mx-auto
                "
              >
                Young Entrepreneurs Exposed
              </p>

            </div>

            {/* =================================================
                BUSINESSES
            ================================================== */}

            <div>

              <h3
                className="
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  font-bold
                  text-amber-400
                "
              >
                {bizCount}+
              </h3>

              <p
                className="
                  mt-2
                  sm:mt-3
                  text-xs
                  sm:text-sm
                  md:text-base
                  text-slate-200
                  leading-tight
                  max-w-[130px]
                  sm:max-w-none
                  mx-auto
                "
              >
                Businesses Promoted
              </p>

            </div>

          </div>
        </div>

      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />

    </div>
  );
}

