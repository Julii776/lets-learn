'use client';

import { Menu } from 'lucide-react';

import { PAGE_TITLES } from '@/constants/page-titles';

import { useSidebar } from '@/components/ui/sidebar';

import { usePathname } from '@/i18n/navigation';

import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

const MobileHeader = () => {
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  const title = PAGE_TITLES[pathname] ?? 'SkillSwap';

  return (
    <div className="md:hidden">
      <header className="relative flex h-14 items-center left-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <Menu className="size-5" />
        </Button>

        <h1 className="absolute left-1/2 -translate-x-1/2 text-base font-semibold">
          {title}
        </h1>
      </header>
      <Separator />
    </div>
  );
};

export default MobileHeader;
