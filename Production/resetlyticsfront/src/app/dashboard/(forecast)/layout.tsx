

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>{children}</section>
  );
}
// { text: 'Account', slug: 'account' },