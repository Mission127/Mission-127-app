import "./globals.css";
import Logo from "./logo";

export const metadata = {
  title: "Mission 127",
  description: "James 1:27",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white">
        <header className="bg-slate-900 p-8 text-center border-b border-slate-800">
          <Logo />
          <h1 className="text-4xl font-bold mt-6">Mission 127</h1>
          <p className="text-xl text-slate-300 mt-4">
            “Pure and undefiled religion before God is this: to visit orphans and widows in their trouble…” – James 1:27
          </p>
        </header>
        <main className="max-w-4xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
