import React from "react";

type SeriesLanePanelProps = {
  title: string;
  purpose: string;
  sampleUseCase: string;
};

const SeriesLanePanel = ({
  title,
  purpose,
  sampleUseCase,
}: SeriesLanePanelProps) => {
  return (
    <article className="border border-[#c4beaf]/22 bg-[#0b0d11]/65 p-4">
      <h3 className="text-[0.68rem] uppercase tracking-[0.2em] text-[#ece7dc]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed tracking-[0.03em] text-[#b7b8bd]">
        {purpose}
      </p>
      <p className="mt-3 text-[0.62rem] uppercase tracking-[0.16em] text-[#9298a4]">
        Sample use case: {sampleUseCase}
      </p>
    </article>
  );
};

export default SeriesLanePanel;
