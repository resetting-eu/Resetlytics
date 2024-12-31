

//<h1>Quality - colocar aqui o overview</h1>

import { Boundary } from '@/components/ui/basics/Boundary';
import { Suspense } from 'react';
import ActiveLink from './active-link';
import Client from './client';
import { Typography } from '@mui/material';

const options = [
  {
    name: 'P1',
    value: 'P1',
    items: ['opt1', 'opt2'],
  },
  {
    name: 'P2',
    value: 'P2',
    items: ['opt1', 'opt2'],
  },
];

export const dynamic = 'force-dynamic';

export default async function Page({ searchParams }: { searchParams: any }) {
  console.log(searchParams.toString())
  return (
    <div className="prose prose-sm prose-invert max-w-none">
      
      <div className="mt-12 space-y-12">
        <div className="space-y-4">
          <Boundary labels={['From the Client']}>
            <h3 className="mt-0">
              Using <code>useRouter&#40;&#41;</code>
            </h3>

            <Suspense>
              <Client options={options} />
            </Suspense>
          </Boundary>

        </div>
        <div>
          <Boundary labels={['MEU']}>
            <h3>Supostamente o conteudo</h3>
            
          </Boundary>


        </div>
        <div className="space-y-4">
          <Boundary labels={['From the Server']}>
            <h3 className="mt-0">
              Using <code>&lt;Link&gt;</code>
            </h3>

            <div className="flex items-center gap-6">
              {options.map((option) => {
                return (
                  <div key={option.name}>
                    <div className="text-gray-400">{option.name}</div>
                    <div className="mt-1 flex gap-2">
                      {option.items.map((item, i) => {
                        const isActive =
                          // set the first item as active if no search param is set
                          (!searchParams[option.value] && i === 0) ||
                          // otherwise check if the current item is the active one
                          item === searchParams[option.value];

                        // create new searchParams object for easier manipulation
                        const params = new URLSearchParams(searchParams);
                        params.set(option.value, item);
                        return (
                          <ActiveLink
                            key={item}
                            isActive={isActive}
                            searchParams={params.toString()}
                          >
                            {item}
                          </ActiveLink>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </Boundary>

        </div>
      </div>
    </div>
  );
}