import { Category2 } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface DropdownTabsProps {
  type?: 'default' | 'custom';
}

const listChallenge = [
  {
    title: 'Câu hỏi vui',
    route: '/',
  },
  {
    title: 'Sắp xếp',
    route: '/',
  },
  {
    title: 'Ghép hình',
    route: '/',
  },
  {
    title: 'Điền từ',
    route: '/',
  },
];

const DropdownTabs = ({ type = 'default' }: DropdownTabsProps) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='focus-visible:outline-none'>
        <div
          className={cn(
            'flex items-center cursor-pointer rounded-md',
            type === 'custom' && 'p-2'
          )}
        >
          <div className='p-1'>
            <Category2 size='18' color='#27272A' />
          </div>
          <p
            className={cn(
              'font-semibold text-sm px-1.5 py-0.5 rounded-md',
              type === 'custom' ? ' text-[#212B36]' : 'text-[#212B36]'
            )}
          >
            Thử thách
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='start'
        sideOffset={20}
        alignOffset={-10}
        className='grid grid-cols-1 grid-rows-1 bg-white border-none'
      >
        {listChallenge.map(item => (
          <DropdownMenuItem key={item.title} className='block'>
            <Button
              variant='ghost'
              className='block w-full text-left text-normal text-text-primary font-normal hover:text-text-primary'
              onClick={() => router.push(item.route)}
            >
              {item.title}
            </Button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownTabs;
