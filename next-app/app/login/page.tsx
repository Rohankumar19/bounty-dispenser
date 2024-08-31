import React from 'react';
import Image from 'next/image';
import bgImage from '/public/bg3.jpg';

import { FlipWords } from '../components/ui/flip-words';
import { TypewriterEffect } from '../components/ui/typewriter-effect';
import LoginArea from '../components/LoginArea';

import { getServerSession } from 'next-auth'; // for checking session details on server side think so (for client side checking use useSession)
import { authOptions } from '@/lib/authOptions';
import { redirect } from 'next/navigation';

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <>
      <main
        className="h-screen grid w-screen animate-container"
        style={{ gridTemplateColumns: '1fr 1.5fr' }}
      >
        <div className="flex flex-col gap-10 justify-center items-center m-10 rounded-xl">
          <TypewriterEffect words={[{ text: 'Gitfolio.' }]} />
          <div className="text-4xl">
            <span className="text-black">A Place to Earn</span>
            <FlipWords
              words={['Skills.', 'Crypto.', 'Experience.', 'Connections.']}
              duration={1000}
              className="font-bold text-login-page-color text-4xl"
            />
            <div>
              <LoginArea />
            </div>
          </div>
        </div>
        <div className="flex bg-login-page-color">
          <Image
            src={bgImage}
            alt="a background image "
            className="w-full h-auto object-contain rounded-xl"
          />
        </div>
      </main>
    </>
  );
};

export default Page;
