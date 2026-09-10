import { verifySession } from '@/lib/dal';

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
    <div>
      <header>nav menu here</header>

      <main>{children}</main>
    </div>
  );
};

export default ProtectedLayout;
