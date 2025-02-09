"use client";
import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from "@/components/ui/sidebar";

import { MoreHorizontal } from "lucide-react";
import React, { JSX } from "react";

export type NavItem = {
  title: string;
  itemType: "item" | "popup" | "dropdown";
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
};

export type NavSection = {
  sectionName: string;
  tabs: Array<NavItem>;
};

function SimpleNavItem({ item }: { item: NavItem }) {
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <a href={item.url}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
function CollapsibleNavItem({ item }: { item: NavItem }) {
  return (
    <Collapsible
      key={item.title}
      asChild
      defaultOpen={item.isActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items?.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild>
                  <a href={subItem.url}>
                    <span>{subItem.title}</span>
                  </a>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
function PopupNavItem({ item }: { item: NavItem }) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <a href={item.url}>
          {item.icon && <item.icon />}
          <span>{item.title}</span>
        </a>
      </SidebarMenuButton>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover>
            <MoreHorizontal />
            <span className="sr-only">More</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-48 rounded-lg"
          side={isMobile ? "bottom" : "right"}
          align={isMobile ? "end" : "start"}
        >
          {item.items?.map((subItem) => (
            <DropdownMenuItem key={subItem.title}>
              {subItem.icon && <subItem.icon />}
              <span>{subItem.title}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
}
function NavItemData({ item }: { item: NavItem }): JSX.Element {
  switch (item.itemType) {
    case "item":
      return <SimpleNavItem item={item} />;
    case "popup":
      return <PopupNavItem item={item} />;
    case "dropdown":
      return <CollapsibleNavItem item={item} />;
  }
}

export type NavMainProps = { sections: Array<NavSection> }

export function NavItem({ sections }: NavMainProps): JSX.Element {
  return (
  <React.Fragment>
  {sections.map((section) => (
    <SidebarGroup key={section.sectionName}>
      <SidebarGroupLabel>{section.sectionName}</SidebarGroupLabel>
      <SidebarMenu>
        {section.tabs.map((item) => (
          <NavItemData key={item.title} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  ))}
  </React.Fragment>
  );
}
