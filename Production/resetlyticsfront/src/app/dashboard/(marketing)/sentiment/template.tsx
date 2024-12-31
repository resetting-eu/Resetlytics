import { Boundary } from '@/components/ui/basics/Boundary';
import React from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


//  return <Boundary labels={['Sentiment Analysis']}>{children}</Boundary>;