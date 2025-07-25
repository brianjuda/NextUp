import { useEffect, useState, useReducer } from "react";
import type { ReactNode } from "react";
import { ref, onValue, set, remove } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import database, { auth } from "../firebase/firebase";
import { useAuth } from "../hooks/context";
import authReducer from "../reducers/auth";
import { mediaReducer } from "../reducers/lists";
import { MediaContext } from "./media";
import { AuthContext } from "./auth";
import type { MediaState, MediaItem, WatchStatus } from "../types/types";

const initialState: MediaState = {
    data: [],
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        loading: true,
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(`User logged in as: ${user.uid}`);
                dispatch({ type: "LOGIN", user });
            } else {
                console.log("User is signed out");
                dispatch({ type: "LOGOUT"});
            }
        })

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user: state.user, loading: state.loading, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}


export const MediaProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [ state, dispatch ] = useReducer(mediaReducer, initialState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!user) {
            dispatch({ type: "SET_MEDIA", update: []});
            setLoading(false);
            return;
        }

        setLoading(true);

        const mediaRef = ref(database, `users/${user.uid}/data`);
        const unsubscribe = onValue(mediaRef, (snapshot) => {
            const data = snapshot.val() || {};
            const parsedData = Object.values(data) as MediaItem[];
            dispatch({ type: "SET_MEDIA", update: parsedData });
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const addMedia = (update: MediaItem) => {
        if (!user) return;
        dispatch({ type: "ADD_MEDIA", update });
        const mediaRef = ref(database, `users/${user.uid}/data/${update.id}_${update.media_type}`);
        set(mediaRef, update);
    };

    const updateStatus = (id: number, status: WatchStatus) => {
        if (!user) return;
        const key = state.data.find(item => item.id === id)?.media_type;
        if (!key) return;

        dispatch({ type: "UPDATE_STATUS", update: { id, status } });
        const mediaRef = ref(database, `users/${user.uid}/data/${id}_${key}`);
        set(mediaRef, {
            ...state.data.find(item => item.id === id),
            status,
        });
    };

    const removeMedia = (id: number) => {
        if (!user) return;
        const item = state.data.find(item => item.id === id);
        if (!item) return;

        dispatch({ type: "REMOVE_MEDIA", update: { id } });
        const mediaRef = ref(database, `users/${user.uid}/data/${id}_${item.media_type}`);
        remove(mediaRef);
    }

    if (loading) return <p>Loading media...</p>

    return(
        <MediaContext.Provider value={{ ...state, addMedia, updateStatus, removeMedia }}>
            {children}
        </MediaContext.Provider>
    )
}

