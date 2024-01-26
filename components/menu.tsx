"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const navItems: { id: number; title: string; href: string }[] = [
  {
    id: 1,
    title: "Home",
    href: "/",
  },
  {
    id: 2,
    title: "Projects",
    href: "/projects",
  },
  {
    id: 3,
    title: "About",
    href: "/about",
  },
  {
    id: 4,
    title: "CV",
    href: "/cv",
  },
  {
    id: 5,
    title: "Contact",
    href: "/contact",
  },
  {
    id: 6,
    title: "Blog",
    href: "/blog",
  },
];

export function Menu() {
  return (
    <NavigationMenu className="space-x-4">
      <NavigationMenuList>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.id}>
            <Link
              href={item.href}
              legacyBehavior
              passHref
              className="bg-transparent"
            >
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} bg-transparent`}
              >
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
