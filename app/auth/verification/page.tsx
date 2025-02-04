"use client";

import { Flow } from "@/components/ory/Flow";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HandleError } from "@/hooks/ory";
import { kratos } from "@/lib/ory/client";
import { UpdateVerificationFlowBody, VerificationFlow } from "@ory/client";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AUTH_LOGIN_PAGE, AUTH_VERIFICATION_PAGE } from "../routes";

export default function Verification() {
  const [flow, setFlow] = useState<VerificationFlow>();

  const router = useRouter();
  const params = useSearchParams();

  const flowId = params.get("flow") ?? undefined;
  const returnTo = params.get("return_to") ?? undefined;

  const getFlow = useCallback((flowId: string) => {
    return kratos
      .getVerificationFlow({ id: String(flowId) })
      .then(({ data }) => setFlow(data))
      .catch((err: AxiosError) => {
        switch (err.response?.status) {
          case 410:
          case 403:
            return router.push(AUTH_VERIFICATION_PAGE);
        }
        throw err;
      });
  }, []);

  const handleError = useCallback(
    (error: AxiosError) => {
      const handle = HandleError(
        getFlow,
        setFlow,
        AUTH_VERIFICATION_PAGE,
        true,
        router
      );
      return handle(error);
    },
    [getFlow]
  );

  const createFlow = useCallback(
    (returnTo: string | undefined) => {
      kratos
        .createBrowserVerificationFlow({ returnTo })
        .then(({ data }) => {
          setFlow(data);
          router.push(`?flow=${data.id}`);
        })
        .catch(handleError);
    },
    [handleError]
  );

  const updateFlow = async (body: UpdateVerificationFlowBody) => {
    kratos
      .updateVerificationFlow({
        flow: String(flow?.id),
        updateVerificationFlowBody: body,
      })
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(handleError);
  };

  useEffect(() => {
    if (flow) {
      return;
    }

    if (flowId) {
      getFlow(flowId);
      return;
    }

    createFlow(returnTo);
  }, [flowId, router, returnTo, flow]);

  return (
    <Card className="flex flex-col items-center w-full max-w-sm p-4">
      <Image
        className="mt-10 mb-4"
        width="64"
        height="64"
        src="/supareel.png"
        alt="Supareel logo"
      />
      <CardHeader className="flex flex-col items-center text-center space-y-4">
        <CardTitle>Verify your account</CardTitle>
        <CardDescription className="max-w-xs">
          {flow?.ui.messages?.map((it) => {
            return <span key={it.id}>{it.text}</span>;
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        {flow ? (
          <Flow flow={flow} onSubmit={updateFlow} hideGlobalMessages />
        ) : (
          <div className="flex flex-col space-y-4 mt-3">
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-3 w-[80px] rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
            <Button disabled>
              <Skeleton className="h-4 w-[80px] rounded-md" />
            </Button>
          </div>
        )}
      </CardContent>
      {flow ? (
        <Button variant="link" asChild disabled={!flow}>
          <Link
            href={{
              pathname: AUTH_LOGIN_PAGE,
              query: { return_to: flow.return_to },
            }}
            className="inline-flex space-x-2"
            passHref
          >
            Back to login
          </Link>
        </Button>
      ) : (
        <Skeleton className="h-3 w-[180px] rounded-md my-3.5" />
      )}
    </Card>
  );
}
