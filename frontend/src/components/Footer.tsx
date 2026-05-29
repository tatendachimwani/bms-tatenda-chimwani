import {
  BookOpen,
  // Facebook,
  // Instagram,
  // Twitter,
  // Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
              <BookOpen className="w-6 h-6 text-white" />
            </div>

            <h2 className="text-3xl font-bold">BookMS</h2>
          </div>

          <p className="text-blue-100 leading-relaxed">
            A modern Book Management System built for libraries, schools,
            universities, and bookstores.
          </p>

          {/* Social Icons
          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="bg-white/10 hover:bg-white hover:text-blue-700 transition p-3 rounded-full"
            >
              <Facebook className="w-5 h-5" />
            </a>

            <a
              href="#"
              className="bg-white/10 hover:bg-white hover:text-blue-700 transition p-3 rounded-full"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <a
              href="#"
              className="bg-white/10 hover:bg-white hover:text-blue-700 transition p-3 rounded-full"
            >
              <Twitter className="w-5 h-5" />
            </a>

            <a
              href="#"
              className="bg-white/10 hover:bg-white hover:text-blue-700 transition p-3 rounded-full"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div> */}
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-semibold mb-5">Quick Links</h3>

          <ul className="space-y-3 text-blue-100">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>

            <li>
              <a href="#about" className="hover:text-white transition">
                About
              </a>
            </li>

            <li>
              <a href="#features" className="hover:text-white transition">
                Features
              </a>
            </li>

            <li>
              <a href="#dashboard" className="hover:text-white transition">
                Dashboard
              </a>
            </li>

            <li>
              <a href="#contact" className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-2xl font-semibold mb-5">Features</h3>

          <ul className="space-y-3 text-blue-100">
            <li className="hover:text-white transition">Book Management</li>

            <li className="hover:text-white transition">Smart Search</li>

            <li className="hover:text-white transition">JWT Authentication</li>

            <li className="hover:text-white transition">Analytics Dashboard</li>

            <li className="hover:text-white transition">Inventory Tracking</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-2xl font-semibold mb-5">Contact</h3>

          <div className="space-y-5 text-blue-100">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-1 text-white" />
              <p>Harare, Zimbabwe</p>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-white" />
              <p>+263 77 432 6126</p>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-white" />
              <p>tatechimwani@support.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-blue-100 text-sm">
            © {new Date().getFullYear()} BookMS. All rights reserved.
          </p>

          <div className="flex gap-6 text-sm text-blue-100">
            <a href="#" className="hover:text-white transition">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-white transition">
              Terms of Service
            </a>

            <a href="#" className="hover:text-white transition">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
