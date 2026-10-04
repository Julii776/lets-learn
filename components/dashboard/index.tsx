'use client';

import { useUserStore } from '@/stores/user-store';

import Greeting from './greeting';

const Dashboard = () => {
  const user = useUserStore((state) => state.user);
  if (!user) return;
  return <Greeting name={user.name} />;
};

export default Dashboard;
