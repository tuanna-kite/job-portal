'use client';

import { Loader2, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
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


interface LoginFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  error?: { message: string } | null;
  isPending?: boolean;
}

const LoginForm = ({ form, onSubmit, error, isPending }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full mt-10 space-y-1'
      >
        {/* Display API Error */}
        {error && (
          <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm'>
            {error.message || 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại.'}
          </div>
        )}

        {/* Email Field */}
        <FormField
          control={form.control}
          name='email'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <Input
                  type='email'
                  placeholder='Email'
                  className={`w-full border rounded-[10px] px-4 py-2 h-12 transition-colors ${
                    fieldState.error
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                  }`}
                  disabled={isPending}
                  {...field}
                />
              </FormControl>
              <FormMessage className='text-red-500 text-xs mt-1' />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name='password'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Mật khẩu'
                    className={`w-full border rounded-[10px] px-4 py-2 h-12 pr-12 transition-colors ${
                      fieldState.error
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    disabled={isPending}
                    {...field}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50'
                    disabled={isPending}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className='text-red-500 text-xs mt-1' />
            </FormItem>
          )}
        />

        <div className='flex justify-end items-end w-full'>
          <div
            className='underline mt-4 text-xs cursor-pointer hover:text-blue-600'
            onClick={() => router.push('/forgot-password')}
          >
            Quên mật khẩu?
          </div>
        </div>

        <button
          type='submit'
          disabled={isPending || !form.formState.isValid}
          className='font-semibold cursor-pointer text-white bg-primary-main hover:opacity-85 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-xl mt-4 w-full h-12 transition-colors'
        >
          {isPending ? (
            <div className='flex gap-2 items-center justify-center'>
              <Loader2 className='w-4 h-4 mr-2 animate-spin' />
              Đang đăng nhập...
            </div>
          ) : (
            'Đăng nhập'
          )}
        </button>
      </form>
    </Form>
  );
};

export default LoginForm;
