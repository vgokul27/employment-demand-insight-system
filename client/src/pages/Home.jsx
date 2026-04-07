import { motion } from "framer-motion";
import { MdTrendingUp, MdAutoAwesome, MdPeople, MdLightbulb, MdSchool, MdBusinessCenter } from "react-icons/md";

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">

      {/* HERO SECTION */}
      <div className="text-center py-20 px-6">

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="inline-block px-4 py-1 bg-indigo-100 text-indigo-600 rounded-full mb-4"
        >
          ⚡ Powered by AI & Data Analytics
        </motion.p>

        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white"
        >
          AI-Powered{" "}
          <span className="text-indigo-600">Employment</span> 
          <br />
          Demand Insight System
        </motion.h1>

        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          Analyze job market trends, forecast skill demand, and make data-driven career decisions.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300">
            Explore Insights →
          </button>
          <button className="bg-gray-200 dark:bg-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300">
            Get Started
          </button>
        </div>
      </div>

      {/* POWERFUL FEATURES */}
      <div className="px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Leverage advanced AI and analytics to stay ahead in the job market
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {[
            { icon: MdTrendingUp, title: "AI-based trend detection", desc: "Advanced algorithms detect emerging job market trends in real-time." },
            { icon: MdAutoAwesome, title: "Skill demand forecasting", desc: "Predict which skills will be in high demand in the coming months." },
            { icon: MdLightbulb, title: "Smart job-skill matching", desc: "Match your skills with relevant opportunities and growth paths." }
          ].map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300"
              >
                <Icon className="text-3xl text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="px-6 py-20 bg-white dark:bg-gray-800">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Simple, streamlined process to get insights
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { step: "01", title: "Collect Data", desc: "Aggregate employment data from multiple sources" },
            { step: "02", title: "Analyze Trends", desc: "Use AI algorithms to identify patterns and insights" },
            { step: "03", title: "Generate Insights", desc: "Create actionable reports and forecasts" }
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl text-center"
            >
              <div className="text-4xl font-bold text-indigo-600 mb-2">{item.step}</div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* WHO BENEFITS */}
      <div className="px-6 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Who Benefits
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            EDIS is designed for professionals at every stage of their career
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {[
            { icon: MdSchool, title: "Students", desc: "Make informed career choices based on market demand" },
            { icon: MdBusinessCenter, title: "Job Seekers", desc: "Understand what skills employers are looking for" },
            { icon: MdPeople, title: "Professionals", desc: "Plan career transitions with data-driven insights" }
          ].map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl"
              >
                <Icon className="text-3xl text-indigo-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{benefit.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  {benefit.desc}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>

      {/* KEY BENEFITS */}
      <div className="px-6 py-20 bg-white dark:bg-gray-800">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Key Benefits
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Why choose EDIS for your career insights
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

          {[
            { title: "Real-time Data", desc: "Access the latest employment trends and market data" },
            { title: "AI-Powered Predictions", desc: "Get accurate forecasts based on machine learning models" },
            { title: "Comprehensive Analysis", desc: "Analyze skills, jobs, and market dynamics in one place" },
            { title: "Actionable Insights", desc: "Receive personalized recommendations tailored to your goals" },
            { title: "Easy to Use", desc: "Intuitive interface designed for everyone" },
            { title: "Data Privacy", desc: "Your data is secure and never shared without consent" }
          ].map((benefit, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <div className="text-2xl text-indigo-600 flex-shrink-0">✓</div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white">{benefit.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{benefit.desc}</p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>

      {/* CTA SECTION */}
      <div className="px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals already using EDIS to make smarter career decisions
          </p>
          <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
            Start Your Free Analysis →
          </button>
        </motion.div>
      </div>
    </div>
  );
}