"use client"
import { FC } from "react";
import { Bean } from "lucide-react";

import { cn } from "@/utils/common";

interface props {
  on_signout?: () => void;
}

const BeanLogo: FC<props> = ({
  on_signout
}) => {

  return (
    <div
      onClick={on_signout ?? undefined}
      className={cn(
        "flex items-center gap-2 py-1 px-3",
        "border border-transparent rounded-sm bg-background/50 hover:bg-background/80 duration-300",
        on_signout ? 'cursor-pointer' : 'cursor-default'
      )}
    >
      <Bean className="size-5 text-primary" />

      <h1 className="text-lg hidden md:block">
        BEAN
      </h1>
    </div>
  );
};

export default BeanLogo;