import Image from "next/image";
import React from "react";

import { bannerSignIn } from "@/contants/images";

import type { PropsWithChildren } from "react";

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-full flex-row">
      <div className="flex-1">{children}</div>
      <div className="hidden flex-2 md:block">
        <Image
          src={bannerSignIn}
          alt="banner"
          className="h-screen w-full rounded-2xl object-cover"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
