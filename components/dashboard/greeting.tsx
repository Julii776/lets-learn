'use client';

import { format } from 'date-fns';

import { getGreetingText } from '@/utils/dashboard';

interface DashboardGreetingProps {
  name: string;
}

const Greeting = ({ name }: DashboardGreetingProps) => {
  const now = new Date();

  const greeting = getGreetingText();

  return (
    <div>
      <p className="text-xs font uppercase tracking-wide text-primary">
        {format(now, 'EEEE, MMMM d')}
      </p>

      <h1 className="mt-1 text-2xl">
        {greeting}, {name}.
      </h1>
    </div>
  );
};

export default Greeting;
