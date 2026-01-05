import type { ContentType } from "src/shared/types/content";
import { create } from "zustand";

type DiscoverState = {
  contentType: ContentType;
  setContentType: (type: ContentType) => void;
};

export const useContentTypeStore = create<DiscoverState>((set) => ({
  contentType: "movie",
  setContentType: (type) => set({ contentType: type }),
}));
