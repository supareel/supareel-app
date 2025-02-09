import { AppSidebar } from "@/components/app-sidebar";
import { EventSidebar } from "@/components/event-sidebar";
import { AnnouncementPost } from "@/components/posts/AnnouncementPost";
import FeedPost from "@/components/posts/FeedPost";
import { Search } from "@/components/search";
import SignInUser from "@/components/SignInUser";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { currentUser } from "@clerk/nextjs/server";

export default async function HomePage() {
  const user = await currentUser();

  return (
    <SidebarProvider>
      <AppSidebar side="left" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Search />
            <SignInUser />
          </div>
        </header>
        <div className="flex flex-1 flex-col p-4 pt-0">
          <AnnouncementPost
            email={user?.primaryEmailAddress?.emailAddress}
            name={user?.fullName}
          />
          <FeedPost
            email={user?.primaryEmailAddress?.emailAddress}
            name={user?.fullName}
            avatar={user?.imageUrl}
          />
          <FeedPost
            email={user?.primaryEmailAddress?.emailAddress}
            name={user?.fullName}
            avatar={user?.imageUrl}
          />
        </div>
      </SidebarInset>
      <EventSidebar side="right" variant="floating" />
    </SidebarProvider>
  );
}
