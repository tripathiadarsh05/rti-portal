import "./globals.css";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "RTI One | AI-Powered RTI Portal",
  description: "Secure, transparent right-to-information services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
            <a href="/" className="flex items-center gap-2.5 font-bold tracking-tight text-navy">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-700 text-white shadow-lg shadow-emerald-900/15">
                <ShieldCheck size={21} />
              </span>
              <span className="text-lg">RTI <span className="text-emerald-700">One</span></span>
            </a>
            <nav aria-label="Main navigation" className="flex items-center gap-3 text-sm font-semibold sm:gap-6">
              <a className="hidden text-slate-600 transition hover:text-emerald-700 sm:block" href="/track">Track a request</a>
              <a className="hidden text-slate-600 transition hover:text-emerald-700 md:block" href="/#how-it-works">How it works</a>
              <a className="text-slate-700 transition hover:text-emerald-700" href="/login">Sign in</a>
              <a className="btn-primary !rounded-lg !px-3.5 !py-2 sm:!px-4" href="/register">
                Get started <ArrowUpRight size={15} />
              </a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="mt-10 border-t border-slate-800 bg-slate-950 px-5 py-9 text-slate-300">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <a href="/" className="flex items-center gap-2 font-semibold text-white">
              <ShieldCheck className="text-emerald-400" size={19} /> RTI One
            </a>
            <p className="max-w-xl text-sm leading-6 text-slate-400">
              Secure public information access. AI assists officers; it never makes final decisions.
            </p>
            <a href="/track" className="text-sm font-semibold text-emerald-300 transition hover:text-emerald-200">Track a request →</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
