'use client';

import { Loader2, Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import type { UseFormReturn } from 'react-hook-form';


interface RegisterFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  error?: { message: string } | null;
  isPending?: boolean;
}

const RegisterForm = ({
  form,
  onSubmit,
  error,
  isPending,
}: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full mt-[40px] space-y-1'
      >
        {/* Display API Error */}
        {error && (
          <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm'>
            {error.message || 'Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại.'}
          </div>
        )}

        {/* Name Field */}
        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type='text'
                  placeholder='Họ và tên'
                  className='w-full border border-gray-200 rounded-[10px] px-4 py-2 h-12 focus:border-blue-500 focus:ring-blue-500'
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type='email'
                  placeholder='Email'
                  className='w-full border border-gray-200 rounded-[10px] px-4 py-2 h-12 focus:border-blue-500 focus:ring-blue-500'
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Password'
                    className='w-full border border-gray-200 rounded-[10px] px-4 py-2 h-12 pr-12 focus:border-blue-500 focus:ring-blue-500'
                    disabled={isPending}
                    {...field}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                    disabled={isPending}
                  >
                    {showPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Terms and Conditions */}
        <div className='text-center text-secondary text-xs mt-4'>
          Bằng cách đăng ký, tôi đồng ý với
        </div>
        <div className='flex justify-center items-center w-full mt-1 gap-1'>
          <div className='underline text-xs  cursor-pointer text-[#212B36] hover:text-blue-600'>
            Điều khoản dịch vụ
          </div>
          <div className='text-center text-secondary text-xs'>và</div>
          <div className='underline text-xs cursor-pointer text-[#212B36] hover:text-blue-600'>
            Chính sách bảo mật
          </div>
        </div>

        <button
          type='submit'
          disabled={isPending}
          className='font-semibold text-white bg-primary-main cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed rounded-xl mt-4 w-full h-12'
        >
          {isPending ? (
            <div className='flex gap-2 items-center justify-center'>
              <Loader2 className='w-4 h-4 mr-2 animate-spin' />
              Đang tạo tài khoản...
            </div>
          ) : (
            'Tạo tài khoản'
          )}
        </button>
      </form>
    </Form>
  );
};

export default RegisterForm;
