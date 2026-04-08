import { motion } from "framer-motion";
import { MdCheckCircle, MdLightbulb, MdPeople, MdPublic, MdVerified } from "react-icons/md";

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stats = [
    { number: "50K+", label: "Data Points" },
    { number: "100+", label: "Industries" },
    { number: "1M+", label: "Job Listings" },
    { number: "99.9%", label: "Accuracy" }
  ];

  const values = [
    {
      icon: MdLightbulb,
      title: "Innovation",
      desc: "Continuously advancing AI technology to provide cutting-edge insights"
    },
    {
      icon: MdCheckCircle,
      title: "Accuracy",
      desc: "Delivering precise, data-driven predictions you can trust"
    },
    {
      icon: MdPeople,
      title: "User-Centric",
      desc: "Designing solutions tailored to your career needs"
    },
    {
      icon: MdPublic,
      title: "Global Impact",
      desc: "Empowering professionals worldwide with market insights"
    }
  ];

  const features = [
    {
      number: "01",
      title: "Real-time Data",
      desc: "Access the most current employment data from global sources"
    },
    {
      number: "02",
      title: "AI-Powered Analysis",
      desc: "Advanced machine learning algorithms for accurate predictions"
    },
    {
      number: "03",
      title: "Comprehensive Insights",
      desc: "Deep dive into skills, trends, and market opportunities"
    },
    {
      number: "04",
      title: "Personalized Recommendations",
      desc: "Get advice tailored to your unique career goals"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* HERO SECTION */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About EDIS
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            Empowering professionals with AI-driven insights into the employment market. 
            Make informed career decisions backed by real data and advanced analytics.
          </p>
        </motion.div>
      </div>

      {/* MISSION SECTION */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-lg shadow-lg p-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At EDIS, we believe that career decisions should be driven by data, not guesswork. 
            Our mission is to democratize access to employment market intelligence, enabling 
            students, job seekers, and professionals to navigate their career paths with confidence. 
            By combining AI, real-time data analytics, and industry expertise, we provide 
            actionable insights that bridge the gap between ambition and opportunity.
          </p>
        </motion.div>
      </div>

      {/* STATS SECTION */}
      <div className="bg-white py-16 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            By The Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
                  {stat.number}
                </div>
                <p className="text-gray-600 font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* PROBLEM & SOLUTION */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* PROBLEM */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              The Problem
            </h3>
            <p className="text-gray-600 mb-4">
              The job market evolves rapidly, but career guidance hasn't kept pace. 
              Students and professionals often struggle with questions like:
            </p>
            <ul className="space-y-3">
              {[
                "What skills will be in demand next year?",
                "Which industries offer the best growth?",
                "What salary should I expect?",
                "How do I prepare for future opportunities?"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <span className="text-indigo-600 text-lg mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* SOLUTION */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Our Solution
            </h3>
            <p className="text-gray-600 mb-4">
              EDIS leverages advanced AI and real-time market data to answer these questions with precision:
            </p>
            <ul className="space-y-3">
              {[
                "AI-powered skill demand forecasting",
                "Real-time job market analysis",
                "Salary trends and compensation insights",
                "Personalized career recommendations"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-700">
                  <MdVerified className="text-green-500 text-lg mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* VALUES SECTION */}
      <div className="bg-white py-20 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-all duration-300"
                >
                  <Icon className="text-4xl text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            What Makes Us Different
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto">
            We combine cutting-edge AI technology with comprehensive market data to deliver insights that matter
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <div className="text-4xl font-bold text-indigo-600 mb-4">
                {feature.number}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-lg text-indigo-100 mb-8">
            Join thousands of professionals already using EDIS to make smarter career decisions
          </p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-indigo-50 transition-all duration-300 shadow-lg hover:shadow-xl">
            Get Started Today
          </button>
        </motion.div>
      </div>

      {/* CONTACT SECTION */}
      <div className="bg-gray-50 py-16 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Have Questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            We'd love to hear from you. Reach out to our team for more information.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300">
              Contact Us
            </button>
            <button className="px-6 py-3 border-2 border-indigo-600 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-all duration-300">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
