"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
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
    <div className="w-full border-1 rounded-full flex flex-col md:flex-row justify-between items-center p-1 md:py-1 md:px-2 gap-2 shadow">
      <Input
        aria-label="location"
        labelPlacement="inside"
        placeholder="Location"
        className="w-full md:w-auto"
        classNames={{
          inputWrapper: ["bg-transparent", "shadow-none", "hover:bg-transparent", "group-data-[focus=true]:bg-transparent"],
        }}
      />
      <Divider orientation="vertical" className="hidden md:block" />
      <Input
        aria-label="date"
        labelPlacement="inside"
        placeholder="Event Date"
        type="text"
        className="w-full md:w-auto"
        classNames={{
          inputWrapper: ["bg-transparent", "shadow-none", "hover:bg-transparent", "group-data-[focus=true]:bg-transparent"],
        }}
      />
      <Divider orientation="vertical" className="hidden md:block" />
      <Input
        aria-label="Guest"
        labelPlacement="inside"
        placeholder="Guest"
        className="w-full md:w-auto"
        classNames={{
          inputWrapper: ["bg-transparent", "shadow-none", "hover:bg-transparent", "group-data-[focus=true]:bg-transparent"],
        }}
      />
      <Button radius="full" startContent={<CiSearch />} className="w-full md:w-auto text-white bg-yellow-400">Search</Button>
    </div>
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky" className="drop-shadow-sm py-2">
      <NavbarContent className="basis-1/2 md:basis-1/5" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Mobile Cart and Toggle - Right Aligned */}
      <NavbarContent className="flex md:hidden basis-1/2" justify="end">
        <NavbarItem className="flex items-center gap-2">
          <Button
            isIconOnly
            radius="full"
            size="sm"
            variant="light"
            className="text-xl"
          >
            <FiShoppingCart />
          </Button>

          <NavbarMenuToggle className="ml-2" />
        </NavbarItem>
      </NavbarContent>

      {/* Desktop Search Bar */}
      <NavbarContent className="hidden md:flex basis-3/5">
        <NavbarItem className="w-full">
          {searchInput}
        </NavbarItem>
      </NavbarContent>

      {/* Desktop Login/User Buttons */}
      <NavbarContent
        className="hidden md:flex basis-1/5 gap-4"
        justify="end"
      >
        <NavbarItem className="flex items-center gap-3">
          <FiShoppingCart />
          <Link className="text-sm text-gray-800">Login</Link>
        </NavbarItem>
        <NavbarItem className="flex items-center gap-2">
          <Button
            radius="full"
            size="sm"
            startContent={<FiUser className="text-yellow-400 bg-purple-50 p-1 rounded-full" />}
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

      {/* Mobile Menu */}
      <NavbarMenu>
        <div className="p-4">
          {searchInput}
        </div>
        <NavbarMenuItem>
          <Link className="w-full text-gray-800 py-2 flex items-center gap-2">
            <FiShoppingCart />
            Login
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem className="flex items-center gap-2 py-2">
          <Image
            src="/usflag.png"
            alt="flag"
            width={22}
            height={22}
            className="rounded-full"
          />
        </NavbarMenuItem>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
