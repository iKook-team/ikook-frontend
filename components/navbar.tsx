"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Button, Link, Input, Divider, Image } from "@heroui/react";
import { FiShoppingCart } from "react-icons/fi";
import NextLink from "next/link";
import { CiSearch } from "react-icons/ci";
import { IoMenu } from "react-icons/io5";
import { FiUser } from "react-icons/fi";

import {
  Logo,
} from "@/components/icons";

export const Navbar = () => {
  const searchInput = (
    <div className="border-1 rounded-full flex justify-between items-center py-1 px-2 gap-2 shadow">
      <Input
        aria-label="location"
        labelPlacement="inside"
        placeholder="Location"
        classNames={{
          inputWrapper: ["bg-transparent", "shadow-none", "hover:bg-transparent", "group-data-[focus=true]:bg-transparent"],
        }}
      />
      <Divider orientation="vertical" />
      <Input
        aria-label="date"
        labelPlacement="inside"
        placeholder="Event Date"
        type="text"
        classNames={{
          inputWrapper: ["bg-transparent", "shadow-none", "hover:bg-transparent", "group-data-[focus=true]:bg-transparent"],
        }}
      />
      <Divider orientation="vertical" />
      <Input
        aria-label="Guest"
        labelPlacement="inside"
        placeholder="Guest"
        classNames={{
          inputWrapper: ["bg-transparent", "shadow-none", "hover:bg-transparent", "group-data-[focus=true]:bg-transparent"],
        }}
      />
      <Button radius="full" startContent={<CiSearch />} className="text-white bg-[#FCC01C]">Search</Button>
    </div>
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="drop-shadow-[0px_4px_30px_rgba(0,0,0,0.05)] py-2">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="flex basis-3/5 sm:basis-full">
        <NavbarItem>
          {searchInput}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="flex basis-1/5 sm:basis-full gap-6"
        justify="end"
      >
        <NavbarItem className="flex items-center gap-3">
          <FiShoppingCart />
          <Link className="text-sm text-[#222222]">Login</Link>
        </NavbarItem>
        <NavbarItem className="flex items-center gap-3">
          <Button
            radius="full"
            size="sm"
            startContent={<FiUser className="text-[#FCC01C] text-2xl bg-[#F9F5FF] p-1 rounded-full" />}
            endContent={<IoMenu className="text-xl" />}
            variant="bordered"
            className="border-1"
          />
          <Image
            src="/usflag.png"
            alt="flag"
            width={22}
            height={22}
            className="rounded-full"
          />
        </NavbarItem>
      </NavbarContent>
    </HeroUINavbar>
  );
};
