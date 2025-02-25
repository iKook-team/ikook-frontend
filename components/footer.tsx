"use client";

import { Image, Button } from "@heroui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { FaCcMastercard } from "react-icons/fa";


import { Newsletter } from "@/components/newsletter";

export const Footer = () => {
    return (
        <footer className="bg-[#FCC01C]">
            <div className="container mx-auto max-w-7xl pt-16 px-2 md:px-4">
                <Newsletter />
                <div className="flex flex-col lg:flex-row py-8 px-4">
                    {/* Logo and social icons section */}
                    <div className="w-full lg:w-1/5 mb-8 lg:mb-0 flex flex-col items-center lg:items-start">
                        <Image src="/footer-logo.png" alt="logo" width={79} height={100} />
                        <div className="flex gap-4 pt-8 lg:pt-16 text-2xl">
                            <FaFacebookSquare />
                            <FaTwitterSquare />
                            <FaInstagramSquare />
                            <FaLinkedin />
                        </div>
                    </div>

                    {/* Footer links section */}
                    <div className="w-full lg:w-4/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 pt-4 lg:pt-8">
                        {/* iKook column */}
                        <div>
                            <h3 className="font-medium text-xl mb-4">iKook</h3>
                            <ul className="flex flex-col gap-4 font-medium text-sm text-gray-600">
                                <li>About us</li>
                                <li>How it works</li>
                                <li>FAQs</li>
                                <li>Privacy Policy</li>
                                <li>Terms and Conditions</li>
                            </ul>
                        </div>

                        {/* Services column */}
                        <div>
                            <h3 className="font-medium text-xl mb-4">Services</h3>
                            <ul className="flex flex-col gap-4 font-medium text-sm text-gray-600">
                                <li>Chef at Home</li>
                                <li>Large Event</li>
                                <li>Meal Prep</li>
                                <li>Fine Dining</li>
                                <li>More +</li>
                            </ul>
                        </div>

                        {/* Experience column */}
                        <div>
                            <h3 className="font-medium text-xl mb-4">Experience</h3>
                            <ul className="flex flex-col gap-4 font-medium text-sm text-gray-600">
                                <li>Signup as Chef</li>
                                <li>Gift Experience</li>
                                <li>Split Bills</li>
                                <li>Career</li>
                                <li>Blog</li>
                            </ul>
                        </div>

                        {/* iKook Chef in column */}
                        <div>
                            <h3 className="font-medium text-xl mb-4">iKook Chef in</h3>
                            <ul className="flex flex-col gap-4 font-medium text-sm text-gray-600">
                                <li>United Kingdom</li>
                                <li>Nigeria</li>
                                <li>Canada</li>
                                <li>South Africa</li>
                                <li><Button size="sm" endContent={<FaArrowRightLong />} radius="full" variant="bordered" className="border-1 border-gray-800">See other countries</Button></li>
                            </ul>
                        </div>

                        {/* Contact us column */}
                        <div>
                            <h3 className="font-medium text-xl mb-4">Contact us</h3>
                            <ul className="flex flex-col gap-4 font-medium text-sm text-gray-600">
                                <li>0203 807 8500</li>
                                <li>team@ikook.co.uk</li>
                                <li>Support</li>
                                <li></li>
                                <li>
                                    <div className="flex gap-4 text-2xl">
                                        <FaCcPaypal />
                                        <FaCcVisa />
                                        <FaCcMastercard />
                                    </div>
                                    <span className="text-xs">Your payment is secured</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground pb-4">
                    Copyright &copy; {new Date().getFullYear()} iKooK, All Right Reserved
                </p>
            </div>
        </footer>
    );
};