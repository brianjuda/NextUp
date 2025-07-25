import { useState, useMemo } from "react";
import { useMedia } from "./context";

type Filters = {
    genre: string;
    status: string;
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

    // handler to update filters
    const handleFilterChange = (update: Partial<Filters>) => {
        setFilters((prev) => ({ ...prev, ...update }));
    }

    return {
        filteredData,
        availableGenres,
        filters,
        handleFilterChange,
    };
}