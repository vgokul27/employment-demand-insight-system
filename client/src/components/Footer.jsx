export default function Footer() {
  const currentYear = new Date().getFullYear();

  const bottomLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Support", href: "#" }
  ];

  return (
    <footer className="bg-gray-100 text-gray-700">
      {/* BOTTOM DIVIDER */}
      <div className="border-t border-gray-300"></div>

      {/* BOTTOM FOOTER */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © {currentYear} EDIS Employment Demand Insight System. All rights reserved.
          </p>
          <div className="flex gap-6">
            {bottomLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-sm text-gray-600 hover:text-indigo-600 transition-colors duration-200"
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
