import React from "react";

const fogSignals = [
  "Too many tools.",
  "Trapped knowledge.",
  "Manual dependency.",
  "Missing architecture.",
  "Low visibility.",
  "Stalled momentum.",
];

const DigitalFogSection = () => {
  return (
    <section
      aria-label="Digital Fog diagnosis"
      className="relative overflow-hidden bg-[#06070a] text-[#efe9df]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_18%_14%,rgba(170,182,210,0.05),rgba(6,7,10,0)_48%),radial-gradient(95%_80%_at_84%_86%,rgba(131,146,176,0.05),rgba(6,7,10,0)_50%)]"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-9 sm:py-20 md:px-12 lg:px-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
          <header className="max-w-3xl">
            <p className="text-[0.64rem] uppercase tracking-[0.23em] text-[#8f949f]">
              DIAGNOSIS
            </p>
            <h2 className="mt-5 text-[clamp(2rem,6vw,4.4rem)] font-[640] uppercase leading-[0.95] tracking-[0.08em] text-[#f2eee5]">
              DIGITAL FOG
            </h2>
          </header>

          <div className="grid content-start gap-3 border-l border-[#c7c2b4]/25 pl-4 sm:pl-6">
            {fogSignals.map((line) => (
              <p
                key={line}
                className="text-[clamp(0.95rem,1.9vw,1.18rem)] font-light tracking-[0.08em] text-[#cfccc4]"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalFogSection;
