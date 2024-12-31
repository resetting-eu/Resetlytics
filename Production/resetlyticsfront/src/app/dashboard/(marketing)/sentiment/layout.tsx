'use client'

import { ClickCounter } from '@/components/ui/basics/ClickCounter';
import { TabGroup } from '@/components/ui/basics/TabGroup';
import React from 'react';
import TwoLevelsMenu from '@/components/ui/basics/TwoLevelsMenu';
import { usePathname } from 'next/navigation';

const title = 'Sentiment Analysis';

import { IMenu } from '@/lib/ui/definitions'

const menu = 
[
  { 
      label: 'Overview', value: 1, menu: []
  },
  { 
      label: 'Analysis', value: 2, menu: []
  },
] as unknown as IMenu

// Like NavLinks, Links
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  const pathname = "dashboard/sentiment";
  
  return (
    <div style={{margin: '20px 20px 20px 20px'}}>
      <div>
        <TwoLevelsMenu name={title} menu={menu} pathname={pathname} />
      </div>
      <div>{children}</div>
    </div>
  );
}
