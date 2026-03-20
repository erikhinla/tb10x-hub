import React from "react";

type AssetPreviewCardProps = {
  seriesLabel: string;
  title: string;
  headline: string;
  supportLine: string;
  templateType: string;
  mediaType?: "image" | "video";
  imageUrl?: string;
  videoUrl?: string;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  context?: "hub" | "export";
  className?: string;
};

const AssetPreviewCard = ({
  seriesLabel,
  title,
  headline,
  supportLine,
  templateType,
  mediaType = "image",
  imageUrl,
  videoUrl,
  videoRef,
  context = "hub",
  className = "",
}: AssetPreviewCardProps) => {
  const normalizedTitle = title.toLowerCase();
  const isActiveTemplate = templateType.toLowerCase() === normalizedTitle;
  const frameClass = isActiveTemplate
    ? "border-[#ddd6c8]/50"
    : "border-[#cbc4b5]/24";
  const hasImage = mediaType === "image" && Boolean(imageUrl);
  const hasVideo = mediaType === "video" && Boolean(videoUrl);
  const hasHeadline = headline.trim().length > 0;

  const sharedMeta = (
    <div className="mt-6 border-t border-[#b8b1a2]/18 pt-3 text-[0.56rem] uppercase tracking-[0.18em] text-[#8c939f]">
      <p>Series: {seriesLabel}</p>
      <p className="mt-1">Template: {title}</p>
    </div>
  );

  if (normalizedTitle === "quote card") {
    return (
      <article
        className={`relative overflow-hidden bg-[#0a0c10]/80 p-5 ${frameClass} border ${className}`.trim()}
      >
        {hasImage ? (
          <>
            <img
              src={imageUrl}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-28"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,8,10,0.28),rgba(7,8,10,0.82))]"
            />
          </>
        ) : null}
        {hasVideo ? (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              crossOrigin="anonymous"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-36"
              muted
              loop
              autoPlay
              playsInline
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,8,10,0.24),rgba(7,8,10,0.82))]"
            />
          </>
        ) : null}
        <div className="min-h-[18rem] sm:min-h-[20rem]">
          <p className="text-[0.6rem] uppercase tracking-[0.22em] text-[#949aa7]">
            Quote Card
          </p>
          {hasHeadline ? (
            <h3 className="mt-10 max-w-[18ch] text-[clamp(1.45rem,3.2vw,2.2rem)] font-[630] uppercase leading-[1.04] tracking-[0.07em] text-[#f2ede4]">
              {headline}
            </h3>
          ) : null}
          <p
            className={`${hasHeadline ? "mt-6" : "mt-10"} max-w-[30ch] text-sm leading-relaxed tracking-[0.04em] text-[#c6c8ce]`}
          >
            {supportLine}
          </p>
        </div>
        {context === "hub" ? sharedMeta : null}
      </article>
    );
  }

  if (normalizedTitle === "daily truth editorial cover") {
    return (
      <article
        className={`relative overflow-hidden bg-[#0a0c10]/84 p-5 ${frameClass} border ${className}`.trim()}
      >
        {hasImage ? (
          <div className="pointer-events-none absolute right-4 top-4 h-24 w-20 overflow-hidden border border-[#d8d0c0]/35 sm:h-28 sm:w-24">
            <img src={imageUrl} alt="" className="h-full w-full object-cover opacity-75" />
          </div>
        ) : null}
        {hasVideo ? (
          <div className="pointer-events-none absolute right-4 top-4 h-24 w-20 overflow-hidden border border-[#d8d0c0]/35 sm:h-28 sm:w-24">
            <video
              ref={videoRef}
              src={videoUrl}
              crossOrigin="anonymous"
              className="h-full w-full object-cover opacity-82"
              muted
              loop
              autoPlay
              playsInline
            />
          </div>
        ) : null}
        <div className="border-b border-[#d8d0c0]/30 pb-3">
          <p className="text-[0.56rem] uppercase tracking-[0.25em] text-[#9aa1ae]">
            THE DAILY TRUTH
          </p>
          <p className="mt-2 text-[0.55rem] uppercase tracking-[0.2em] text-[#838b99]">
            Editorial Expose Format
          </p>
        </div>
        <div className="mt-4 grid gap-4">
          {hasHeadline ? (
            <h3 className="text-[clamp(1.35rem,3.2vw,2rem)] font-[650] uppercase leading-[1.03] tracking-[0.075em] text-[#f2ede4]">
              {headline}
            </h3>
          ) : null}
          <p className="border-l border-[#d2cbbb]/45 pl-3 text-sm leading-relaxed tracking-[0.04em] text-[#c5c8ce]">
            {supportLine}
          </p>
          <p className="text-[0.58rem] uppercase tracking-[0.2em] text-[#8d95a3]">
            Series lane: {seriesLabel}
          </p>
        </div>
        {context === "hub" ? sharedMeta : null}
      </article>
    );
  }

  if (
    normalizedTitle === "architecture files poster" ||
    normalizedTitle === "infrastructure files poster"
  ) {
    return (
      <article
        className={`relative overflow-hidden bg-[#090b0f]/86 p-5 ${frameClass} border ${className}`.trim()}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(157,167,186,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(157,167,186,0.05)_1px,transparent_1px)] bg-[size:22px_22px]"
        />
        {hasImage ? (
          <div className="pointer-events-none absolute bottom-4 right-4 h-20 w-28 overflow-hidden border border-[#9ca7bc]/35 sm:h-24 sm:w-32">
            <img src={imageUrl} alt="" className="h-full w-full object-cover opacity-65" />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,11,15,0.08),rgba(9,11,15,0.62))]"
            />
          </div>
        ) : null}
        {hasVideo ? (
          <div className="pointer-events-none absolute bottom-4 right-4 h-20 w-28 overflow-hidden border border-[#9ca7bc]/35 sm:h-24 sm:w-32">
            <video
              ref={videoRef}
              src={videoUrl}
              crossOrigin="anonymous"
              className="h-full w-full object-cover opacity-72"
              muted
              loop
              autoPlay
              playsInline
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,11,15,0.08),rgba(9,11,15,0.62))]"
            />
          </div>
        ) : null}
        <div className="relative">
          <p className="text-[0.56rem] uppercase tracking-[0.23em] text-[#9aa2b0]">
            INFRASTRUCTURE FILES
          </p>
          <div className="mt-3 flex items-center gap-2">
            <span className="h-px w-14 bg-[#9ca7bc]/45" />
            <span className="text-[0.54rem] uppercase tracking-[0.2em] text-[#8f97a6]">
              STRUCTURE MAP
            </span>
          </div>
          {hasHeadline ? (
            <h3 className="mt-5 text-[clamp(1.2rem,2.9vw,1.85rem)] font-[620] uppercase leading-[1.08] tracking-[0.07em] text-[#ece9e1]">
              {headline}
            </h3>
          ) : null}
          <p
            className={`${hasHeadline ? "mt-4" : "mt-5"} max-w-[34ch] text-sm leading-relaxed tracking-[0.04em] text-[#c1c6cf]`}
          >
            {supportLine}
          </p>
          <p className="mt-5 text-[0.55rem] uppercase tracking-[0.2em] text-[#87909f]">
            ACTIVE LANE: {seriesLabel}
          </p>
        </div>
        {context === "hub" ? sharedMeta : null}
      </article>
    );
  }

  return (
    <article
      className={`relative overflow-hidden bg-[#0a0c10]/84 p-5 ${frameClass} border ${className}`.trim()}
    >
      {hasImage ? (
        <>
          <img
            src={imageUrl}
            alt=""
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-48"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,8,10,0.22),rgba(7,8,10,0.84))]"
          />
        </>
      ) : null}
      {hasVideo ? (
        <>
          <video
            ref={videoRef}
            src={videoUrl}
            crossOrigin="anonymous"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-54"
            muted
            loop
            autoPlay
            playsInline
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,8,10,0.22),rgba(7,8,10,0.84))]"
          />
        </>
      ) : null}
      <div className="relative overflow-hidden border border-[#d4cdbc]/20 p-4">
        <p className="text-[0.56rem] uppercase tracking-[0.24em] text-[#9aa0ad]">
          FALSE BELIEF SYSTEMS
        </p>
        <p className="mt-2 text-[0.55rem] uppercase tracking-[0.2em] text-[#89909f]">
          Myth-collapse poster
        </p>
        {hasHeadline ? (
          <h3 className="mt-5 text-[clamp(1.25rem,3vw,1.9rem)] font-[630] uppercase leading-[1.08] tracking-[0.07em] text-[#f1ede4]">
            {headline}
          </h3>
        ) : null}
        <p
          className={`${hasHeadline ? "mt-4" : "mt-5"} max-w-[32ch] border-l border-[#d0c8b7]/38 pl-3 text-sm leading-relaxed tracking-[0.04em] text-[#c4c7cd]`}
        >
          {supportLine}
        </p>
        <p className="mt-5 text-[0.57rem] uppercase tracking-[0.19em] text-[#8d95a3]">
          Symbol lane: {seriesLabel}
        </p>
      </div>
      {context === "hub" ? (
        <>
          <p className="mt-4 text-[0.6rem] uppercase tracking-[0.2em] text-[#7f8897]">
            Template: {title}
          </p>
          <p className="mt-1 text-[0.58rem] uppercase tracking-[0.19em] text-[#7f8897]">
            Active selection: {templateType}
          </p>
          <p className="mt-2 text-[0.58rem] uppercase tracking-[0.19em] text-[#7f8897]">
            Series input: {seriesLabel}
          </p>
        </>
      ) : null}
    </article>
  );
};

export default AssetPreviewCard;
