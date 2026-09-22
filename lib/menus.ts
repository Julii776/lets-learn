import { Compass, LayoutDashboard } from 'lucide-react';

import { APP_ROUTES } from '@/constants/routes';

export const getMainMenu = (pathname: string) => {
  return [
    {
      id: 'dashboard',
      href: APP_ROUTES.DASHBOARD,
      label: 'Dashboard',
      isActive: pathname === APP_ROUTES.DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      id: 'discover',
      href: APP_ROUTES.DISCOVER,
      label: 'Discover',
      isActive: pathname === APP_ROUTES.DISCOVER,
      icon: Compass,
    },
  ];
};
