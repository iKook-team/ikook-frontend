"use client";

import { Input, Button } from "@heroui/react";

export const Newsletter = () => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4">
            <h2 className="w-full md:w-4/12 font-medium text-2xl md:text-3xl text-center md:text-left">Join our Newsletter</h2>
            <div className="w-full flex flex-col sm:flex-row gap-4 items-center">
                <Input radius="full" placeholder="Enter your name" className="w-full sm:w-3/12" />
                <Input radius="full" placeholder="Enter your email to join our newsletter" className="w-full sm:w-6/12" />
                <Button radius="full" className="w-full sm:w-3/12 text-white bg-black">Subscribe</Button>
            </div>
        </div>
    );
};