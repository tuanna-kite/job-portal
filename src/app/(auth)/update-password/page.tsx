'use client';

import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';


import UpdatePasswordForm from '@/components/forms/UpdatePasswordForm';


function UpdatePasswordPage() {

  const form = useForm<any>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  

  const onSubmit = () => {
  };
  

  return (
    <div className='h-full bg-white flex justify-center items-center mx-auto px-6 py-4'>
      <div className='w-full'>
        <Image src='/images/auth/logo-app.png' alt='logo app' className='my-4 w-44 mx-auto' />
        <div>
          <p className='text-[#212B36] text-center font-semibold text-xl md:text-2xl xl:text-3xl mb-3'>
            Đặt lại mật khẩu
          </p>
          <div className='flex gap-2 justify-center text-sm'>
            <p className='text-[#212B36] text-center'>
              Vui lòng nhập mật khẩu mới để hoàn tất việc đặt lại mật khẩu.
            </p>
          </div>
        </div>

        <UpdatePasswordForm
          onSubmit={onSubmit}
          form={form}
        />
      </div>
    </div>
  );
}

export default UpdatePasswordPage;
