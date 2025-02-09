"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SidebarGroup, SidebarMenu } from "@/components/ui/sidebar";
import { type LucideIcon } from "lucide-react";
import React, { JSX } from "react";
export type NavItem = {
  title: string;
  subtitle: string;
  url: string;
  date: Date;
  color: "orange" | "green" | "blue" | "gray";
  image?: string;
  icon?: LucideIcon;
};

export type NavSection = {
  sectionName: string;
  tabs: Array<NavItem>;
};

export type NavMainProps = { section: NavSection };

export function EventNavItem({ section }: NavMainProps): JSX.Element {
  return (
    <React.Fragment>
      <SidebarGroup key={section.sectionName}>
        <SidebarMenu>
          {section.tabs.map((item) => (
            <Alert key={item.title} className={`flex p-2 items-start border-l-4 border-t-0 border-b-0 border-r-0 border-${item.color}-500 bg-${item.color}-100 rounded-sm`}>
              <span className="border-green-500 bg-green-100 border-orange-500 bg-orange-100 border-blue-500 bg-blue-100 border-gray-500 bg-gray-100"></span>
              {/* Date Badge */}
              <div className="flex flex-col items-center justify-center w-12 h-12 bg-white border border-gray-300 rounded-md shadow-sm">
                <span className="text-lg font-bold text-gray-900">
                  {item.date.getDate()} {/* Dynamic Date */}
                </span>
                <span className="text-xs uppercase text-gray-600">
                  {item.date.toLocaleString("en-US", { month: "short" })} {/* Short Month */}
                </span>
              </div>
              <div className="flex flex-col flex-1 p-2">
            <AlertTitle>{item.title}</AlertTitle>
            <AlertDescription className="text-gray-400">
              {item.subtitle}
            </AlertDescription>
            </div>
          </Alert>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </React.Fragment>
  );
}
