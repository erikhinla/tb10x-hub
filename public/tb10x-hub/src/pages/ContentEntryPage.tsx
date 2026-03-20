import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AssetPreviewCard from "../components/social/AssetPreviewCard";
import {
  type ContentSeries,
  getContentEntryBySlug,
} from "../content/registry";
import { seriesMeta } from "../content/series";

type ContentEntryPageProps = {
  series: ContentSeries;
};

const ContentEntryPage = ({ series }: ContentEntryPageProps) => {
  const { slug = "" } = useParams();
  const meta = seriesMeta[series];
  const entry = getContentEntryBySlug(series, slug);
  const [shareMessage, setShareMessage] = useState("");
  const hasPlayableVideo = Boolean(entry?.mediaType === "video" && entry?.videoUrl);
  const previewMediaType = hasPlayableVideo
    ? "video"
    : entry?.visualPreviewRef || entry?.imageUrl
      ? "image"
      : entry?.mediaType;

  const handleCopyShareLink = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
        setShareMessage("Link copied.");
        return;
      }
      throw new Error("clipboard unavailable");
    } catch {
      const fallback = window.prompt("Copy this link:", window.location.href);
      if (fallback !== null) {
        setShareMessage("Link ready to copy.");
      }
    }
  };

  if (!entry || entry.status !== "published") {
    return (
      <main className="min-h-screen bg-[#07080a] text-[#efe9df]">
        <div className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-9 md:px-12 lg:px-16">
          <div className="border border-[#c4beaf]/20 bg-[#0a0c10]/72 p-6">
            <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#8e939f]">
              CONTENT ENTRY
            </p>
            <h1 className="mt-4 text-[clamp(1.5rem,4vw,2.2rem)] font-[620] uppercase tracking-[0.08em] text-[#f2eee5]">
              Entry not available
            </h1>
            <p className="mt-3 text-sm leading-relaxed tracking-[0.04em] text-[#c6c9cf]">
              This entry is not published or does not exist.
            </p>
            <div className="mt-5 flex gap-3">
              <Link
                to={meta.routeBase}
                className="inline-flex border border-[#d6d0c2]/42 bg-[#0b0d11] px-4 py-2 text-[0.6rem] uppercase tracking-[0.18em] text-[#ece7dc] transition-colors hover:bg-[#11141a]"
              >
                Back to Index
              </Link>
              <Link
                to="/social-assets"
                className="inline-flex border border-[#cbc4b5]/24 bg-[#0a0c10] px-4 py-2 text-[0.6rem] uppercase tracking-[0.18em] text-[#d7d2c8] transition-colors hover:bg-[#11141a]"
              >
                Open Generator
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#07080a] text-[#efe9df]">
      <div className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-9 md:px-12 lg:px-16">
        <header className="border-b border-[#b7b0a2]/20 pb-7">
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#8e939f]">
            CAMPAIGN ENTRY
          </p>
          <p className="mt-3 text-[0.56rem] uppercase tracking-[0.22em] text-[#9aa1ae]">
            {meta.label}
          </p>
          {entry.headline ? (
            <h1 className="mt-4 text-[clamp(1.6rem,4.6vw,3rem)] font-[620] uppercase tracking-[0.08em] text-[#f2eee5]">
              {entry.headline}
            </h1>
          ) : null}
          <p className="mt-4 max-w-[65ch] text-[clamp(0.95rem,2vw,1.2rem)] leading-relaxed tracking-[0.04em] text-[#c6c9cf]">
            {entry.supportLine}
          </p>
        </header>

        <section className="pt-8">
          <div className="border border-[#c4beaf]/20 bg-[#090b0f] p-4 sm:p-5">
            <AssetPreviewCard
              context="export"
              className="min-h-[24rem]"
              seriesLabel={meta.label}
              title={entry.templateType}
              headline={entry.headline}
              supportLine={entry.supportLine}
              templateType={entry.templateType}
              mediaType={previewMediaType}
              imageUrl={hasPlayableVideo ? undefined : entry.visualPreviewRef || entry.imageUrl}
              videoUrl={hasPlayableVideo ? entry.videoUrl : undefined}
            />
          </div>
        </section>

        {entry.body ? (
          <section className="pt-8">
            <div className="border-l border-[#d2cbbb]/45 pl-4">
              <p className="text-[0.56rem] uppercase tracking-[0.22em] text-[#9aa1ae]">
                Expanded Body
              </p>
              <p className="mt-4 whitespace-pre-line text-[0.98rem] leading-relaxed tracking-[0.03em] text-[#d3d6dd]">
                {entry.body}
              </p>
            </div>
          </section>
        ) : null}

        <section className="pt-8">
          <div className="flex flex-wrap gap-3">
            <Link
              to={meta.routeBase}
              className="inline-flex border border-[#d6d0c2]/42 bg-[#0b0d11] px-4 py-2 text-[0.6rem] uppercase tracking-[0.18em] text-[#ece7dc] transition-colors hover:bg-[#11141a]"
            >
              Back to {meta.label}
            </Link>
            <button
              type="button"
              onClick={() => void handleCopyShareLink()}
              className="relative z-10 inline-flex cursor-pointer border border-[#cbc4b5]/24 bg-[#0a0c10] px-4 py-2 text-[0.6rem] uppercase tracking-[0.18em] text-[#d7d2c8] transition-colors hover:bg-[#11141a]"
            >
              Copy Share Link
            </button>
            {shareMessage ? (
              <p className="inline-flex items-center text-[0.55rem] uppercase tracking-[0.16em] text-[#9097a4]">
                {shareMessage}
              </p>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ContentEntryPage;

