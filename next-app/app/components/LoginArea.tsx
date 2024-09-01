'use client';
import ButtonWrapper from './ui/CoolButton';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const LoginArea = () => {
  return (
    <>
      <ButtonWrapper
        text="Get Started with Github"
        widthLength=" w-72"
        onclick={() => signIn('github')}
      />
    </>
  );
};

export default LoginArea;
