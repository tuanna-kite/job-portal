'use client';

import { ArrowLeft2 } from 'iconsax-react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import type { UseFormReturn } from 'react-hook-form';


interface ForgotPasswordFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  error?: { message: string } | null;
  isPending?: boolean;
}

const ForgotPasswordForm = ({
  form,
  onSubmit,
  error,
  isPending,
}: ForgotPasswordFormProps) => {
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

        <button
          type='submit'
          disabled={isPending || !form.formState.isValid}
          className='font-semibold cursor-pointer text-white bg-primary-main hover:opacity-85 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-xl mt-4 w-full h-12 transition-colors'
        >
          {isPending ? (
            <div className='flex gap-2 items-center justify-center'>
              <Loader2 className='w-4 h-4 mr-2 animate-spin' />
              Đang gửi yêu cầu...
            </div>
          ) : (
            'Gửi yêu cầu'
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

export default ForgotPasswordForm;
