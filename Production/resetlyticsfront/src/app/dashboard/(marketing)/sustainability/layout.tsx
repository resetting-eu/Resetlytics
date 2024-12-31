'use client'

import React from 'react';
import TwoLevelsMenu from '@/components/ui/basics/TwoLevelsMenu';

import { IMenu } from '@/lib/ui/definitions'

const menu_analysis = [
  { label: 'Economic', value: 41, menu: [] },
  { label: 'Social', value: 41, menu: [] },
  { label: 'Environment', value: 42, menu: [] },
  { label: 'Demographics', value: 44, menu: [] }
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
] as unknown as IMenu;

// Like NavLinks, Links
export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  const pathname = "dashboard/sustainability";
  const title = "Sustainability";
  return (
    <div style={{margin: '20px 20px 20px 20px'}}>
      <div>
        <TwoLevelsMenu name={title} menu={menu} pathname={pathname} />
      </div>
      <div>{children}</div>
    </div>
  );
}
