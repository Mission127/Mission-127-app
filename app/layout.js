import "./globals.css";
import Link from "next/link";
import Logo from "./logo";

export const metadata = { title: "Mission 1:27", description: "James 1:27 in action" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        <header className="bg-black/95 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition">
              <Logo />
              <span className="text-2xl font-bold tracking-wider">Mission 1:27</span>
            </Link>
            <nav className="hidden md:flex items-center gap-10 text-lg">
              <Link href="/" className="hover:text-red-500 transition">Home</Link>
              <Link href="/how" className="hover:text-red-500 transition">How It Works</Link>
              <Link href="/stories" className="hover:text-red-500 transition">Stories</Link>
              <Link href="/churches" className="hover:text-red-500 transition">For Churches</Link>
              <Link href="/contact" className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-medium transition">
                Get Involved
              </Link>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="bg-gradient-to-t from-black to-gray-950 py-16 text-center border-t border-white/10">
          <p className="text-gray-400">© 2025 Mission 1:27 • James 1:27 in action</p>
        </footer>
      </body>
    </html>
  );
}
