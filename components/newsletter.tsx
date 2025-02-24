"use client";

import { Input, Button } from "@heroui/react";

export const Newsletter = () => {
    return (
        <div className="flex justify-between items-center gap-1">
            <h2 className="w-4/12 font-medium text-3xl">Join our Newsletter</h2>
            <Input radius="full" placeholder="Enter your name" className="w-2/12" />
            <Input radius="full" placeholder="Enter your email to join our newsletter" className="w-4/12" />
            <Button radius="full" className="w-1/12 text-white bg-[#060605]">Subscribe</Button>
        </div>
    );
};