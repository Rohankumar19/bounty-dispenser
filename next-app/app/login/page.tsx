import React from 'react';
import Image from 'next/image';
import bgImage from '/public/bg.jpg';
import { FlipWords } from '../components/ui/flip-words';
import { TypewriterEffect } from '../components/ui/typewriter-effect';
import LoginArea from '../components/LoginArea';

const page = () => {
  return (
    <>
      <main className=" grid grid-cols-2 h-screen">
        <div className="p-48 bg-white">
          <LoginArea />
        </div>

        <div className="flex flex-col gap-10 justify-center items-center m-10 rounded-xl bg-custom-orange ">
          <TypewriterEffect
            words={[{ text: 'Gitfolio.' }]}
            cursorClassName={'whiteColor'}
          />
          <div className="text-3xl">
            <span className="text-white">A Place to Earn</span>
            <FlipWords
              words={['Skills.', 'Crypto.', 'Experience.', 'Connections.']}
              duration={1000}
              className="font-bold text-white"
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
