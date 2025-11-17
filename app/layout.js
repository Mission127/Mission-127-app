import "./globals.css";
import Logo from "./logo";

export const metadata = {
  title: "Mission 127",
  description: "James 1:27 – Pure religion in action",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white">
        <header className="bg-slate-900 p-6 text-center border-b border-slate-800">
          <Logo />
          <h1 class className="text-3xl font-bold mt-4">Mission 127</h1>
          <p className="text-lg text-slate-300 mt-2">
            “Pure and undefiled religion before God is this: to visit orphans and widows in their trouble…” – James 1:27
          </p>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
