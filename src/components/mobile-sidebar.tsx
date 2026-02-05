"use client"
import {Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Button } from "./ui/button"
import { MenuIcon} from "lucide-react"
import { Sidebar } from "./sidebar"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
export const MobileSiderbar = ()=>{
    const [isOpen,setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(()=>{
        setIsOpen(false);
    },[pathname]);
    return (
        <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant={"secondary"} className="lg:hidden">
                    <MenuIcon className="size-4 text-neutral-500"/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-8">
                <Sidebar/>
            </SheetContent>
        </Sheet>
    )
}