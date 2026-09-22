import { getNameInitials } from '@/utils/user';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface FooterProps {
  avatarUrl: string | null;
  name: string;
  email: string;
}

const Footer = ({ avatarUrl, name, email }: FooterProps) => {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className="h-auto py-2">
            <Avatar className="size-9 shrink-0">
              <AvatarImage src={avatarUrl ?? undefined} alt={name} />
              <AvatarFallback>{getNameInitials(name)}</AvatarFallback>
            </Avatar>

            <div className="flex min-w-0 flex-1 flex-col items-start">
              <span className="w-full truncate text-sm font-medium">
                {name}
              </span>

              <span className="w-full truncate text-xs text-muted-foreground">
                {email}
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default Footer;
