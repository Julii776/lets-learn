import { redirectIfAuthenticated } from '@/lib/dal';

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  await redirectIfAuthenticated(locale);

  return (
    <main className="flex min-h-screen">
      {/* Left decorative panel */}
      <div className="hidden bg-success-bg md:block md:w-1/2" />

      {/* Content */}
      <div className="flex w-full items-center justify-center px-4 py-8 md:w-1/2 md:px-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
