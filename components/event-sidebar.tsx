"use client";

import * as React from "react";

import { EventAnnouncementItem } from "@/components/event-announcement";
import { EventNavItem, NavSection } from "@/components/event-items";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar";

// This is sample data.

const navAnnouncement: NavSection ={
  sectionName: "Announcement",
  tabs: [
    {
      image: "https://picsum.photos/id/237/300/200",
      title: "Courses",
      subtitle: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
      color: "orange",
      date: new Date(),
      url: "#",
    },
  ],
};

const navItems: NavSection = {
  sectionName: "Upcoming",
  tabs: [
    {
      title: "Courses",
      subtitle: "item",
      color: "orange",
      date: new Date(),
      url: "#",
    },
    {
      title: "Meet Tommorow",
      subtitle: "item",
      color: "blue",
      date: new Date(),
      url: "#",
    },
    {
      title: "Courses",
      subtitle: "item",
      color: "orange",
      url: "#",
      date: new Date(),
    }
  ],
};

export function EventSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <h3 className="text-lg font-semibold tracking-tight mx-2 my-1 uppercase">Highlights</h3>
      </SidebarHeader>
      <h4 className="scroll-m-20 text-xs font-semibold tracking-tight mx-2 my-1">{navAnnouncement.sectionName.toUpperCase()}</h4>
      <SidebarContent>
        <EventAnnouncementItem section={navAnnouncement} />
      </SidebarContent>
      <h4 className="scroll-m-20 text-xs font-semibold tracking-tight mx-2 my-1">{navItems.sectionName.toUpperCase()}</h4>
      <SidebarContent>
        <EventNavItem section={navItems} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
