'use client';

import { clsx } from 'clsx';
import { ArrowLeft2, HambergerMenu } from 'iconsax-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { logoWhite } from "@/contants/images";

export const MenuMobile = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [menuStep, setMenuStep] = useState<'main' | 'account'>('account');
  const [open, setOpen] = useState(false);

  const handleNavigateToHome = () => {
    router.push('/');
  };

  const handleRoute = (href: string) => {
    router.push(href);
    setOpen(false);
  };

  const listExplore = [
    'Việt Nam Tiền Sử',
    'Việt Nam thời Kỷ Dựng Nước',
    'Việt Nam Thời Bắc Thuộc',
    'Việt Nam thời kỳ chống Bắc Thuộc',
    'Việt Nam Thời Phong Kiến Độc Lập',
    'Việt Nam Cận Hiện Đại',
  ];

  const listChallenge = ['Câu hỏi vui', 'Sắp xếp', 'Ghép hình', 'Điền từ'];

  const listMainMenu = [
    {
      label: 'Tổng quan',
      href: '/',
      onClick: () => handleRoute('/'),
    },
    {
      label: 'Hồ sơ',
      href: '/',
      onClick: () => handleRoute('/'),
    },
    {
      label: 'Khoá học đã đăng ký',
      href: '/',
      onClick: () => handleRoute('/'),
    },
    {
      label: 'Cài đặt',
      onClick: () => {},
    },
  ];

  return (
    <Drawer
      direction='left'
      open={open}
      onOpenChange={val => {
        setOpen(val);
        if (!val) setMenuStep('main');
      }}
    >
      <DrawerTrigger>
        <HambergerMenu variant='Broken' size={24} color='#637381' />
      </DrawerTrigger>
      <DrawerContent className='bg-white w-[320px] rounded-none h-full shadow-md overflow-y-auto'>
        <DrawerTitle className='sr-only'>menu</DrawerTitle>

        <div className='p-4 w-full'>
          <Image
            src={logoWhite}
            alt='Logo'
            width={127}
            height={40}
            onClick={handleNavigateToHome}
          />
        </div>

        {/* === Account View === */}
        {menuStep === 'account' && (
          <div className='p-4'>
            <div
              onClick={() => setMenuStep('main')}
              className='w-full mb-4 gap-2 flex items-center px-3 py-6 rounded-md bg-[#919EAB14] hover:bg-gray-100'
            >
              <ArrowLeft2 size='16' color='#333' />
              <p>Menu</p>
            </div>

            <div className='text-xs font-semibold text-gray-500 uppercase mb-2'>
              Cá nhân
            </div>
            {listMainMenu.map((item, i) => (
              <Button
                key={i}
                variant='ghost'
                className={clsx(
                  'w-full justify-start text-sm rounded-md',
                  pathname === item.href &&
                    'bg-red-100 text-red-500 font-semibold'
                )}
                onClick={item.onClick}
              >
                {item.label}
              </Button>
            ))}
          </div>
        )}

        {/* === Main Menu === */}
        {menuStep === 'main' && (
          <div className='p-4 space-y-4'>
            <h1 className='text-xs font-semibold text-gray-500 uppercase mb-2'>
              Thử thách
            </h1>
            <div className='flex flex-col gap-2 mb-4'>
              {listChallenge.map((label, i) => (
                <Button
                  key={i}
                  variant='ghost'
                  className='w-full justify-start text-sm rounded-md'
                >
                  {label}
                </Button>
              ))}
            </div>

            <h1 className='text-xs font-semibold text-gray-500 uppercase mb-2'>
              Khám phá
            </h1>
            <div className='flex flex-col gap-2'>
              <Button
                variant='ghost'
                className='w-full justify-start text-sm bg-red-100 text-red-500 font-semibold rounded-md'
              >
                Việt Nam Tiền Sử
              </Button>
              {listExplore.slice(1).map((item, i) => (
                <Button
                  key={i}
                  variant='ghost'
                  className='w-full justify-start text-sm rounded-md'
                >
                  {item}
                </Button>
              ))}
            </div>
          </div>
        )}

        <DrawerFooter className='mb-6'>
          <>
            <Button variant='ghost' className='w-full'>
              Đăng nhập
            </Button>
            <Button className='bg-primary-main text-white w-full'>
              Bắt đầu miễn phí
            </Button>
          </>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
