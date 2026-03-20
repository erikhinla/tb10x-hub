import React, { useEffect, useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import AssetPreviewCard from "../components/social/AssetPreviewCard";
import CopyBankGroup from "../components/social/CopyBankGroup";
import SeriesLanePanel from "../components/social/SeriesLanePanel";
import {
  createContentEntry,
  listContentEntries,
  publishContentEntry,
  syncContentEntry,
  type ContentMode,
  type ContentSeries,
} from "../content/registry";
import { seriesMeta } from "../content/series";

const overviewLines = [
  "THEY'RE LYING TO YOU.",
  "Intelligence isn't in the tools. It's in the infrastructure.",
  "It's in the infra.",
  "Digital Fog",
  "Tool Drool",
  "Dr. Drool",
  "Infra4All",
  "Architecture Empire",
];

const seriesLanes = [
  {
    title: "THE DAILY TRUTH",
    purpose:
      "Use for editorial / front-page style campaign assets and false narrative exposes",
    sampleUseCase: "False narrative front-page breakdown",
  },
  {
    title: "INFRASTRUCTURE FILES",
    purpose:
      "Use for blueprint visuals, system overlays, and infrastructure explainers",
    sampleUseCase: "Context architecture explainer poster",
  },
  {
    title: "FALSE BELIEF SYSTEMS",
    purpose:
      "Use for Santa / Tooth Fairy / Bigfoot / myth-collapse concepts",
    sampleUseCase: "Myth-collapse comparison campaign tile",
  },
];

const copyBank = {
  hook: ["THEY'RE LYING TO YOU.", "WHERE'S THE INTELLIGENCE?"],
  thesis: [
    "Intelligence isn't in the tools. It's in the infrastructure.",
    "It's in the infra.",
  ],
  diagnosis: [
    "Digital Fog is what happens when tools replace systems.",
    "Tool Drool",
    "Dr. Drool",
  ],
  payoff: [
    "Context creates clarity. Architecture creates momentum.",
    "It's in the infra.",
  ],
};

const headlineOptions = [
  "THEY'RE LYING TO YOU.",
  "WHERE'S THE INTELLIGENCE?",
  "It's in the infra.",
];
const supportOptions = [
  "Intelligence isn't in the tools. It's in the infrastructure.",
  "Digital Fog",
  "You were sold tools. What you needed was architecture.",
  "The tools aren't the system. The architecture is.",
  "Execution fails where context is missing.",
  "Context creates clarity. Architecture creates momentum.",
];
const seriesOptions = [
  "THEY'RE LYING TO YOU",
  "TOOL DROOL",
  "IT'S IN THE INFRA",
  "THE DAILY TRUTH",
  "INFRASTRUCTURE FILES",
  "FALSE BELIEF SYSTEMS",
  "WHERE'S THE INTELLIGENCE?",
];
const templateOptions = [
  "Quote card",
  "Daily Truth editorial cover",
  "Infrastructure Files poster",
  "Myth-collapse poster",
];
const ratioPresets = [
  { id: "1080x1350", label: "1080x1350 portrait", aspectClass: "aspect-[1080/1350]" },
  { id: "1080x1080", label: "1080x1080 square", aspectClass: "aspect-square" },
  { id: "1920x1080", label: "1920x1080 landscape", aspectClass: "aspect-video" },
  { id: "1080x1920", label: "1080x1920 story / reel cover", aspectClass: "aspect-[9/16]" },
] as const;
const publishSeriesOptions: Array<{ value: ContentSeries; label: string }> = [
  { value: "daily-truth", label: "THE DAILY TRUTH" },
  { value: "architecture-files", label: "INFRASTRUCTURE FILES" },
  { value: "false-belief-systems", label: "FALSE BELIEF SYSTEMS" },
];

type CopyBankKey = keyof typeof copyBank;
type RatioPresetId = (typeof ratioPresets)[number]["id"];
type MediaType = "image" | "video";
type HubPreset = {
  templateType: string;
  headline: string;
  supportLine: string;
  seriesLabel: string;
  mediaType: MediaType;
  imageUrlInput: string;
  videoUrlInput: string;
  ratioPreset: RatioPresetId;
};
type GeneratedSnapshot = HubPreset & {
  body: string;
  mode: ContentMode;
  series: ContentSeries;
};

const BIZBRAIN_API_ORIGIN = (import.meta.env.VITE_BIZBRAIN_API_ORIGIN ?? "").trim();
const BIZBRAIN_API_TOKEN = (import.meta.env.VITE_BIZBRAIN_API_TOKEN ?? "").trim();

const SocialAssetHub = () => {
  const [templateType, setTemplateType] = useState(templateOptions[0]);
  const [headline, setHeadline] = useState(headlineOptions[0]);
  const [supportLine, setSupportLine] = useState(supportOptions[0]);
  const [seriesLabel, setSeriesLabel] = useState(seriesOptions[0]);
  const [mediaType, setMediaType] = useState<MediaType>("image");
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
  const [ratioPreset, setRatioPreset] = useState<RatioPresetId>("1080x1350");
  const [contentMode, setContentMode] = useState<ContentMode>("internal_asset");
  const [publishSeries, setPublishSeries] = useState<ContentSeries>("daily-truth");
  const [bodyCopy, setBodyCopy] = useState("");
  const [isExportingPng, setIsExportingPng] = useState(false);
  const [exportMessage, setExportMessage] = useState("");
  const [lastExportFilename, setLastExportFilename] = useState("");
  const [lastExportDataUrl, setLastExportDataUrl] = useState("");
  const [capturedVideoFrame, setCapturedVideoFrame] = useState<string | null>(null);
  const [controlTaskId, setControlTaskId] = useState<string>("");
  const [controlMessage, setControlMessage] = useState("");
  const [isSyncingControl, setIsSyncingControl] = useState(false);
  const [generatedSnapshot, setGeneratedSnapshot] = useState<GeneratedSnapshot | null>(
    null,
  );
  const [flowMessage, setFlowMessage] = useState("");
  const [recentPublishedId, setRecentPublishedId] = useState<string>("");
  const exportStageRef = useRef<HTMLDivElement | null>(null);
  const exportVideoRef = useRef<HTMLVideoElement | null>(null);
  const previewSectionRef = useRef<HTMLElement | null>(null);

  const previews = useMemo(
    () => [
      { title: "Quote card", kicker: seriesLabel },
      { title: "Daily Truth editorial cover", kicker: "THE DAILY TRUTH" },
      { title: "Infrastructure Files poster", kicker: "INFRASTRUCTURE FILES" },
      { title: "Myth-collapse poster", kicker: "FALSE BELIEF SYSTEMS" },
    ],
    [seriesLabel],
  );
  const selectedPreview = useMemo(
    () =>
      previews.find(
        (preview) =>
          preview.title.toLowerCase() ===
          templateType
            .toLowerCase()
            .replace("architecture files", "infrastructure files"),
      ) ?? previews[0],
    [previews, templateType],
  );
  const selectedRatio = useMemo(
    () =>
      ratioPresets.find((preset) => preset.id === ratioPreset) ?? ratioPresets[0],
    [ratioPreset],
  );
  const activeImageUrl = uploadedImageUrl || imageUrlInput.trim();
  const activeVideoUrl = uploadedVideoUrl || videoUrlInput.trim();
  const activeMediaUrl = mediaType === "image" ? activeImageUrl : activeVideoUrl;
  const exportMediaType = mediaType;
  const exportImageUrl =
    mediaType === "video"
      ? (capturedVideoFrame ?? activeImageUrl ?? undefined)
      : (activeImageUrl ?? undefined);
  const exportVideoUrl = mediaType === "video" ? activeVideoUrl : undefined;
  const publishedCounts = {
    dailyTruth: listContentEntries({ series: "daily-truth", status: "published" }).length,
    architectureFiles: listContentEntries({
      series: "architecture-files",
      status: "published",
    }).length,
    falseBeliefSystems: listContentEntries({
      series: "false-belief-systems",
      status: "published",
    }).length,
  };

  const buildControlHeaders = () => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (BIZBRAIN_API_TOKEN) {
      headers["x-api-token"] = BIZBRAIN_API_TOKEN;
    }
    return headers;
  };

  const currentPreset = (): HubPreset => ({
    templateType,
    headline,
    supportLine,
    seriesLabel,
    mediaType,
    imageUrlInput,
    videoUrlInput,
    ratioPreset,
  });

  const inferDiagnosisReferences = (head: string, support: string) => {
    const joined = `${head} ${support}`.toLowerCase();
    const refs: string[] = [];
    if (joined.includes("digital fog")) {
      refs.push("Digital Fog");
    }
    if (joined.includes("tool drool") || joined.includes("dr. drool")) {
      refs.push("Tool Drool");
    }
    return refs;
  };

  const inferThesisReferences = (head: string, support: string) => {
    const joined = `${head} ${support}`.toLowerCase();
    const refs: string[] = [];
    if (
      joined.includes("intelligence isn't in the tools") ||
      joined.includes("it's in the infrastructure")
    ) {
      refs.push("Intelligence isn't in the tools. It's in the infrastructure.");
    }
    if (joined.includes("it's in the infra")) {
      refs.push("It's in the infra.");
    }
    return refs;
  };

  const resolveSeriesFromTemplate = (template: string): ContentSeries => {
    const normalized = template.toLowerCase();
    if (normalized.includes("daily truth")) {
      return "daily-truth";
    }
    if (
      normalized.includes("architecture files") ||
      normalized.includes("infrastructure files")
    ) {
      return "architecture-files";
    }
    return "false-belief-systems";
  };

  const handleGenerate = () => {
    const snapshot: GeneratedSnapshot = {
      ...currentPreset(),
      body: bodyCopy.trim(),
      mode: contentMode,
      series: publishSeries,
    };
    setGeneratedSnapshot(snapshot);
    setFlowMessage("Generated snapshot ready.");
  };

  const handlePreview = () => {
    previewSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setFlowMessage("Preview focused.");
  };

  const handlePublish = async () => {
    const source = generatedSnapshot ?? {
      ...currentPreset(),
      body: bodyCopy.trim(),
      mode: contentMode,
      series: publishSeries,
    };
    const diagnosisReferences = inferDiagnosisReferences(
      source.headline,
      source.supportLine,
    );
    const thesisReferences = inferThesisReferences(source.headline, source.supportLine);
    const previewRef = lastExportDataUrl || (await generatePublishPreviewRef());

    const created = createContentEntry({
      series: source.series,
      templateType: source.templateType,
      headline: source.headline,
      supportLine: source.supportLine,
      body: source.body,
      mode: source.mode,
      status: source.mode === "public_article" ? "draft" : "internal_ready",
      diagnosisReferences,
      thesisReferences,
      visualPreviewRef: previewRef || lastExportFilename || undefined,
      mediaType: source.mediaType,
      imageUrl: source.mediaType === "image" ? activeImageUrl || undefined : undefined,
      videoUrl: source.mediaType === "video" ? activeVideoUrl || undefined : undefined,
    });

    let finalEntry = created;
    if (source.mode === "public_article") {
      const published = publishContentEntry(created.id);
      if (published) {
        finalEntry = published;
      }
    }

    setRecentPublishedId(finalEntry.id);
    setFlowMessage(
      source.mode === "public_article"
        ? `Published to /${finalEntry.series}/${finalEntry.slug}`
        : "Internal asset entry saved to registry.",
    );

    if (source.mode === "public_article") {
      const _syncResult = await syncContentEntry(finalEntry.id);
      void _syncResult;
    }
  };

  useEffect(() => {
    return () => {
      if (uploadedImageUrl) {
        URL.revokeObjectURL(uploadedImageUrl);
      }
      if (uploadedVideoUrl) {
        URL.revokeObjectURL(uploadedVideoUrl);
      }
    };
  }, [uploadedImageUrl, uploadedVideoUrl]);

  useEffect(() => {
    if (contentMode === "public_article") {
      setPublishSeries(resolveSeriesFromTemplate(templateType));
    }
  }, [contentMode, templateType]);

  useEffect(() => {
    const hydrateFromControlTask = async () => {
      if (!BIZBRAIN_API_ORIGIN) {
        return;
      }
      const query = new URLSearchParams(window.location.search);
      const queryTaskId = query.get("taskId");
      if (!queryTaskId) {
        return;
      }

      setIsSyncingControl(true);
      setControlMessage("");
      try {
        const response = await fetch(
          `${BIZBRAIN_API_ORIGIN}/v1/tasks/${encodeURIComponent(queryTaskId)}`,
          { headers: buildControlHeaders() },
        );
        if (!response.ok) {
          throw new Error("load failed");
        }
        const task = await response.json();
        const preset = task?.metadata?.hub_preset as Partial<HubPreset> | undefined;
        setControlTaskId(task?.task_id ?? queryTaskId);
        if (preset) {
          if (preset.templateType !== undefined) setTemplateType(preset.templateType);
          if (preset.headline !== undefined) setHeadline(preset.headline);
          if (preset.supportLine !== undefined) setSupportLine(preset.supportLine);
          if (preset.seriesLabel !== undefined) setSeriesLabel(preset.seriesLabel);
          if (preset.mediaType !== undefined) setMediaType(preset.mediaType);
          if (preset.imageUrlInput !== undefined) setImageUrlInput(preset.imageUrlInput);
          if (preset.videoUrlInput !== undefined) setVideoUrlInput(preset.videoUrlInput);
          if (preset.ratioPreset !== undefined) setRatioPreset(preset.ratioPreset);
        }
        setControlMessage("Control preset loaded.");
      } catch {
        setControlMessage("Control preset load failed.");
      } finally {
        setIsSyncingControl(false);
      }
    };

    void hydrateFromControlTask();
  }, []);

  const saveControlSnapshot = async () => {
    if (!BIZBRAIN_API_ORIGIN || isSyncingControl) {
      return;
    }
    setIsSyncingControl(true);
    setControlMessage("");
    try {
      const metadata = { hub_preset: currentPreset() };
      if (!controlTaskId) {
        const createRes = await fetch(`${BIZBRAIN_API_ORIGIN}/v1/tasks`, {
          method: "POST",
          headers: buildControlHeaders(),
          body: JSON.stringify({
            title: "Social Asset Hub working preset",
            source: "hub",
            metadata,
          }),
        });
        if (!createRes.ok) {
          throw new Error("task create failed");
        }
        const created = await createRes.json();
        setControlTaskId(created.task_id);
      } else {
        const updateRes = await fetch(
          `${BIZBRAIN_API_ORIGIN}/v1/tasks/${encodeURIComponent(controlTaskId)}`,
          {
            method: "PATCH",
            headers: buildControlHeaders(),
            body: JSON.stringify({ metadata }),
          },
        );
        if (!updateRes.ok) {
          throw new Error("task update failed");
        }
      }
      setControlMessage("Control snapshot saved.");
    } catch {
      setControlMessage("Control snapshot save failed.");
    } finally {
      setIsSyncingControl(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setImageUrlInput("");
    setUploadedImageUrl((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }
      return URL.createObjectURL(file);
    });
    event.target.value = "";
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setVideoUrlInput("");
    setCapturedVideoFrame(null);
    setUploadedVideoUrl((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }
      return URL.createObjectURL(file);
    });
    event.target.value = "";
  };

  const handleClearImage = () => {
    setImageUrlInput("");
    setUploadedImageUrl((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }
      return null;
    });
  };

  const handleClearVideo = () => {
    setVideoUrlInput("");
    setCapturedVideoFrame(null);
    setUploadedVideoUrl((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }
      return null;
    });
  };

  const captureVideoFrame = async () => {
    const video = exportVideoRef.current;
    if (!video) {
      return null;
    }

    if (video.readyState < 2) {
      await new Promise<void>((resolve) => {
        const onLoadedData = () => {
          video.removeEventListener("loadeddata", onLoadedData);
          resolve();
        };
        video.addEventListener("loadeddata", onLoadedData);
        setTimeout(() => {
          video.removeEventListener("loadeddata", onLoadedData);
          resolve();
        }, 1200);
      });
    }

    if (!video.videoWidth || !video.videoHeight) {
      return null;
    }

    try {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return null;
      }
      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      return canvas.toDataURL("image/png");
    } catch {
      return null;
    }
  };

  const renderPngFromStage = async (mediaOptional = false) => {
    if (!exportStageRef.current) {
      throw new Error("no export stage");
    }
    return toPng(exportStageRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "#07080a",
      filter: mediaOptional
        ? (node) => {
          const tag = (node as HTMLElement).tagName;
          return tag !== "VIDEO";
        }
        : undefined,
    });
  };

  const generatePublishPreviewRef = async () => {
    if (mediaType === "video" && activeVideoUrl && !capturedVideoFrame) {
      const frameDataUrl = await captureVideoFrame();
      if (frameDataUrl) {
        setCapturedVideoFrame(frameDataUrl);
        await new Promise((resolve) => setTimeout(resolve, 150));
      }
    }
    try {
      return await renderPngFromStage(false);
    } catch {
      try {
        return await renderPngFromStage(true);
      } catch {
        return "";
      }
    }
  };

  const handleExportPng = async () => {
    if (!exportStageRef.current || isExportingPng) {
      return;
    }

    setIsExportingPng(true);
    setExportMessage("");

    try {
      let frameCaptureSkipped = false;
      if (mediaType === "video" && activeVideoUrl) {
        const frameDataUrl = await captureVideoFrame();
        if (frameDataUrl) {
          setCapturedVideoFrame(frameDataUrl);
          await new Promise((resolve) => setTimeout(resolve, 80));
        } else {
          frameCaptureSkipped = true;
        }
      }

      let dataUrl = "";
      let usedMediaFallback = false;
      try {
        dataUrl = await renderPngFromStage(false);
      } catch {
        dataUrl = await renderPngFromStage(true);
        usedMediaFallback = true;
      }
      const assetSlug = templateType.toLowerCase().replace(/\s+/g, "-");
      const filename = `${assetSlug}-${ratioPreset}.png`;
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = filename;
      link.click();
      setLastExportFilename(filename);
      setLastExportDataUrl(dataUrl);
      setExportMessage(
        usedMediaFallback
          ? "PNG exported (media omitted due source restrictions)."
          : "PNG exported.",
      );
      if (frameCaptureSkipped && !usedMediaFallback) {
        setExportMessage("PNG exported (frame capture unavailable for this video source).");
      }

      if (BIZBRAIN_API_ORIGIN && controlTaskId) {
        void fetch(`${BIZBRAIN_API_ORIGIN}/v1/artifacts`, {
          method: "POST",
          headers: buildControlHeaders(),
          body: JSON.stringify({
            task_id: controlTaskId,
            type: "image",
            path_or_url: link.download,
            producer_agent: "hub",
            campaign: "tb10x-social-assets",
            metadata: {
              templateType,
              ratioPreset,
              seriesLabel,
              headline,
              supportLine,
            },
          }),
        });
      }
    } catch {
      setExportMessage(
        "PNG export failed. Try uploaded local media, or export with media removed.",
      );
    } finally {
      setIsExportingPng(false);
    }
  };

  const handleExportComposedVideo = async () => {
    if (!exportStageRef.current || !exportVideoRef.current || isExportingPng) return;
    setIsExportingPng(true);
    setExportMessage("Composing Video... Please do not switch tabs.");

    try {
      const stage = exportStageRef.current;
      const video = exportVideoRef.current;

      const originalBgClass = [...stage.classList].find(c => c.startsWith('bg-'));
      if (originalBgClass) stage.classList.remove(originalBgClass);

      const overlayDataUrl = await toPng(stage, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: 'rgba(0,0,0,0)',
        filter: (node) => {
          const tag = (node as HTMLElement).tagName;
          return tag !== "IMG" && tag !== "VIDEO";
        },
      });

      if (originalBgClass) stage.classList.add(originalBgClass);

      const overlayImg = new Image();
      overlayImg.src = overlayDataUrl;
      await new Promise((resolve) => {
        overlayImg.onload = resolve;
      });

      const canvas = document.createElement("canvas");
      const width = video.videoWidth || 1080;
      const height = video.videoHeight || 1920;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get 2d context");

      // Ensure we only create the MediaElementSource once per video element
      // otherwise it throws an error on subsequent export attempts
      if (!(video as any)._audioCtxConnected) {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const sourceNode = audioCtx.createMediaElementSource(video);
        const destNode = audioCtx.createMediaStreamDestination();
        sourceNode.connect(destNode);
        sourceNode.connect(audioCtx.destination);

        (video as any)._audioCtxConnected = true;
        (video as any)._audioTrack = destNode.stream.getAudioTracks()[0];
      }

      const canvasStream = canvas.captureStream(30);
      const audioTrack = (video as any)._audioTrack;
      if (audioTrack) {
        canvasStream.addTrack(audioTrack);
      }

      const mediaRecorder = new MediaRecorder(canvasStream, {
        mimeType: 'video/webm',
      });

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      let isRecording = true;
      let animationFrameId: number;
      const drawFrame = () => {
        if (!ctx || !isRecording) return;
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(video, 0, 0, width, height);
        ctx.drawImage(overlayImg, 0, 0, width, height);
        animationFrameId = requestAnimationFrame(drawFrame);
      };

      const wasLooping = video.loop;
      video.loop = false;
      video.currentTime = 0;

      let endedFired = false;
      let timeoutId: any;

      const finishExport = () => {
        if (endedFired) return;
        endedFired = true;
        clearTimeout(timeoutId);

        if (mediaRecorder.state !== "inactive") {
          mediaRecorder.stop();
        }

        // CRITICAL FIX: To prevent MediaRecorder hang in Chrome/Brave, 
        // explicitly stop all incoming canvas stream tracks.
        canvasStream.getTracks().forEach(track => track.stop());
        video.removeEventListener('ended', finishExport);
      };

      video.addEventListener('ended', finishExport);

      // FAILSAFE: Force the export to resolve slightly after the video ought to finish.
      // This guarantees the UI will never get permanently hung up.
      const maxDuration = (video.duration && isFinite(video.duration) && video.duration > 0) ? video.duration : 60;
      timeoutId = setTimeout(() => {
        console.warn("Failsafe timeout reached for video export, forcing stop.");
        finishExport();
      }, (maxDuration * 1000) + 2000);

      mediaRecorder.onstop = () => {
        isRecording = false;
        cancelAnimationFrame(animationFrameId);

        const blob = new Blob(chunks, { type: 'video/webm' });
        const blobUrl = window.URL.createObjectURL(blob);
        const assetSlug = templateType.toLowerCase().replace(/\s+/g, "-");
        const filename = `${assetSlug}-${ratioPreset}-composed.webm`;

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);

        setIsExportingPng(false);
        setExportMessage("Composed video downloaded successfully.");

        video.loop = wasLooping;
        if (wasLooping) {
          video.play().catch(() => { });
        }
      };

      mediaRecorder.start(100); // 100ms timeslices guarantee chunks aren't flushed at end
      await video.play();
      drawFrame();

    } catch (err) {
      console.error("Composite error:", err);
      setExportMessage("Video composition failed.");
      setIsExportingPng(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#07080a] text-[#efe9df]">
      <div className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-9 md:px-12 lg:px-16 lg:py-10">
        <header className="border-b border-[#b7b0a2]/20 pb-7">
          <p className="text-[0.62rem] uppercase tracking-[0.24em] text-[#8e939f]">
            INTERNAL CAMPAIGN WORKBENCH
          </p>
          <h1 className="mt-4 text-[clamp(1.8rem,4.8vw,3.4rem)] font-[620] uppercase tracking-[0.08em] text-[#f2eee5]">
            Social Asset Hub
          </h1>
          <p className="mt-4 text-[0.58rem] uppercase tracking-[0.17em] text-[#8f96a3]">
            Canon source of truth:
            <span className="ml-2 font-medium text-[#d8d3c9]">
              /PROJECTS/_OS/01-Canon/Campaigns/TB10X_Campaign_Canon_v1.md
            </span>
          </p>
        </header>

        <section className="pt-8">
          <h2 className="text-[0.72rem] uppercase tracking-[0.2em] text-[#a4a8b2]">
            Canon Source
          </h2>
          <div className="mt-4 grid gap-2 border border-[#bdb6a7]/20 bg-[#0a0c10]/72 p-4">
            <p className="text-sm tracking-[0.04em] text-[#e6e2d9]">
              THEY&apos;RE LYING TO YOU.
            </p>
            <p className="text-sm tracking-[0.04em] text-[#c8c9cf]">
              Intelligence isn&apos;t in the tools. It&apos;s in the infrastructure.
            </p>
            <p className="text-sm tracking-[0.04em] text-[#c8c9cf]">
              Digital Fog
            </p>
            <p className="text-sm tracking-[0.04em] text-[#c8c9cf]">
              Tool Drool
            </p>
            <p className="text-sm tracking-[0.04em] text-[#c8c9cf]">
              Dr. Drool
            </p>
            <p className="text-sm tracking-[0.04em] text-[#c8c9cf]">
              It&apos;s in the infra.
            </p>
          </div>
        </section>

        <section className="pt-8">
          <h2 className="text-[0.72rem] uppercase tracking-[0.2em] text-[#a4a8b2]">
            Campaign Overview
          </h2>
          <div className="mt-4 space-y-2">
            {overviewLines.map((line) => (
              <p
                key={line}
                className="text-[clamp(0.95rem,1.8vw,1.18rem)] tracking-[0.06em] text-[#d8d4cb]"
              >
                {line}
              </p>
            ))}
          </div>
        </section>

        <section className="pt-10">
          <h2 className="text-[0.72rem] uppercase tracking-[0.2em] text-[#a4a8b2]">
            Series Lanes
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-1">
            {seriesLanes
              .filter((lane) => {
                const activeSeries = resolveSeriesFromTemplate(templateType);
                const activeSeriesTitle = publishSeriesOptions.find(o => o.value === activeSeries)?.label;
                return lane.title === activeSeriesTitle;
              })
              .map((lane) => (
                <SeriesLanePanel
                  key={lane.title}
                  title={lane.title}
                  purpose={lane.purpose}
                  sampleUseCase={lane.sampleUseCase}
                />
              ))}
          </div>
        </section>

        <section className="pt-10">
          <h2 className="text-[0.72rem] uppercase tracking-[0.2em] text-[#a4a8b2]">
            Output Mode
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="grid gap-2">
              <button
                type="button"
                onClick={() => setContentMode("internal_asset")}
                className={`border px-3 py-2 text-[0.58rem] uppercase tracking-[0.16em] transition-colors ${contentMode === "internal_asset"
                  ? "border-[#ddd6c8]/55 bg-[#13161c] text-[#efe9df]"
                  : "border-[#c4beaf]/24 bg-[#0a0c10] text-[#9ca1ad] hover:text-[#d7d2c8]"
                  }`}
              >
                Internal Asset
              </button>
              <p className="text-[0.56rem] uppercase tracking-[0.17em] text-[#8f96a3]">
                Loads output to public queue
              </p>
            </div>
            <div className="grid gap-2">
              <button
                type="button"
                onClick={() => setContentMode("public_article")}
                className={`border px-3 py-2 text-[0.58rem] uppercase tracking-[0.16em] transition-colors ${contentMode === "public_article"
                  ? "border-[#ddd6c8]/55 bg-[#13161c] text-[#efe9df]"
                  : "border-[#c4beaf]/24 bg-[#0a0c10] text-[#9ca1ad] hover:text-[#d7d2c8]"
                  }`}
              >
                Public Article
              </button>
              <p className="text-[0.56rem] uppercase tracking-[0.17em] text-[#8f96a3]">
                Publishes shareable content
              </p>
            </div>
          </div>
        </section>

        <section className="pt-10">
          <h2 className="text-[0.72rem] uppercase tracking-[0.2em] text-[#a4a8b2]">
            Lightweight Variant Controls
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <label className="grid gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-[#9ca1ad]">
              Template type
              <select
                value={templateType}
                onChange={(event) => setTemplateType(event.target.value)}
                className="border border-[#c4beaf]/25 bg-[#0a0c10] px-3 py-2 text-xs tracking-[0.08em] text-[#ece7dc] outline-none transition-colors focus:border-[#ddd6c8]/55"
              >
                {templateOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-[#9ca1ad]">
              Headline
              <select
                value={headline}
                onChange={(event) => setHeadline(event.target.value)}
                className="border border-[#c4beaf]/25 bg-[#0a0c10] px-3 py-2 text-xs tracking-[0.08em] text-[#ece7dc] outline-none transition-colors focus:border-[#ddd6c8]/55"
              >
                <option value="">[BLANK]</option>
                {headlineOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-[#9ca1ad]">
              Support line
              <select
                value={supportLine}
                onChange={(event) => setSupportLine(event.target.value)}
                className="border border-[#c4beaf]/25 bg-[#0a0c10] px-3 py-2 text-xs tracking-[0.08em] text-[#ece7dc] outline-none transition-colors focus:border-[#ddd6c8]/55"
              >
                {supportOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-[#9ca1ad]">
              Series label
              <select
                value={seriesLabel}
                onChange={(event) => setSeriesLabel(event.target.value)}
                className="border border-[#c4beaf]/25 bg-[#0a0c10] px-3 py-2 text-xs tracking-[0.08em] text-[#ece7dc] outline-none transition-colors focus:border-[#ddd6c8]/55"
              >
                {seriesOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {(["image", "video"] as MediaType[]).map((type) => {
              const isActive = mediaType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setMediaType(type);
                    setCapturedVideoFrame(null);
                    setExportMessage("");
                  }}
                  className={`border px-3 py-2 text-[0.58rem] uppercase tracking-[0.16em] transition-colors ${isActive
                    ? "border-[#ddd6c8]/55 bg-[#13161c] text-[#efe9df]"
                    : "border-[#c4beaf]/24 bg-[#0a0c10] text-[#9ca1ad] hover:text-[#d7d2c8]"
                    }`}
                >
                  {type} mode
                </button>
              );
            })}
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
            <label className="grid gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-[#9ca1ad]">
              {mediaType === "image" ? "Image URL (optional)" : "Video URL (optional)"}
              <input
                type="url"
                value={mediaType === "image" ? imageUrlInput : videoUrlInput}
                onChange={(event) => {
                  setCapturedVideoFrame(null);
                  if (mediaType === "image") {
                    setImageUrlInput(event.target.value);
                    if (uploadedImageUrl) {
                      URL.revokeObjectURL(uploadedImageUrl);
                      setUploadedImageUrl(null);
                    }
                  } else {
                    setVideoUrlInput(event.target.value);
                    if (uploadedVideoUrl) {
                      URL.revokeObjectURL(uploadedVideoUrl);
                      setUploadedVideoUrl(null);
                    }
                  }
                }}
                placeholder="https://..."
                className="border border-[#c4beaf]/25 bg-[#0a0c10] px-3 py-2 text-xs tracking-[0.08em] text-[#ece7dc] outline-none transition-colors placeholder:text-[#7c8391] focus:border-[#ddd6c8]/55"
              />
            </label>

            <label className="inline-flex cursor-pointer items-end border border-[#c4beaf]/24 bg-[#0b0d11] px-3 py-2 text-[0.58rem] uppercase tracking-[0.18em] text-[#d7d2c8] transition-colors hover:bg-[#11141a]">
              {mediaType === "image" ? "Upload image" : "Upload video"}
              <input
                type="file"
                accept={
                  mediaType === "image"
                    ? "image/png,image/jpeg,image/webp,image/gif"
                    : "video/mp4,video/webm,video/quicktime"
                }
                onChange={mediaType === "image" ? handleImageUpload : handleVideoUpload}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={mediaType === "image" ? handleClearImage : handleClearVideo}
              className="inline-flex items-end border border-[#c4beaf]/24 bg-[#0b0d11] px-3 py-2 text-[0.58rem] uppercase tracking-[0.18em] text-[#9ca1ad] transition-colors hover:bg-[#11141a] hover:text-[#d7d2c8]"
            >
              Clear {mediaType}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={saveControlSnapshot}
              disabled={!BIZBRAIN_API_ORIGIN || isSyncingControl}
              className="inline-flex border border-[#c4beaf]/24 bg-[#0b0d11] px-3 py-2 text-[0.58rem] uppercase tracking-[0.18em] text-[#d7d2c8] transition-colors hover:bg-[#11141a] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSyncingControl ? "Syncing..." : "Save control snapshot"}
            </button>
            {controlTaskId ? (
              <p className="text-[0.55rem] uppercase tracking-[0.15em] text-[#8f96a3]">
                task: {controlTaskId}
              </p>
            ) : null}
            {controlMessage ? (
              <p className="text-[0.55rem] uppercase tracking-[0.15em] text-[#8f96a3]">
                {controlMessage}
              </p>
            ) : null}
          </div>
        </section>

        <section className="pt-10">
          <h2 className="text-[0.72rem] uppercase tracking-[0.2em] text-[#a4a8b2]">
            Publish Layer
          </h2>
          <div className="mt-4 grid gap-4 border border-[#c4beaf]/20 bg-[#0a0c10]/72 p-4">
            <label className="grid gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-[#9ca1ad]">
              Series
              <select
                value={publishSeries}
                onChange={(event) =>
                  setPublishSeries(event.target.value as ContentSeries)
                }
                className="border border-[#c4beaf]/25 bg-[#0a0c10] px-3 py-2 text-xs tracking-[0.08em] text-[#ece7dc] outline-none transition-colors focus:border-[#ddd6c8]/55"
              >
                {publishSeriesOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-[#9ca1ad]">
              Expanded body copy (optional)
              <textarea
                value={bodyCopy}
                onChange={(event) => setBodyCopy(event.target.value)}
                rows={5}
                className="border border-[#c4beaf]/25 bg-[#0a0c10] px-3 py-2 text-xs tracking-[0.06em] text-[#ece7dc] outline-none transition-colors placeholder:text-[#7c8391] focus:border-[#ddd6c8]/55"
                placeholder="Add long-form body copy for public article entries."
              />
            </label>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleGenerate}
                className="border border-[#d6d0c2]/42 bg-[#0b0d11] px-4 py-2 text-[0.6rem] uppercase tracking-[0.18em] text-[#ece7dc] transition-colors hover:bg-[#11141a]"
              >
                Generate
              </button>
              <button
                type="button"
                onClick={handlePreview}
                className="border border-[#cbc4b5]/24 bg-[#0a0c10] px-4 py-2 text-[0.6rem] uppercase tracking-[0.18em] text-[#d7d2c8] transition-colors hover:bg-[#11141a]"
              >
                Preview
              </button>
              <button
                type="button"
                onClick={() => void handlePublish()}
                className="border border-[#d6d0c2]/42 bg-[#13161c] px-4 py-2 text-[0.6rem] uppercase tracking-[0.18em] text-[#ece7dc] transition-colors hover:bg-[#1a1e25]"
              >
                Publish
              </button>
            </div>

            <div className="grid gap-2 text-[0.56rem] uppercase tracking-[0.17em] text-[#9097a4]">
              <p>Flow: Generate -&gt; Preview -&gt; Publish</p>
              {flowMessage ? <p>{flowMessage}</p> : null}
              {generatedSnapshot ? (
                <p>
                  Generated snapshot: {generatedSnapshot.mode} / {generatedSnapshot.series}
                </p>
              ) : null}
              {recentPublishedId ? <p>Latest entry id: {recentPublishedId}</p> : null}
              <p>
                Index counts - Daily Truth: {publishedCounts.dailyTruth} | Infrastructure Files:{" "}
                {publishedCounts.architectureFiles} | False Belief Systems:{" "}
                {publishedCounts.falseBeliefSystems}
              </p>
            </div>
          </div>
        </section>

        <section className="pt-10" ref={previewSectionRef}>
          <h2 className="text-[0.72rem] uppercase tracking-[0.2em] text-[#a4a8b2]">
            Asset Preview Area
          </h2>
          <p className="mt-2 text-[0.58rem] uppercase tracking-[0.19em] text-[#8f96a3]">
            Active inputs: {templateType} | {headline || "[BLANK]"} | {supportLine} | {seriesLabel}{" "}
            | {mediaType} | {activeMediaUrl ? "media linked" : "no media"}
          </p>
          <div className="mt-4">
            <AssetPreviewCard
              key={selectedPreview.title}
              seriesLabel={selectedPreview.kicker}
              title={selectedPreview.title}
              headline={headline}
              supportLine={supportLine}
              templateType={templateType}
              mediaType={mediaType}
              imageUrl={activeImageUrl}
              videoUrl={activeVideoUrl}
            />
          </div>
        </section>

        <section className="pt-10">
          <h2 className="text-[0.72rem] uppercase tracking-[0.2em] text-[#a4a8b2]">
            Export Stage
          </h2>
          <p className="mt-2 text-[0.58rem] uppercase tracking-[0.19em] text-[#8f96a3]">
            Clean render mode for selected asset only.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {ratioPresets.map((preset) => {
              const isActive = preset.id === ratioPreset;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setRatioPreset(preset.id)}
                  className={`border px-3 py-2 text-[0.58rem] uppercase tracking-[0.16em] transition-colors ${isActive
                    ? "border-[#ddd6c8]/55 bg-[#13161c] text-[#efe9df]"
                    : "border-[#c4beaf]/24 bg-[#0a0c10] text-[#9ca1ad] hover:text-[#d7d2c8]"
                    }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 border border-[#c4beaf]/20 bg-[#090b0f] p-4 sm:p-5">
            <div className="mx-auto w-full max-w-4xl">
              <div
                ref={exportStageRef}
                className={`mx-auto w-full max-w-[48rem] overflow-hidden bg-[#07080a] [&.exporting-transparent]:!bg-transparent ${selectedRatio.aspectClass}`}
              >
                <AssetPreviewCard
                  seriesLabel={seriesLabel}
                  title={selectedPreview.title}
                  headline={headline}
                  supportLine={supportLine}
                  templateType={templateType}
                  mediaType={exportMediaType}
                  imageUrl={exportImageUrl}
                  videoUrl={exportVideoUrl}
                  videoRef={exportVideoRef}
                  context="export"
                  className="h-full"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleExportPng}
              disabled={isExportingPng}
              className="border border-[#d6d0c2]/42 bg-[#0b0d11] px-4 py-2 text-[0.6rem] uppercase tracking-[0.18em] text-[#ece7dc] transition-colors hover:bg-[#11141a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isExportingPng
                ? "Exporting..."
                : mediaType === "video"
                  ? "Export Frame PNG"
                  : "Export PNG"}
            </button>
            {mediaType === "video" ? (
              <button
                type="button"
                onClick={handleExportComposedVideo}
                disabled={isExportingPng}
                className="border border-[#75c6e8]/42 bg-[#0b171c] px-4 py-2 text-[0.6rem] uppercase tracking-[0.18em] text-[#bae6fc] transition-colors hover:bg-[#11232b] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isExportingPng ? "Composing..." : "Export Composed Video"}
              </button>
            ) : null}
            {exportMessage ? (
              <p className="text-[0.56rem] uppercase tracking-[0.17em] text-[#9097a4]">
                {exportMessage}
              </p>
            ) : null}
          </div>
          {mediaType === "video" ? (
            <p className="mt-2 text-[0.52rem] uppercase tracking-[0.16em] text-[#8b92a0]">
              Video mode exports a composed webm video file containing your template and source footage.
            </p>
          ) : null}
        </section>

        <section className="pb-8 pt-10">
          <h2 className="text-[0.72rem] uppercase tracking-[0.2em] text-[#a4a8b2]">
            Copy Bank
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(copyBank) as CopyBankKey[]).map((group) => (
              <CopyBankGroup key={group} label={group} lines={copyBank[group]} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default SocialAssetHub;
