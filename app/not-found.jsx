import Link from "next/link";

export default function NotFound(){
  return (
    <main className="mx-auto grid min-h-[70vh] max-w-2xl place-items-center px-5 text-center">
      <div className="card p-8">
        <p className="text-sm font-bold tracking-widest text-emerald-700">404</p>
        <h1 className="mt-2 text-3xl font-bold text-navy">Page not found</h1>
        <p className="mt-3 text-slate-600">The requested RTI portal page does not exist.</p>
        <Link className="btn-primary mt-6" href="/">Return home</Link>
      </div>
    </main>
  );
}
