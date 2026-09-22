import { verifySession } from '@/lib/dal';

import MobileHeader from '@/components/app-layout/mobile-header';
import AppSidebar from '@/components/app-layout/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

const ProtectedLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  await verifySession(locale);

  return (
    <SidebarProvider>
      <AppSidebar />

      <div className="flex flex-1 flex-col">
        <MobileHeader />

        <main className="flex-1 px-4 lg:px-10 py-4 md:py-6">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
