import React from "react";

type HeroProps = {
  className?: string;
  onPrimaryCtaClick?: () => void;
};

const Hero = ({ className = "", onPrimaryCtaClick }: HeroProps) => {
  const backgroundAtmosphere =
    "pointer-events-none absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_8%,rgba(210,218,232,0.06),rgba(7,8,10,0)_45%),radial-gradient(95%_70%_at_82%_88%,rgba(132,145,174,0.04),rgba(7,8,10,0)_50%)]";
  const backgroundVignette =
    "pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,rgba(255,255,255,0.02),rgba(7,8,10,0)_52%),linear-gradient(to_bottom,rgba(0,0,0,0.28),rgba(0,0,0,0.5))]";
  const ctaPlate =
    "group relative mt-11 sm:mt-12 lg:mt-14 inline-flex items-center justify-center px-7 py-3.5 sm:px-9 sm:py-4 text-[0.72rem] sm:text-[0.76rem] font-medium uppercase tracking-[0.17em] sm:tracking-[0.185em] text-[#efe9df] transition-all duration-300 ease-out hover:text-[#f7f2e8] hover:tracking-[0.195em] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d8d2c3]/55";

  return (
    <section
      aria-label="Campaign hero"
      className={`relative min-h-screen overflow-hidden bg-[#07080a] text-[#f1ede3] ${className}`.trim()}
    >
      <div aria-hidden="true" className={backgroundAtmosphere} />
      <div aria-hidden="true" className={backgroundVignette} />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-6 pt-8 sm:px-9 sm:pb-8 sm:pt-10 md:px-12 md:pb-10 lg:px-16 lg:pb-14 lg:pt-12">
        <main className="flex flex-1 flex-col items-center justify-center text-center">
          <h1 className="max-w-6xl text-[clamp(2.4rem,11.2vw,8.3rem)] font-[650] uppercase leading-[0.92] tracking-[0.08em] text-[#f4f0e7] sm:leading-[0.9] sm:tracking-[0.085em]">
            <span className="block leading-[0.98]">
              THEY<span className="-mx-[0.02em] inline-block">&apos;</span>RE LYING
            </span>
            <span className="mt-[0.08em] block">
              TO YOU
              <span className="-ml-[0.015em] inline-block">.</span>
            </span>
          </h1>

          <p className="mt-5 max-w-[34rem] text-[clamp(0.82rem,1.95vw,1.2rem)] font-light leading-[1.75] tracking-[0.135em] text-[#cbc9c2] sm:mt-[1.375rem] sm:tracking-[0.145em]">
            Intelligence isn&apos;t in the tools.
            <br />
            It&apos;s in the infrastructure.
          </p>

          <button
            type="button"
            className={ctaPlate}
            onClick={onPrimaryCtaClick}
            aria-label="Establish context architecture"
          >
            <span className="absolute inset-0 bg-[#0c0d10]/38 transition-all duration-300 ease-out group-hover:bg-[#111317]/54 group-hover:opacity-100" />
            <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-[#d6d0c2]/84 transition-colors duration-300 group-hover:border-[#e6e0d2]/95" />
            <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-[#d6d0c2]/84 transition-colors duration-300 group-hover:border-[#e6e0d2]/95" />
            <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-[#d6d0c2]/84 transition-colors duration-300 group-hover:border-[#e6e0d2]/95" />
            <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-[#d6d0c2]/84 transition-colors duration-300 group-hover:border-[#e6e0d2]/95" />
            <span className="absolute left-4 right-4 top-0 h-px bg-[linear-gradient(to_right,transparent,rgba(214,208,194,0.2),transparent)] transition-opacity duration-300 group-hover:opacity-[0.85]" />
            <span className="absolute bottom-0 left-4 right-4 h-px bg-[linear-gradient(to_right,transparent,rgba(214,208,194,0.2),transparent)] transition-opacity duration-300 group-hover:opacity-[0.85]" />
            <span className="relative">ESTABLISH CONTEXT ARCHITECTURE</span>
          </button>
        </main>

        <div className="grid grid-cols-2 items-end gap-3 text-[0.56rem] uppercase tracking-[0.19em] sm:gap-4 sm:text-[0.63rem] md:text-[0.68rem]">
          <div className="justify-self-start text-[#a7a8ad]">
            <p>WHAT CONTEXT ENABLES</p>
            <div className="mt-2 h-px w-32 bg-[repeating-linear-gradient(to_right,rgba(185,188,196,0.44)_0,rgba(185,188,196,0.44)_6px,transparent_6px,transparent_12px)] sm:w-36 md:w-40" />
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
