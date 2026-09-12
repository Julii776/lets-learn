import 'server-only';

import { cookies } from 'next/headers';

import { COOKIE_NAMES } from '@/constants/cookies';
import { APP_ROUTES } from '@/constants/routes';

import { redirect } from '@/i18n/navigation';

export const verifySession = async (locale: string) => {
  const token = (await cookies()).get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

  if (!token) {
    redirect({ href: APP_ROUTES.LOGIN, locale: locale });
  }
};

export const redirectIfAuthenticated = async (locale: string) => {
  const token = (await cookies()).get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

  if (token) {
    redirect({
      href: APP_ROUTES.DASHBOARD,
      locale,
    });
  }
};
