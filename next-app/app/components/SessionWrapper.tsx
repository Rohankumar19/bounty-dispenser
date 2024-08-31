'use client';
import React from 'react';
import { SessionProvider } from 'next-auth/react'; // bascially used to check if a session is active(sessionID)

const SessionWrapper = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionWrapper;
