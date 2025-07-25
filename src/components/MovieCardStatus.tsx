import { useMedia } from "../hooks/context";
import type { WatchStatus } from "../types/types";

export default function MovieCardStatus({ id, status }: { id: number, status: WatchStatus }) {
    const { updateStatus, removeMedia } = useMedia();

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;

        if (selected === "remove") {
            // console.log(`Removing media with id: ${id}`);
            removeMedia(id);
            return;
        }

        // console.log(`${id} status is now ${event.target.value}`);
        updateStatus(id, event.target.value as WatchStatus);
    }

    return (
        <div className="movie-card__interact">
            <select name="selectStatus" 
                className={`select ${status}`}
                value={status}
                onChange={handleStatusChange}
                >
                <option value="toWatch" className="toWatch">On watchlist</option>
                <option value="watching" className="watching">In progress</option>
                <option value="completed" className="completed">Completed</option>
                <option value="remove" className="remove">Remove from watchlist</option>
            </select>
        </div>
    )
}