import Image from 'next/image';
import React from 'react';

import { bannerSignIn } from "@/contants/images";

import type { PropsWithChildren } from 'react';

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className='flex h-screen flex-row w-full'>
      <div className='flex-1'>{children}</div>
      <div className='flex-2 hidden md:block'>
        <Image
          src={bannerSignIn}
          alt='banner'
          className='h-screen w-full object-cover rounded-2xl'
        />
      </div>
    </div>
  );
}

export default AuthLayout;
