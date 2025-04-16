// create a sigup page with email password and username and button to sigin up and callesd this api localhost:8080/api/auth/signup
"use client";
import { useAuth } from "@/context/auth";
import { redirect } from "next/navigation";
import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { setUser, user } = useAuth();

  const handleSubmitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log(
      JSON.stringify({ email: email, password: password, username: username })
    );
    e.preventDefault();
    const res = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
      }),
    });
    const data = await res.json();
    if (res.status === 400) {
      console.log(data.errors);
    }
    console.log(data.user);
  };
  const handleSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });
    const data = await res.json();
    if (res.status === 200) {
      setUser(data.user);
    }
    redirect("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Signup</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmitSignup}>
          <input
            className="border-2 border-gray-300 rounded-md p-2"
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="border-2 border-gray-300 rounded-md p-2"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="border-2 border-gray-300 rounded-md p-2"
            placeholder="username"
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            type="submit"
          >
            Signup
          </button>
        </form>
      </div>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmitLogin}>
          <input
            className="border-2 border-gray-300 rounded-md p-2"
            placeholder="email"
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            className="border-2 border-gray-300 rounded-md p-2"
            placeholder="password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      {user && <div>{JSON.stringify(user)}</div>}
    </div>
  );
};
export default Signup;
