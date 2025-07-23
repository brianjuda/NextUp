import type { WatchStatus, MediaState, MediaItem } from "../types/types";

type Action =
    | { type: "SET_MEDIA"; update: MediaItem[] }
    | { type: "ADD_MEDIA"; update: MediaItem }
    | { type: "UPDATE_STATUS"; update: { id: number; status: WatchStatus }}
    | { type: "REMOVE_MEDIA"; update: {id: number}}

// function saveToLocalStorage(data: MediaItem[]) {
//     localStorage.setItem("mediaData", JSON.stringify(data))
// }

export function mediaReducer(state: MediaState, action: Action): MediaState {
    switch(action.type) {
        case "SET_MEDIA":
            return {
                ...state,
                data: action.update
            };
        case "ADD_MEDIA":
            if (state.data.find(item => item.id === action.update.id && item.media_type === action.update.media_type)) {
                return state;
            } else {
                const newData = [...state.data, action.update];
                return {
                    ...state,
                    data: newData
                };
            };
        case "UPDATE_STATUS":
            {
                const newData = state.data.map((item) => item.id === action.update.id ? { ...item, status: action.update.status } : item );
                return {
                    ...state,
                    data: newData
                };
            };
        case "REMOVE_MEDIA": {
                const newData = state.data.filter(item => item.id !== action.update.id);
                return {
                    ...state,
                    data: newData
                };
            };
        default:
            return state;
    }
}