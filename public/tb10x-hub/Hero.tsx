import React from "react";

const Hero = () => {
  return (
    <section
      aria-label="Campaign hero"
      className="relative min-h-screen overflow-hidden bg-[#07080a] text-[#f1ede3]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_8%,rgba(210,218,232,0.06),rgba(7,8,10,0)_45%),radial-gradient(95%_70%_at_82%_88%,rgba(132,145,174,0.04),rgba(7,8,10,0)_50%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,rgba(255,255,255,0.02),rgba(7,8,10,0)_52%),linear-gradient(to_bottom,rgba(0,0,0,0.28),rgba(0,0,0,0.5))]"
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-8 pt-10 sm:px-10 sm:pb-10 sm:pt-12 lg:px-16 lg:pb-14">
        <main className="flex flex-1 flex-col items-center justify-center text-center">
          <h1 className="max-w-6xl text-[clamp(2.5rem,12vw,8.8rem)] font-black uppercase leading-[0.9] tracking-[0.055em] text-[#f4f0e7]">
            THEY&apos;RE LYING TO YOU.
          </h1>

          <p className="mt-9 max-w-3xl text-[clamp(0.88rem,2.2vw,1.3rem)] font-light leading-relaxed tracking-[0.15em] text-[#cbc9c2]">
            Intelligence isn&apos;t in the tools.
            <br />
            It&apos;s in the infrastructure.
          </p>

          <button
            type="button"
            className="group relative mt-14 inline-flex items-center justify-center px-9 py-4 text-[0.73rem] font-medium uppercase tracking-[0.2em] text-[#ede8de] transition-colors duration-200 hover:text-[#f7f2e8] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d8d2c3]/45"
          >
            <span className="absolute inset-0 bg-[#0c0d10]/40 transition-colors duration-200 group-hover:bg-[#111317]/50" />
            <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-[#cfc9ba]/55" />
            <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-[#cfc9ba]/55" />
            <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-[#cfc9ba]/55" />
            <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-[#cfc9ba]/55" />
            <span className="relative">
              ESTABLISH CONTEXT ARCHITECTURE
            </span>
          </button>
        </main>

        <div className="grid grid-cols-2 items-end gap-4 text-[0.62rem] uppercase tracking-[0.2em] sm:text-[0.68rem]">
          <div className="justify-self-start text-[#a7a8ad]">
            <p>WHAT CONTEXT ENABLES</p>
            <div className="mt-2 h-px w-28 bg-[repeating-linear-gradient(to_right,rgba(185,188,196,0.44)_0,rgba(185,188,196,0.44)_5px,transparent_5px,transparent_10px)]" />
          </div>
          <p className="justify-self-end text-right text-[#8f949f]">
            CLARITY | DIRECTION | MOMENTUM
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
