import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase";
import { useAuth } from "../hooks/hooks";

export default function LoginPage() {
    const { dispatch } = useAuth();

    const startLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            dispatch({ type: "LOGIN", user});
            console.log("Signed in user:", result.user);
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <div>
            <h1>I'm watching...</h1>
            <p>Keep track of what's on your watchlist.</p>
            <button onClick={startLogin} className="button">Login with Google</button>
        </div>
    )
}