import React from "react";
import { Link } from "react-router-dom";
import {
  type ContentSeries,
  listContentEntries,
} from "../content/registry";
import { seriesMeta } from "../content/series";

type ContentIndexPageProps = {
  series: ContentSeries;
};

const ContentIndexPage = ({ series }: ContentIndexPageProps) => {
  const meta = seriesMeta[series];
  const entries = listContentEntries({
    series,
    status: "published",
  });

  return (
    <main className="min-h-screen bg-[#07080a] text-[#efe9df]">
      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-9 md:px-12 lg:px-16">
        <header className="border-b border-[#b7b0a2]/20 pb-6">
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#8e939f]">
            CAMPAIGN CONTENT INDEX
          </p>
          <h1 className="mt-4 text-[clamp(1.6rem,4.6vw,3rem)] font-[620] uppercase tracking-[0.08em] text-[#f2eee5]">
            {meta.label}
          </h1>
          <p className="mt-3 text-[0.7rem] uppercase tracking-[0.18em] text-[#9aa0ad]">
            Shareable entries ready for review and distribution.
          </p>
        </header>

        <section className="pt-8">
          {entries.length === 0 ? (
            <div className="border border-[#c4beaf]/20 bg-[#0a0c10]/72 p-5">
              <p className="text-sm tracking-[0.06em] text-[#c6c9cf]">
                No published entries yet. Publish from Social Asset Hub in Public
                Article mode.
              </p>
              <Link
                to="/social-assets"
                className="mt-4 inline-flex border border-[#d6d0c2]/42 bg-[#0b0d11] px-4 py-2 text-[0.6rem] uppercase tracking-[0.18em] text-[#ece7dc] transition-colors hover:bg-[#11141a]"
              >
                Open Generator
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {entries.map((entry) => (
                <article
                  key={entry.id}
                  className="border border-[#cbc4b5]/24 bg-[#0a0c10]/82 p-5"
                >
                  <p className="text-[0.56rem] uppercase tracking-[0.22em] text-[#9aa1ae]">
                    {meta.deckTag}
                  </p>
                  {entry.headline ? (
                    <h2 className="mt-3 text-[clamp(1.2rem,2.8vw,1.8rem)] font-[640] uppercase leading-[1.08] tracking-[0.07em] text-[#f2ede4]">
                      {entry.headline}
                    </h2>
                  ) : null}
                  <p className="mt-3 max-w-[60ch] text-sm leading-relaxed tracking-[0.04em] text-[#c5c8ce]">
                    {entry.supportLine}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-[0.55rem] uppercase tracking-[0.18em] text-[#8f96a3]">
                    <span>{new Date(entry.created_at).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{entry.templateType}</span>
                  </div>
                  <Link
                    to={`${meta.routeBase}/${entry.slug}`}
                    className="mt-4 inline-flex border border-[#d6d0c2]/42 bg-[#0b0d11] px-4 py-2 text-[0.6rem] uppercase tracking-[0.18em] text-[#ece7dc] transition-colors hover:bg-[#11141a]"
                  >
                    Open Entry
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ContentIndexPage;

