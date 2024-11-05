import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <title>404: This page could not be found.</title>
      <div className="min-h-full flex flex-col items-center justify-center text-center p-3">
        <AlertCircle className="h-10 w-10 text-red-500" />

        <div className="my-6">
          <div className="text-2xl">404 - Page Not Found</div>
          <div className="mt-2">
            Oops! The page youre looking for doesnt exist or has been moved.
          </div>
        </div>
        <Button>
          <Link href="/">Return to Dashboard</Link>
        </Button>
      </div>
    </>
  );
}
