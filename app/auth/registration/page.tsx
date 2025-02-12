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
import { RegistrationFlow, UpdateRegistrationFlowBody } from "@ory/client";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AUTH_LOGIN_PAGE, AUTH_REGISTRATION_PAGE } from "../../routes";

export default function Registration() {
  const [flow, setFlow] = useState<RegistrationFlow>();

  const router = useRouter();
  const params = useSearchParams();

  const flowId = params.get("flow") ?? undefined;
  const returnTo = params.get("return_to") ?? undefined;

  const getFlow = useCallback((flowId: string) => {
    return kratos
      .getRegistrationFlow({ id: String(flowId) })
      .then(({ data }) => setFlow(data))
      .catch(handleError);
  }, []);

  const handleError = useCallback(
    (error: AxiosError) => {
      const handle = HandleError(
        getFlow,
        setFlow,
        AUTH_REGISTRATION_PAGE,
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
        .createBrowserRegistrationFlow({ returnTo })
        .then(({ data }) => {
          setFlow(data);
          router.push(`?flow=${data.id}`);
        })
        .catch(handleError);
    },
    [handleError]
  );

  const updateFlow = async (body: UpdateRegistrationFlowBody) => {
    kratos
      .updateRegistrationFlow({
        flow: String(flow?.id),
        updateRegistrationFlowBody: body,
      })
      .then(async ({ data }) => {
        if (data.continue_with) {
          for (const item of data.continue_with) {
            switch (item.action) {
              case "show_verification_ui":
                router.push(`${AUTH_REGISTRATION_PAGE}?flow=${item.flow.id}`);
                return;
            }
          }
        }
        router.push(flow?.return_to || "/");
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
        <CardTitle>Create account</CardTitle>
        <CardDescription className="max-w-xs">
          Create an account to access the intranet applications.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        {flow ? (
          <Flow flow={flow} onSubmit={updateFlow} />
        ) : (
          <div className="flex flex-col space-y-4 mt-5">
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-3 w-[80px] rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-3 w-[80px] rounded-md" />
              <Skeleton className="h-8 w-full rounded-md" />
            </div>
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
            Log into your account
          </Link>
        </Button>
      ) : (
        <Skeleton className="h-3 w-[180px] rounded-md my-3.5" />
      )}
    </Card>
  );
}
