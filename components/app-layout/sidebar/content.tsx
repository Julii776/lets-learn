import { getMainMenu } from '@/lib/menus';

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { Link, usePathname } from '@/i18n/navigation';

const Content = () => {
  const pathname = usePathname();

  const mainMenuList = getMainMenu(pathname);

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {mainMenuList.map((menu) => (
              <SidebarMenuItem key={menu.id}>
                <SidebarMenuButton
                  render={<Link href={menu.href} />}
                  isActive={menu.isActive}
                >
                  <menu.icon />
                  <span>{menu.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default Content;
