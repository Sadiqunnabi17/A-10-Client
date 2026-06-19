import Link from "next/link";
import { FiBook, FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-secondary font-bold text-2xl mb-3">
            <FiBook size={24} />
            <span style={{ fontFamily: "Georgia, serif" }}>Fable</span>
          </div>
          <p className="text-sm text-gray-300">
            Connecting readers with talented writers through original ebooks.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-secondary font-semibold mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2 text-sm text-gray-300">
            <Link href="/about" className="hover:text-secondary transition">About</Link>
            <Link href="/contact" className="hover:text-secondary transition">Contact</Link>
            <Link href="/privacy" className="hover:text-secondary transition">Privacy Policy</Link>
          </div>
        </div>

        {/* Newsletter + Social */}
        <div>
          <h4 className="text-secondary font-semibold mb-3">Newsletter</h4>
          <div className="flex gap-2 mb-4">
            <input
              type="email"
              placeholder="Your email"
              className="bg-dark text-white px-3 py-2 rounded text-sm flex-1 outline-none border border-gray-600 focus:border-secondary"
            />
            <button className="bg-secondary text-primary px-3 py-2 rounded text-sm font-semibold hover:opacity-90">
              Subscribe
            </button>
          </div>
          <div className="flex gap-4 text-gray-300">
            <a href="#" className="hover:text-secondary transition"><FiFacebook size={20} /></a>
            <a href="#" className="hover:text-secondary transition"><FiTwitter size={20} /></a>
            <a href="#" className="hover:text-secondary transition"><FiInstagram size={20} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Fable. All rights reserved.
      </div>
    </footer>
  );
}