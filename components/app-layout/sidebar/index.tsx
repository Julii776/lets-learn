'use client';

import { Sidebar } from '@/components/ui/sidebar';

import { useUserStore } from '@/stores/user-store';

import Content from './content';
import Footer from './footer';
import Header from './header';

function AppSidebar() {
  const user = useUserStore((state) => state.user);

  if (!user) return;

  return (
    <Sidebar>
      <Header />
      <Content />
      <Footer avatarUrl={user.avatarUrl} name={user.name} email={user.email} />
    </Sidebar>
  );
}

export default AppSidebar;
