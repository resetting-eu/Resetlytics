/*
'use client'

import * as React from 'react';

import { UserInterface, UserContextType } from './auth-types'
export const UserContext = React.createContext<UserContextType | null>(null);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<UserInterface>(
    {
      email: '',
      access: '',
      refresh: '',
    });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
*/

