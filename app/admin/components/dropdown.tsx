"use client";

import * as React from "react";
import { PersonIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSignout } from "@/app/auth/signout/useSignout";
import { GlobalContext } from "@/contexts/GlobalContext";

export function Dropdown() {
  const { user } = React.useContext(GlobalContext);
  const { mutation } = useSignout();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="font-medium px-4 py-6">
          <Avatar className={`${user?.displayName ? "mr-2" : ""}`}>
            <AvatarImage src={user?.photoURL} alt="user" />
            <AvatarFallback>
              <PersonIcon className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
          {user?.displayName}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={() => router.push("/admin/profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => mutation.mutate()}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
