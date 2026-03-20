export type ContentSeries = "daily-truth" | "architecture-files" | "false-belief-systems";
export type ContentMode = "internal_asset" | "public_article";
export type ContentStatus = "draft" | "internal_ready" | "published";
export type ContentMediaType = "image" | "video";

export type SocialDerivativeDrafts = {
  linkedin_caption: string;
  x_post: string;
  instagram_caption: string;
  image_export_ref?: string;
};

export type ContentEntry = {
  id: string;
  slug: string;
  series: ContentSeries;
  templateType: string;
  headline: string;
  supportLine: string;
  body: string;
  mode: ContentMode;
  created_at: string;
  status: ContentStatus;
  diagnosisReferences: string[];
  thesisReferences: string[];
  visualPreviewRef?: string;
  mediaType?: ContentMediaType;
  imageUrl?: string;
  videoUrl?: string;
  socialDerivatives: SocialDerivativeDrafts;
};

type CreateContentInput = {
  series: ContentSeries;
  templateType: string;
  headline: string;
  supportLine: string;
  body: string;
  mode: ContentMode;
  status?: ContentStatus;
  diagnosisReferences?: string[];
  thesisReferences?: string[];
  visualPreviewRef?: string;
  mediaType?: ContentMediaType;
  imageUrl?: string;
  videoUrl?: string;
};

type ListFilter = {
  series?: ContentSeries;
  status?: ContentStatus | ContentStatus[];
};

const STORAGE_KEY = "tb10x_content_registry_v1";

const seedEntries: ContentEntry[] = [];

const canUseStorage = () => typeof window !== "undefined" && typeof localStorage !== "undefined";

const readStoredEntries = (): ContentEntry[] => {
  if (!canUseStorage()) {
    return [];
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as ContentEntry[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch {
    return [];
  }
};

const writeStoredEntries = (entries: ContentEntry[]) => {
  if (!canUseStorage()) {
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

const toSlug = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);

const uniqueSlug = (base: string, entries: ContentEntry[]) => {
  let candidate = toSlug(base) || `entry-${Date.now()}`;
  let counter = 2;
  while (entries.some((entry) => entry.slug === candidate)) {
    candidate = `${toSlug(base)}-${counter}`;
    counter += 1;
  }
  return candidate;
};

const mergedEntries = () => {
  const stored = readStoredEntries();
  const mergedMap = new Map<string, ContentEntry>();
  [...seedEntries, ...stored].forEach((entry) => {
    mergedMap.set(entry.id, entry);
  });
  return Array.from(mergedMap.values()).sort((a, b) =>
    a.created_at < b.created_at ? 1 : -1,
  );
};

export const createContentEntry = (input: CreateContentInput): ContentEntry => {
  const entries = mergedEntries();
  const createdAt = new Date().toISOString();
  const slug = uniqueSlug(input.headline, entries);
  const entry: ContentEntry = {
    id: `content_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`,
    slug,
    series: input.series,
    templateType: input.templateType,
    headline: input.headline,
    supportLine: input.supportLine,
    body: input.body,
    mode: input.mode,
    created_at: createdAt,
    status: input.status ?? "draft",
    diagnosisReferences: input.diagnosisReferences ?? [],
    thesisReferences: input.thesisReferences ?? [],
    visualPreviewRef: input.visualPreviewRef,
    mediaType: input.mediaType,
    imageUrl: input.imageUrl,
    videoUrl: input.videoUrl,
    socialDerivatives: {
      linkedin_caption: `[LinkedIn draft] ${input.headline} — ${input.supportLine}`,
      x_post: `[X draft] ${input.headline} ${input.supportLine}`.slice(0, 280),
      instagram_caption: `[Instagram draft] ${input.headline}\n\n${input.supportLine}`,
      image_export_ref: input.visualPreviewRef,
    },
  };

  writeStoredEntries([entry, ...readStoredEntries()]);
  return entry;
};

export const listContentEntries = (filter?: ListFilter): ContentEntry[] => {
  const entries = mergedEntries();
  if (!filter) {
    return entries;
  }

  let next = entries;
  if (filter.series) {
    next = next.filter((entry) => entry.series === filter.series);
  }
  if (filter.status) {
    const statusSet = new Set(
      Array.isArray(filter.status) ? filter.status : [filter.status],
    );
    next = next.filter((entry) => statusSet.has(entry.status));
  }
  return next;
};

export const getContentEntryBySlug = (
  series: ContentSeries,
  slug: string,
): ContentEntry | null => {
  return (
    mergedEntries().find((entry) => entry.series === series && entry.slug === slug) ??
    null
  );
};

export const publishContentEntry = (id: string): ContentEntry | null => {
  const stored = readStoredEntries();
  const index = stored.findIndex((entry) => entry.id === id);
  if (index === -1) {
    return null;
  }
  const updated: ContentEntry = {
    ...stored[index],
    status: "published",
  };
  stored[index] = updated;
  writeStoredEntries(stored);
  return updated;
};

export const syncContentEntry = async (id: string): Promise<{
  id: string;
  status: "stubbed";
  message: string;
}> => {
  return {
    id,
    status: "stubbed",
    message: "Notion sync boundary ready. Implementation deferred.",
  };
};

