import Image from "next/image"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
interface MemberAvatarProps{
    name: string;
    className?:string;
    fallbackClassName?:string;
};

export const MemberAvatar = ({
    name,
    className,
    fallbackClassName
}: MemberAvatarProps)=>{
    return (
        <Avatar className={cn("size-5 transition border-neutral-300 rounded-full",className)}>
            <AvatarFallback 
            className={cn(
                "bg-neutral-200 font-medium text-neutral-500 block w-full h-full flex items-center justify-center rounded-md"
                ,fallbackClassName
            )}>
                {name.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}