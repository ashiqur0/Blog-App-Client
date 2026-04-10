
import { AppSidebar } from "@/components/layout/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Roles } from "@/constants/role";
import { userService } from "@/services/user.service";

export default async function DashboardLayout({
  user,
  admin,
}: {
  user: React.ReactNode,
  admin: React.ReactNode,
}) {

  const { data } = await userService.getSession();
  const userInfo = data.user;

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === Roles.admin ? admin : user}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}