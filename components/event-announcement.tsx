"use client";
import {
  Card,
  CardContent,
  CardHeader
} from "@/components/ui/card";
import { SidebarGroup, SidebarMenu } from "@/components/ui/sidebar";
import { type LucideIcon } from "lucide-react";
import Image from "next/image";
import React, { JSX } from "react";

export type NavItem = {
  title: string;
  subtitle: string;
  url: string;
  color: "orange" | "green" | "blue" | "gray";
  image?: string;
  icon?: LucideIcon;
};

export type NavSection = {
  sectionName: string;
  tabs: Array<NavItem>;
};

export type NavMainProps = { section: NavSection }

export function EventAnnouncementItem({ section }: NavMainProps): JSX.Element {
  return (
  
    <React.Fragment>
        <SidebarGroup key={section.sectionName}>
          <SidebarMenu>
            {section.tabs.map((item) => (
              <Card className="w-full m-0" key={item.title}>
              <CardHeader className="flex flex-col items-start p-2">
                <h3 className="leading-none">{item.title}</h3>
                <p className="leading-none text-sm text-gray-600 font-extralight">{item.subtitle}</p>
              </CardHeader>
              <CardContent className="relative w-full h-48 p-2"> {/* Added padding */}
                {item.image && (
                  <div className="relative w-full h-full rounded-md overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                )}
              </CardContent>
            </Card>            
            ))}
          </SidebarMenu>
        </SidebarGroup>
    </React.Fragment>
  );
}
