'use client'

// Like NavLinks, Links
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  const pathname = "dashboard/about";
  
  return (
    <div style={{margin: '20px 20px 20px 20px'}}>
      <div>{children}</div>
    </div>
  );
}