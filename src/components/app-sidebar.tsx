import * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Link } from "react-router"

import { getSidebarItems } from "@/utils/getSidebarItems"
import { useUserInfoQuery } from "@/redux/features/auth/auth.api"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useUserInfoQuery(undefined)

  const data = {
    navMain: getSidebarItems(userData?.data?.role)
  }


  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link to="/">
          <img
            className="w-14 h-14"
            src="https://img.icons8.com/?size=100&id=pt5RU2ksbVFL&format=png&color=000000"
            alt=""
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="font-bold">{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild >
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
