"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { kratos } from "@/lib/ory/client";
import { FlowError } from "@ory/client";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Error() {
  const [error, setError] = useState<FlowError>();

  const router = useRouter();
  const params = useSearchParams();

  const id = params.get("id");

  useEffect(() => {
    if (error) {
      return;
    }

    kratos
      .getFlowError({ id: String(id) })
      .then(({ data }) => {
        setError(data);
      })
      .catch((err: AxiosError) => {
        switch (err.response?.status) {
          case 404:
          // The error id could not be found. Let's just redirect home!
          case 403:
          // The error id could not be fetched due to e.g. a CSRF issue. Let's just redirect home!
          case 410:
            // The error id expired. Let's just redirect home!
            return router.push("/");
        }

        return Promise.reject(err);
      });
  }, [id, router, error]);

  if (!error) {
    return null;
  }

  return (
    <>
      <Card className="mx-4 md:mx-8 max-w-5xl">
        <CardHeader>
          <CardTitle>An error occurred</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{JSON.stringify(error, null, 2)}</p>
        </CardContent>
      </Card>
      <Button asChild>
        <Link href="/" className="inline-flex space-x-2" passHref>
          Go back
        </Link>
      </Button>
    </>
  );
}
