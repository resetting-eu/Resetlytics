'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ActiveLink({
  isActive,
  searchParams,
  children,
}: {
  isActive: boolean;
  searchParams: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  console.log(pathname, searchParams)
  return (
    <Link
      className={clsx('rounded-lg px-3 py-1 text-sm font-medium no-underline', {
        'bg-gray-700 text-gray-100 hover:bg-gray-500 hover:text-white':
          !isActive,
        'bg-vercel-blue text-blue': isActive,
      })}
      //href={pathname + '?' + searchParams}
      href={pathname + '/P1/opt1'}
    >
      {children}
    </Link>
  );
}