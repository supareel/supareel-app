"use client";
import { AUTH_LOGIN_PAGE } from "@/app/routes";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function HomePageClient() {
  const router = useRouter();
  return (
    <div className="mx-auto my-10">
      <Button onClick={() => router.push(AUTH_LOGIN_PAGE)}>Login</Button>
    </div>
  );
}
