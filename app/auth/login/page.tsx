"use client";

import {
  AUTH_LOGIN_PAGE,
  AUTH_RECOVERY_PAGE,
  AUTH_REGISTRATION_PAGE,
  HOME_PAGE,
} from "@/app/routes";
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
import { HandleError, LogoutLink } from "@/hooks/ory";
import { kratos } from "@/lib/ory/client";
import { LoginFlow, UpdateLoginFlowBody } from "@ory/client";
import { AxiosError } from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Login() {
  const [flow, setFlow] = useState<LoginFlow>();

  const router = useRouter();
  const params = useSearchParams();

  const flowId = params.get("flow") ?? undefined;
  const aal = params.get("aal") ?? undefined;
  const refresh = Boolean(params.get("refresh")) ? true : undefined;
  const returnTo = params.get("return_to") ?? undefined;
  const loginChallenge = params.get("login_challenge") ?? undefined;

  const onLogout = LogoutLink([aal, refresh]);

  const getFlow = useCallback((flowId: string) => {
    return kratos
      .getLoginFlow({ id: String(flowId) })
      .then(({ data }) => setFlow(data))
      .catch(handleError);
  }, []);

  const handleError = useCallback(
    (error: AxiosError) => {
      const handle = HandleError(
        getFlow,
        setFlow,
        AUTH_LOGIN_PAGE,
        true,
        router
      );
      return handle(error);
    },
    [getFlow]
  );

  const createFlow = useCallback(
    (
      aal: string | undefined,
      refresh: boolean | undefined,
      returnTo: string | undefined,
      loginChallenge: string | undefined
    ) => {
      kratos
        .createBrowserLoginFlow({ aal, refresh, returnTo, loginChallenge })
        .then(({ data }) => {
          setFlow(data);
          console.log("Flow created:", data);
          alert(`Login successful! data.id: ${data.id}`);

          router.push(`${HOME_PAGE}?flow=${data.id}`);
        })
        .catch(handleError);
    },
    [handleError]
  );

  const updateFlow = async (body: UpdateLoginFlowBody) => {
    kratos
      .updateLoginFlow({
        flow: String(flow?.id),
        updateLoginFlowBody: body,
      })
      .then(() => {
        alert(`Login successful! return_to: ${flow?.return_to}`);
        if (flow?.return_to) {
          window.location.href = flow?.return_to;
          return;
        }
        router.push(HOME_PAGE);
      })
      .catch(handleError);
  };

  useEffect(() => {
    if (flow) {
      return;
    }

    if (flowId) {
      getFlow(flowId).then();
      return;
    }
    createFlow(aal, refresh, returnTo, loginChallenge);
  }, [
    flowId,
    router,
    aal,
    refresh,
    returnTo,
    createFlow,
    loginChallenge,
    getFlow,
  ]);

  return (
    <Card className="flex flex-col items-center w-full max-w-sm p-4">
      <Image
        className="mt-10 mb-4"
        width="64"
        height="64"
        src="/supareel.png"
        alt="Supareel Logo"
      />
      <CardHeader className="flex flex-col items-center text-center space-y-4">
        {flow ? (
          <div className="flex flex-col space-y-4">
            <CardTitle>
              {(() => {
                if (flow?.refresh) {
                  return "Confirm Action";
                } else if (flow?.requested_aal === "aal2") {
                  return "Two-Factor Authentication";
                }
                return "Welcome";
              })()}
            </CardTitle>
            <CardDescription className="max-w-xs">
              Log in to the Intranet to access all locally hosted applications.
            </CardDescription>
          </div>
        ) : (
          <div className="flex flex-col space-y-6">
            <Skeleton className="h-6 w-full rounded-md" />
            <div className="flex flex-col space-y-2">
              <Skeleton className="h-3 w-full rounded-md" />
              <Skeleton className="h-3 w-[250px] rounded-md" />
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className="w-full">
        {flow ? (
          <Flow flow={flow} onSubmit={updateFlow} />
        ) : (
          <div className="flex flex-col space-y-4 mt-4">
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
      {flow?.requested_aal === "aal2" ||
      flow?.requested_aal === "aal3" ||
      flow?.refresh ? (
        <Button onClick={onLogout} variant="link">
          Log out
        </Button>
      ) : (
        <div className="flex flex-col">
          {flow ? (
            <Button variant="link" asChild>
              <Link
                href={{
                  pathname: AUTH_RECOVERY_PAGE,
                  query: { return_to: flow.return_to },
                }}
                className="text-orange-600"
                passHref
              >
                Forgot your password?
              </Link>
            </Button>
          ) : (
            <Skeleton className="h-3 w-[180px] rounded-md my-3.5" />
          )}
          {flow ? (
            <Button variant="link" asChild disabled={!flow}>
              <Link
                href={{
                  pathname: AUTH_REGISTRATION_PAGE,
                  query: { return_to: flow.return_to },
                }}
                className="inline-flex space-x-2"
                passHref
              >
                Create an account
              </Link>
            </Button>
          ) : (
            <Skeleton className="h-3 w-[180px] rounded-md my-3.5" />
          )}
        </div>
      )}
    </Card>
  );
}
