import {
  ArrowRight,
  Check,
  ClipboardCheck,
  FileSearch,
  LockKeyhole,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";

const benefits = [
  {
    icon: FileSearch,
    title: "Know where things stand",
    text: "Follow your request from submission to official response with a clear application timeline.",
  },
  {
    icon: MessageSquareText,
    title: "Helpful at every step",
    text: "Get a straightforward place to submit your request, share documents, and receive updates.",
  },
  {
    icon: LockKeyhole,
    title: "People stay in control",
    text: "AI can assist with research and drafts, while authorised officers make every final decision.",
  },
];

const steps = [
  ["01", "Submit your request", "Tell us what information or records you are looking for."],
  ["02", "Follow its progress", "Use your account to check updates and the application timeline."],
  ["03", "Receive an official reply", "Read the reviewed response and download it when it is ready."],
];

export default function Home() {
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-[#f7faf9] to-sky-50" />
        <div className="absolute -right-36 top-12 -z-10 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:py-24 lg:grid-cols-[1.08fr_.92fr] lg:gap-16 lg:py-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3.5 py-1.5 text-xs font-bold tracking-wide text-emerald-800 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              A clearer way to use your right to information
            </p>
            <h1 className="mt-6 max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Ask with confidence.
              <span className="mt-1 block text-emerald-700">Stay in the know.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Submit and follow RTI applications in one secure place. Know what happens next, and get notified when there is an update.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn-primary !rounded-xl !px-5 !py-3" href="/register">
                Start an application <ArrowRight size={17} />
              </a>
              <a className="btn-secondary !rounded-xl !px-5 !py-3" href="/track">
                Track a request
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-slate-600">
              {["Secure by design", "Officer-reviewed responses", "Updates you can follow"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Check className="text-emerald-700" size={15} strokeWidth={2.5} /> {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-emerald-200/60 to-sky-200/60 blur-xl" />
            <div className="card relative overflow-hidden rounded-3xl !border-white/80 p-5 shadow-[0_30px_80px_-28px_rgba(15,71,60,0.28)] sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Your request, at a glance</p>
                  <h2 className="mt-2 text-lg font-bold text-slate-900">Application progress</h2>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <ClipboardCheck size={22} />
                </span>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-bold text-slate-500">RTI-2026-••••••</span>
                  <span className="rounded-full bg-sky-100 px-2.5 py-1 text-[11px] font-bold text-sky-800">Under review</span>
                </div>
                <p className="mt-3 font-semibold leading-6 text-slate-800">Request for public works records</p>
                <p className="mt-1 text-sm text-slate-500">Submitted securely · Timeline available</p>
              </div>

              <ol className="mt-6 space-y-5">
                {[
                  ["Request submitted", "Your application is safely on record.", true],
                  ["Department review", "The responsible team is reviewing it.", true],
                  ["Official response", "We’ll let you know when it’s ready.", false],
                ].map(([title, detail, complete], index) => (
                  <li key={title} className="flex gap-3.5">
                    <span className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-full ${complete ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"}`}>
                      {complete ? <Check size={15} strokeWidth={2.5} /> : <span className="h-2 w-2 rounded-full bg-slate-400" />}
                      {index < 2 && <span className="absolute left-1/2 top-8 h-5 w-px -translate-x-1/2 bg-slate-200" />}
                    </span>
                    <span className="pt-0.5">
                      <span className="block text-sm font-semibold text-slate-800">{title}</span>
                      <span className="mt-0.5 block text-xs leading-5 text-slate-500">{detail}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/70 px-3.5 py-3 text-xs leading-5 text-emerald-900">
                <ShieldCheck className="shrink-0 text-emerald-700" size={17} />
                Only an authorised officer can issue an official response.
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-lg sm:flex">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-sky-50 text-sky-700"><FileSearch size={17} /></span>
              Clear updates, all in one place
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Designed around your request</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Information access, made simpler.</h2>
          <p className="mt-4 leading-7 text-slate-600">A more organised experience for citizens and the teams responsible for responding.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }, index) => (
            <article key={title} className="card group p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-7">
              <span className={`mb-5 grid h-12 w-12 place-items-center rounded-2xl ${index === 1 ? "bg-sky-50 text-sky-700" : "bg-emerald-50 text-emerald-700"}`}>
                <Icon size={22} />
              </span>
              <h3 className="text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-20">
        <div className="overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 text-white sm:px-10 sm:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">A straightforward process</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">From question to response.</h2>
            </div>
            <a href="/register" className="btn !rounded-xl !bg-white !px-5 !py-3 !text-slate-900 hover:!bg-emerald-50">
              Create your account <ArrowRight size={16} />
            </a>
          </div>
          <div className="mt-9 grid gap-6 border-t border-white/10 pt-7 md:grid-cols-3">
            {steps.map(([number, title, text]) => (
              <article key={number} className="flex gap-4">
                <span className="pt-0.5 font-mono text-sm font-bold text-emerald-300">{number}</span>
                <div>
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-400">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
