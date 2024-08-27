'use client';
import React, { useState } from 'react';
import ButtonWrapper from './ui/CoolButton';
import { useRouter } from 'next/navigation';

const LoginArea = () => {
  type FormDetails = {
    email: string;
    password: string;
    rememberMe: boolean;
  };

  const [details, setDetails] = useState<FormDetails>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const router = useRouter();

  // form verification and authentication, bg change later
  function submitForm(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    console.log(details);
    router.push('/dashboard');
  }

  return (
    <form className="h-full flex flex-col justify-around text-2xl">
      <div className="text-3xl">
        Get <span className="text-custom-orange font-bold"> Started</span>
      </div>
      <input
        className=" outline-none border-2 border-white border-b-custom-orange focus:border-4 hover:border-4 p-2"
        type="email"
        placeholder="Email"
        onChange={(e) => setDetails({ ...details, email: e.target.value })}
      />
      <input
        className=" outline-none border-2 border-white border-b-custom-orange focus:border-4 hover:border-4 p-2"
        style={{ borderBottomColor: '#f95738' }}
        type="password"
        placeholder="Password"
        onChange={(e) => setDetails({ ...details, password: e.target.value })}
      />
      <div className="flex gap-1 items-center text-xl">
        <input
          className=" outline-none border-2 border-white "
          style={{ borderBottomColor: '#f95738' }}
          type="checkbox"
          placeholder="password"
          onChange={(e) =>
            setDetails({ ...details, rememberMe: e.target.checked })
          }
        />
        <span>Remember me</span>
      </div>
      <ButtonWrapper text="Log in" widthLength="w-96" onclick={submitForm} />
      <hr />
      <div className="grid grid-flow-col gap-10">
        <ButtonWrapper
          text="Log in With Google"
          widthLength="w-48"
          onclick={'#'}
        />
        <ButtonWrapper
          text="Log in With Twiter"
          widthLength="w-48"
          onclick={'#'}
        />
      </div>
      <div className=" text-center text-xl">
        {`Don't have a account? `}
        <span className="text-custom-orange underline">Register Here</span>
      </div>
    </form>
  );
};

export default LoginArea;
