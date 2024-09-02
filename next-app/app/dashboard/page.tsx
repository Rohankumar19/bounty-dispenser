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

  let allUsers;
  try {
    const response = await fetch(
      `http://localhost:8000/api/user/${session.user?.githubAccountName}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    allUsers = await response.json();
    console.log(allUsers);
  } catch (err) {
    console.log('Error: ' + err);
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
      {allUsers.issues.map((issue: any) => (
        <div key={issue.issueNumber}>
          <div>{issue.owner}</div>
          <div>{issue.repo}</div>
          <div>{issue.issueNumber}</div>
        </div>
      ))}

      <NavigationBar />
    </div>
  );
};

export default page;
