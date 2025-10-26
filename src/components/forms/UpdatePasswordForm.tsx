'use client';

import { ArrowLeft2 } from 'iconsax-react';
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


interface UpdatePasswordFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  error?: { message: string } | null;
  isPending?: boolean;
}

const UpdatePasswordForm = ({
  form,
  onSubmit,
  error,
  isPending,
}: UpdatePasswordFormProps) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full mt-10 space-y-4'
      >
        {/* Display API Error */}
        {error && (
          <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm'>
            {error.message ||
              'Đã xảy ra lỗi khi đặt lại mật khẩu. Vui lòng thử lại.'}
          </div>
        )}

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
                    placeholder='Mật khẩu mới'
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

        {/* Confirm Password Field */}
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field, fieldState }) => (
            <FormItem>
              <FormControl>
                <div className='relative'>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Nhập lại mật khẩu mới'
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
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50'
                    disabled={isPending}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
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

        <button
          type='submit'
          disabled={isPending || !form.formState.isValid}
          className='font-semibold cursor-pointer text-white bg-primary-main hover:opacity-85 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-xl mt-4 w-full h-12 transition-colors'
        >
          {isPending ? (
            <div className='flex gap-2 items-center justify-center'>
              <Loader2 className='w-4 h-4 mr-2 animate-spin' />
              Đang đặt lại mật khẩu...
            </div>
          ) : (
            'Đặt lại mật khẩu'
          )}
        </button>
        <div className='flex gap-2 mt-4 justify-center cursor-pointer items-center w-full'>
          <ArrowLeft2 size='16' color='#292D32' />
          <div
            className='text-xs font-semibold'
            onClick={() => router.push('/login')}
          >
            Quay lại đăng nhập
          </div>
        </div>
      </form>
    </Form>
  );
};

export default UpdatePasswordForm;
