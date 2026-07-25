import { useState, useMemo } from "react";
import { useMedia } from "./context";
import type { WatchStatus } from "../types/types";

type Filters = {
    genre: string;
    status: string;
};

const STATUS_ORDER: Record<WatchStatus, number > = {
    watching: 0,
    toWatch:1,
    completed: 2,
};

export default function useFilter(mediaType: "movie" | "tv") {
    const { data } = useMedia();

    // local filter state
    const [filters, setFilters] = useState<Filters>({
        genre: "",
        status: ""
    });

    // get unique genres
    const availableGenres = useMemo(() => {
        return Array.from(
            new Set(
                data.filter((item) => item.media_type === mediaType).map((item) => item.genre)
            )
        );
    }, [data, mediaType]);

    // apply filters
    const filteredData = useMemo(() => {
        return data.filter((item) => item.media_type === mediaType)
            .filter((item) => filters.genre ? item.genre === filters.genre : true)
            .filter((item) => filters.status ? item.status === filters.status : true);
    }, [data, mediaType, filters]);

    //s sort filtered data alphabetically, then by status (watching > toWatch > completed)
    const sortedFilteredData = useMemo(() => {
        return [...filteredData].sort((a, b) => {
            const statusDiff = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
            if (statusDiff !== 0) return statusDiff;
            return a.title.localeCompare(b.title);
        });
    }, [filteredData]);
    // handler to update filters
    const handleFilterChange = (update: Partial<Filters>) => {
        setFilters((prev) => ({ ...prev, ...update }));
    }

    return {
        filteredData: sortedFilteredData,
        availableGenres,
        filters,
        handleFilterChange,
    };
}