import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { userSigninSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

           const result = await signInWithPopup(auth, provider)
           const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: result.user.displayName, email: result.user.email, photo: result.user.photoURL}),    
        })
        const data = await res.json();
        dispatch(userSigninSuccess(data));
        navigate('/home');
            // Add your Google OAuth logic here
        } catch (error) {
            console.log(error);
        }
    }
;

    return (
        <div className="mt-4">
            <button onClick={handleGoogleClick} className="bg-red-700 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
                Continue with Google
            </button>
        </div>
    );
}
