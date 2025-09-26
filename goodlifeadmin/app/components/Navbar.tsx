"use client";

import React, { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link"; // We'll use Coin icon
import { usePathname } from "next/navigation";

function Navbar() {
    const { user } = useUser();
    const meta = user?.publicMetadata as { department?: string };
    const department = meta?.department;

    return (
        <nav className="flex justify-center">
            <div className="flex items-center justify-between w-full mt-5">
                <div className="text-4xl font-bold ml-10">Hey there, {department !== "super" ? `${department} department` : "Super admin"}</div>
                <div className="flex justify-between gap-2 mr-10 border rounded-full p-2"><UserButton/>{user?.firstName}</div>
            </div>
        </nav>
    );
}

export default Navbar;