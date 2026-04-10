import { motion } from "framer-motion";
import { MdCheckCircle } from "react-icons/md";

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const teamMembers = [
    {
      name: "Divya Prabha M",
      role: "Student Developer",
      bio: "Computer Science student specializing in full-stack development and AI integration"
    },
    {
      name: "Gokulraj V",
      role: "Student Developer",
      bio: "Computer Science student specializing in full-stack development and AI integration"
    },
    {
      name: "O. Pandithurai",
      role: "Mentor & Project Lead",
      bio: "Professor, Computer Science and Engineering at Rajalakshmi Institute of Technology"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* HERO SECTION */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-18 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About EDIS
          </h1>
          <p className="text-lg text-indigo-100 max-w-3xl mx-auto">
            The Employment Demand Insight System leverages AI and data analytics to bridge the gap between workforce skills and market demand.
          </p>
        </motion.div>
      </div>

      {/* SDG 8 SECTION */}
      <div className="max-w-5xl mx-auto px-6 py-18">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl p-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            SDG 8: Decent Work & Economic Growth
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            EDIS directly supports UN Sustainable Development Goal 8 by promoting sustained, inclusive economic growth, full and productive employment, and decent work for all. By providing data-driven insights into skill demand, we help reduce unemployment and skill mismatches across global labor markets.
          </p>
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
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              The Problem
            </h3>
            <div className="space-y-4">
              {[
                "Rapid skill obsolescence in the digital economy",
                "Growing disconnect between education and job market needs",
                "Lack of accessible, real-time labor market intelligence",
                "Difficulty in forecasting future employment trends"
              ].map((item, idx) => (
                <div key={idx} className="bg-red-50 border border-red-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300">
                  <p className="text-gray-700 font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* SOLUTION */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Our Solution
            </h3>
            <div className="space-y-4">
              {[
                "AI-powered real-time skill demand analysis",
                "Predictive models for employment trend forecasting",
                "Smart skill-to-job matching algorithms",
                "Actionable insights for all stakeholders"
              ].map((item, idx) => (
                <div key={idx} className="bg-green-50 border border-green-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 flex items-start gap-3">
                  <MdCheckCircle className="text-green-500 text-xl mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* TEAM SECTION */}
      <div className="bg-white py-20 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 text-center"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-indigo-600 font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
