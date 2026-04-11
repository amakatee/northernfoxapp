import React from "react";

export default function HireUs() {
  return (
    <section className="relative flex justify-center px-4 py-24 bg-[#020617]">
      <div className="relative w-full max-w-5xl rounded-3xl p-[1px] hire-border">
        <div className="relative z-10 rounded-3xl bg-[#030712] p-8 md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 mb-3">
            Hire Us
          </p>

          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 max-w-2xl">
            Hire a UI/UX design team that feels in‑house, performs like an agency.
          </h2>

          <p className="text-slate-400 max-w-xl mb-10">
            Plug our senior product designers into your workflow. We deliver
            scalable design systems, polished interfaces, and frictionless
            collaboration — without the overhead of hiring full‑time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-[11px] uppercase tracking-[0.15em] text-slate-200 mb-2 font-semibold">
                Models
              </p>
              <p className="text-slate-400 text-sm">
                Dedicated designer, PTaaS team, or full product squad.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-[11px] uppercase tracking-[0.15em] text-slate-200 mb-2 font-semibold">
                Engagement
              </p>
              <p className="text-slate-400 text-sm">
                Flexible monthly subscription with transparent scope.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-[11px] uppercase tracking-[0.15em] text-slate-200 mb-2 font-semibold">
                Outcomes
              </p>
              <p className="text-slate-400 text-sm">
                Faster releases, higher usability, and dev‑ready design.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-500/30 hover:brightness-110 transition"
            >
              Book a free consultation
            </a>

            <button className="px-6 py-3 rounded-full border border-white/20 text-white text-sm hover:bg-white/10 transition">
              View case studies
            </button>
          </div>

          <p className="text-xs text-slate-500">
            Available across time zones · Seamless dev handoff · NDA‑friendly
          </p>
        </div>
      </div>
    </section>
  );
}
