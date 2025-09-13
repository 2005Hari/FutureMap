import React, { useState } from "react";
import { auth, db, doc, setDoc } from "../../utils/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Set display name to email prefix (before @)
      const name = email.split('@')[0];
      await updateProfile(result.user, { displayName: name });
      localStorage.setItem('auth', 'true');
      localStorage.setItem('userName', name);
      localStorage.setItem('userPhoto', '');
      // Store user in Firestore
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name: name,
        email: email,
        photo: '',
      }, { merge: true });
      window.location.href = "/";
    } catch (err) {
      setError("Registration failed. " + (err.message || ''));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-purple-200 to-green-200 animate-fade-in">
      <form onSubmit={handleSubmit} className="bg-white/95 p-14 rounded-3xl shadow-2xl w-full max-w-lg border border-gray-100">
        <h2 className="text-5xl font-extrabold mb-12 text-center text-blue-900 tracking-tight drop-shadow-lg">Sign Up</h2>
        {error && <div className="mb-6 text-red-600 text-center font-semibold animate-pulse text-lg">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-7 p-4 border border-blue-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-7 p-4 border border-blue-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full mb-10 p-4 border border-blue-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-lg shadow-sm"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-gradient-to-r from-blue-700 to-green-400 text-white py-4 rounded-2xl font-bold text-2xl shadow-xl hover:from-blue-800 hover:to-green-500 transition">Register</button>
        <div className="mt-10 text-center text-gray-500 text-lg">
          Already have an account? <a href="/login" className="text-blue-700 hover:underline font-semibold">Login</a>
        </div>
      </form>
    </div>
  );
}
