
import { Boundary } from '@/components/ui/basics/Boundary';
import { ClickCounter } from '@/components/ui/basics/ClickCounter';
import { TabGroup } from '@/components/ui/basics/TabGroup';
import React from 'react';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

// get all data
  return (
        <>{children}</>
  );
}

// { text: 'Account', slug: 'account' },