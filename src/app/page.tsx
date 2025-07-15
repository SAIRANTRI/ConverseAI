"use client";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
const { 
        data: session
    } = authClient.useSession() 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      name,
      password,
    }, {
      onError: () => {
        window.alert("Error creating user");
      },
      onSuccess: () => {
        window.alert("User created");
      }
    });
  }

  if (session) {
    return <div className="p-4 gap-4 text-2xl font-bold">
      <p>Welcome, {session.user.name}!</p>
      <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>;
  }


  return (
    <div className="p-4 flex flex-col gap-4">
      <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>

      <Button onClick={onSubmit}> Create User </Button>
    </div>
  );
}