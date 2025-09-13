
import React, { useState } from "react";
// import { auth, googleProvider, signInWithPopup, db, doc, setDoc } from "../../utils/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Login failed.");
        return;
      }
      localStorage.setItem('auth', 'true');
      localStorage.setItem('userName', data.user.name);
      localStorage.setItem('userEmail', data.user.email);
      window.location.href = "/aptitude-quiz-interface";
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      localStorage.setItem('auth', 'true');
      if (user) {
        localStorage.setItem('userName', user.displayName || '');
        localStorage.setItem('userPhoto', user.photoURL || '');
        // Store user in Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: user.displayName || '',
          email: user.email || '',
          photo: user.photoURL || '',
        }, { merge: true });
      }
      window.location.href = "/aptitude-quiz-interface";
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-primary via-secondary to-accent p-6">
      <div className="flex w-full max-w-5xl rounded-2xl bg-white shadow-lg overflow-hidden">
        {/* Left Side Illustration */}
        <div className="hidden w-1/2 bg-white/80 backdrop-blur-xl p-10 text-primary lg:flex flex-col justify-center shadow-2xl rounded-l-2xl">
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/graduates-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--student-graduation-hat-people-pack-illustrations-3617262.png"
            alt="Career Journey"
            className="mb-6 drop-shadow-2xl rounded-2xl"
          />
          <h2 className="text-3xl font-extrabold mb-4 text-primary">Your Career Journey Starts Here</h2>
          <p className="text-lg opacity-90 text-foreground">
            Discover your potential, explore career paths, and get personalized
            guidance to achieve your professional goals.
          </p>
        </div>

        {/* Right Side Login Card */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary">
              <span className="text-white text-2xl">🎓</span>
            </div>
            <h2 className="mt-4 text-2xl font-bold">Welcome Back</h2>
            <p className="text-gray-600">Sign in to continue your career journey</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="mb-2 text-error text-center font-semibold animate-pulse text-lg">{error}</div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition duration-150"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-primary focus:ring-2 focus:ring-primary outline-none transition duration-150"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <div className="text-right mt-2">
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-primary to-secondary py-3 text-white font-semibold shadow-md hover:opacity-90 hover:scale-105 transition-all duration-200"
            >
              Sign In
            </button>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <span className="px-2 text-gray-400 text-sm">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 rounded-lg border border-gray-300 py-3 text-gray-700 font-medium hover:bg-gray-100 mb-3"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="h-5 w-5"
              />
              Continue with Google
            </button>

          </form>

          <p className="mt-6 text-center text-gray-600 text-sm">
            Don’t have an account?{" "}
            <a href="/register" className="text-primary font-medium hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
