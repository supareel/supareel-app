"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export function DynamicBreadcrumb({ ...props }: React.ComponentProps<"form">) {
  const pathname = usePathname();

  const pathNameArr = pathname
    .split("/")
    .filter(Boolean)
    .map((path) => path[0].toUpperCase() + path.slice(1));

  function buildPathUrl(pathName: string) {
    const pathIndex = pathNameArr.indexOf(pathName);
    return pathNameArr.slice(0, pathIndex + 1).join("/");
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {pathNameArr.length > 0 ? (
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          ) : (
            <BreadcrumbPage>Home</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {pathNameArr.length > 0 && (
          <BreadcrumbSeparator className="hidden md:block" />
        )}

        {Array.isArray(pathNameArr) &&
          pathNameArr.map((pathName, index) => {
            if (index == pathNameArr.length - 1) {
              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbPage>{pathName}</BreadcrumbPage>
                  </BreadcrumbItem>
                </React.Fragment>
              );
            }
            return (
              <React.Fragment key={index}>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href={buildPathUrl(pathName)}>
                    {pathName}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </React.Fragment>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
