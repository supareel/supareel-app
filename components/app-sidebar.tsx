"use client";

import {
  Frame,
  Map,
  NewspaperIcon,
  PieChart,
  SquareTerminal,
} from "lucide-react";
import * as React from "react";

import { NavItem, NavSection } from "@/components/nav-items";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Settings,
} from "lucide-react";

// This is sample data.
const teams = [
  {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  {
    name: "Acme Corp.",
    logo: AudioWaveform,
    plan: "Startup",
  },
  {
    name: "Evil Corp.",
    logo: Command,
    plan: "Free",
  },
];
const navItems: Array<NavSection> = [
  {
    sectionName: "Community",
    tabs: [
      {
        title: "Feed",
        url: "#",
        icon: NewspaperIcon,
        itemType: "item",
      },
      {
        title: "Live Events",
        url: "#",
        icon: NewspaperIcon,
        itemType: "item",
      },
      {
        title: "Spaces",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        itemType: "dropdown",
        items: [
          {
            title: "Start Here",
            url: "#",
          },
          {
            title: "Say Hello",
            url: "#",
          },
          {
            title: "Resources",
            url: "#",
          },
          {
            title: "Newsletter",
            url: "#",
          },
          {
            title: "Disucssions",
            url: "#",
          },
        ],
      },
    ],
  },
  {
    sectionName: "Products",
    tabs: [
      {
        title: "Courses",
        url: "#",
        icon: Frame,
        itemType: "item",
      },
      {
        title: "Digital Downloads",
        url: "#",
        icon: PieChart,
        itemType: "item",
      },
      {
        title: "Store",
        url: "#",
        icon: Map,
        itemType: "popup",
        items: [
          {
            title: "History",
            url: "#",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
            icon: Settings,
          },
        ],
      },
    ],
  },
  {
    sectionName: "Admin",
    tabs: [
      {
        title: "Plan with AI",
        url: "#",
        icon: PieChart,
        itemType: "item",
      },
      {
        title: "Analytics",
        url: "#",
        icon: Frame,
        itemType: "item",
      },
      {
        title: "Public Pages",
        url: "#",
        icon: PieChart,
        itemType: "item",
      },
      {
        title: "Members",
        url: "#",
        icon: PieChart,
        itemType: "item",
      },
      {
        title: "Settings",
        url: "#",
        icon: Map,
        itemType: "dropdown",
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Developers",
            url: "#",
          },
        ],
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavItem sections={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
