'use client'

import { ClickCounter } from '@/components/ui/basics/ClickCounter';
import { TabGroup } from '@/components/ui/basics/TabGroup';
import React from 'react';
import TwoLevelsMenu from '@/components/ui/basics/TwoLevelsMenu';
import { usePathname } from 'next/navigation';

import { IMenu, IMenuItem } from '@/lib/ui/definitions'
const title = 'Service Quality';

const menu_analysis = [
  { label: 'Service', value: 41, menu: [] },
  { label: 'Environment', value: 42, menu: [] },
  { label: 'Reservation', value: 43, menu: [] },
  { label: 'Technology', value: 44, menu: [] },
  { label: 'Staff', value: 45, menu: [] },
  { label: 'Sustainability', value: 46, menu: [] },
  { label: 'Satisfaction', value: 47, menu: [] },
  { label: 'Demographics', value: 48, menu: [] }
] as unknown as IMenu

const menu = 
  [
    {
      label: 'Overview', value: 1, menu: []
    },
    {
      label: 'Survey', value: 2, menu: []
    },
    {
      label: 'Report', value: 3, menu: []
    },
    {
      label: 'Analysis', value: 4, menu: menu_analysis
    },
  ] as unknown as IMenu


// Like NavLinks, Links
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  const pathname = "dashboard/quality";
  
  return (
    <div style={{margin: '20px 20px 20px 20px'}}>
      <div>
        <TwoLevelsMenu name={title} menu={menu} pathname={pathname} />
      </div>
      <div>{children}</div>
    </div>
  );
}
