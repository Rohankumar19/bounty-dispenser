import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Image from 'next/image';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  return (
    <div className="bg-white h-screen">
      <div>{session.user?.githubId}</div>
      <div className="ml-96">{session.user?.name}</div>
      <div>{session.user?.githubAccountName}</div>
      <div>{session.user?.email}</div>
      <Image
        src={session.user?.image as string}
        alt="profile pic"
        width={80}
        height={80}
        className="fixed top-4 left-4 rounded-full"
      ></Image>
      <NavigationBar />
    </div>
  );
};

export default page;
