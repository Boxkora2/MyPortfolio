import "server-only";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  vi: () => import("./dictionaries/vi.json").then((module) => module.default),
};

export const getDictionary = async (locale?: "en" | "vi") => {
  // Default to English if no locale provided
  const lang = locale || "en";
  return dictionaries[lang]?.() ?? dictionaries.en();
};

// Helper to extract locale from segment (for use in layouts/pages)
export const getLocaleFromSegment = (segment?: string): "en" | "vi" => {
  return segment === "vi" ? "vi" : "en";
};
