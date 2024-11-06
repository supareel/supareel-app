"use client";
import { authClient } from "@/lib/auth-client"; //import the auth client
import { EnvelopeOpenIcon, RocketIcon } from "@radix-ui/react-icons";

import Link from "next/link";
import { useState } from "react";

import { uiRoutes } from "@/app/data/routes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CHECK_MAIL_PAGE } from "@/routes";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    if (confirmPassword !== password) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      email: email,
      password: password,
      name: name,
      callbackURL: CHECK_MAIL_PAGE, //redirect after successful login (optional)
    };

    const { data, error } = await authClient.signUp.email(payload, {
      onRequest: (ctx) => {
        //show loading
        console.log("onRequest", ctx);
        setLoading(true);
      },
      onSuccess: (ctx) => {
        setLoading(false);
        console.log("onSuccess", ctx);
        //redirect to the dashboard
      },
      onError: (ctx) => {
        setLoading(false);
        console.log("onError", ctx);
        alert(`${error?.status} ${error?.message}`);
      },
    });

    console.log(data?.session, error);
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your details below to register in your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Full Name</Label>
            <Input
              id="email"
              type="email"
              placeholder="Jonh Doe"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={signUp}>
            {loading ? <EnvelopeOpenIcon /> : <RocketIcon />} Sign Up
          </Button>
          <Button
            variant="outline"
            className="w-full text-red-500 border-red-400"
          >
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href={uiRoutes.AUTH_LOGIN} className="underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
