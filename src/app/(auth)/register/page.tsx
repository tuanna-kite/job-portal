'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';


import RegisterForm from '@/components/forms/RegisterForm';


function RegisterPage() {
  const router = useRouter();

  const form = useForm<any>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = () => {
  };

  return (
    <div className='flex h-full bg-white justify-center items-center mx-auto px-6 py-4'>
      <div className='w-full'>
        <Image src='/images/auth/logo-app.png' alt='logo app' className='my-4 w-44 mx-auto' />
        <div>
          <p className='text-[#212B36] text-center font-semibold text-xl md:text-2xl xl:text-3xl mb-3'>
            Bắt đầu hoàn toàn miễn phí
          </p>
          <div className='flex gap-2 justify-center text-sm'>
            <p className='text-[#212B36]'>Bạn đã có tài khoản?</p>
            <p
              className='text-primary-main font-semibold cursor-pointer hover:underline'
              onClick={() => router.push('/login')}
            >
              Đăng nhập
            </p>
          </div>
        </div>

        <RegisterForm
          onSubmit={onSubmit}
          form={form}
        />
      </div>
    </div>
  );
}

export default RegisterPage;
