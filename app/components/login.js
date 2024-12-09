"use client";
import { useUserAuth } from "../_utils/auth-context";

export default function Login() {
  const { user, gitHubSignIn, googleSignIn, firebaseSignOut, errorMessage } =
    useUserAuth();

  return (
    <div>
      {user ? (
        <div className="flex items-center justify-center">
          <button
            onClick={firebaseSignOut}
            className="hover:scale-110 transition-transform duration-200 bg-red-400 rounded-md p-3 m-3"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h1 className="text-lg m-5">
              In order to post your own creations please sign in with one of the
              options below.
            </h1>
            {errorMessage && (
              <div className="text-red-600 mb-4">
                <p>{errorMessage}</p>
              </div>
            )}
            <div className="flex justify-center space-x-5">
              <button
                onClick={gitHubSignIn}
                className="hover:scale-110 transition-transform duration-200 bg-red-400 rounded-md p-3 w-60"
              >
                Log in with Github
              </button>
              <button
                onClick={googleSignIn}
                className="hover:scale-110 transition-transform duration-200 bg-red-400 rounded-md p-3 w-60"
              >
                Log in with Google
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
