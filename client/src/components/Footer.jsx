import { motion } from "framer-motion";
import { GiBrain } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Skills", href: "/skills" },
    { label: "AI Prediction", href: "/ai" }
  ];

  const socialLinks = [
    { icon: FaInstagram, label: "Instagram", href: "#" },
    { icon: FaTwitter, label: "Twitter", href: "#" },
    { icon: FaGithub, label: "GitHub", href: "#" },
    { icon: FaLinkedin, label: "LinkedIn", href: "#" }
  ];

  const bottomLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Support", href: "#" }
  ];

  return (
    <footer className="bg-slate-900 text-gray-300">
      {/* MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* LEFT SECTION - BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <GiBrain className="text-3xl text-indigo-400" />
              <h3 className="text-2xl font-bold text-white">EDIS</h3>
            </div>
            <p className="text-sm text-gray-400 italic mb-4">
              "Discover your career potential before the future finds you."
            </p>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              EDIS is your intelligent employment insight platform, helping professionals discover, analyze, and forecast career opportunities powered by AI. From entry-level to executive roles, we're here to guide your career journey.
            </p>
            <div className="flex items-center gap-3">
              <MdEmail className="text-indigo-400" />
              <a href="mailto:hello@edis.com" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                hello@edis.com
              </a>
            </div>
          </motion.div>

          {/* CENTER SECTION - QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-6 text-lg">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-indigo-400 transition-colors duration-200 text-sm flex items-center gap-2"
                  >
                    <span className="text-indigo-400">+</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* RIGHT SECTION - CONNECT WITH US */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-6 text-lg">
              Connect With Us
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    title={social.label}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 hover:bg-indigo-600 text-gray-300 hover:text-white transition-all duration-200"
                  >
                    <Icon className="text-lg" />
                  </a>
                );
              })}
            </div>
            <p className="text-sm text-gray-400 mt-6">
              ❤️ Made with love for career growth
            </p>
          </motion.div>

        </div>
      </div>

      {/* BOTTOM DIVIDER */}
      <div className="border-t border-gray-700"></div>

      {/* BOTTOM FOOTER */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © {currentYear} EDIS Employment Demand Insight System. All rights reserved.
          </p>
          <div className="flex gap-6">
            {bottomLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-xs text-gray-500 hover:text-indigo-400 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
