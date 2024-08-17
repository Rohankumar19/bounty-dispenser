'use client';
import React from 'react';
import { Box, TextField } from '@radix-ui/themes';
import ButtonWrapper from './ui/CoolButton';

const LoginArea = () => {
  return (
    <div className="h-full flex flex-col justify-around text-2xl">
      <div className="text-3xl">
        Get <span className="text-custom-orange font-bold"> Started</span>
      </div>
      <input
        className=" outline-none border-2 border-white border-b-custom-orange focus:border-4 hover:border-4 p-2"
        type="email"
        placeholder="Email"
      />
      <input
        className=" outline-none border-2 border-white border-b-custom-orange focus:border-4 hover:border-4 p-2"
        style={{ borderBottomColor: '#f95738' }}
        type="password"
        placeholder="Password"
      />
      <div className="flex gap-1 items-center text-xl">
        <input
          className=" outline-none border-2 border-white "
          style={{ borderBottomColor: '#f95738' }}
          type="checkbox"
          placeholder="password"
        />
        <span>Remember me</span>
      </div>
      <ButtonWrapper text="Log in" widthLength="w-96" />
      <hr />
      <div className="grid grid-flow-col gap-10">
        <ButtonWrapper text="Log in With Google" widthLength="w-48" />
        <ButtonWrapper text="Log in With Twiter" widthLength="w-48" />
      </div>
      <div className=" text-center">
        {`Don't have a account? `}
        <span className="text-custom-orange underline">Register Here</span>
      </div>
    </div>
  );
};

export default LoginArea;
