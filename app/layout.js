import "./globals.css";
import Logo from "./logo";

export const metadata = {
  title: "Mission 1:27",
  description: "Pure religion is this - James 1:27",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <header className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
            <Logo />
            <nav className="space-x-8 text-lg font-medium">
              <a href="#" className="hover:text-red-600">How it Works</a>
              <a href="#" className="hover:text-red-600">Stories</a>
              <a href="#" className="hover:text-red-600">Join</a>
              <a href="#" className="hover:text-red-600">Login</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-900 text-white text-center py-8">
          <p>© 2025 Mission 1:27. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
