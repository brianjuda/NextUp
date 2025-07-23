import { createContext } from "react";

import type { MediaItem, WatchStatus } from "../types/types";

interface MediaState {
    data: MediaItem[];
}

interface MediaContextType extends MediaState {
    addMedia: (item: MediaItem) => void;
    updateStatus: (id: number, status: WatchStatus) => void;
    removeMedia: (id: number) => void;
}

export const MediaContext = createContext<MediaContextType | undefined>(undefined);