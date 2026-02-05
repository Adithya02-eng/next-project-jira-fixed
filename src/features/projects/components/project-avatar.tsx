import Image from "next/image"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
interface ProjectAvatarProps{
    image?: string;
    name: string;
    className?:string;
    fallbackClassname?:string;
};

export const ProjectAvatar = ({
    image,
    name,
    className,
    fallbackClassname,
}: ProjectAvatarProps)=>{
    if(image)
    {
        return(
            <div className={cn(
                "size-5 relative rounded-md overflow-hidden",
                className,
            )}>
                <Image src={image} alt={name} fill className="object-cover"/>
            </div>
        )
    }

    return (
        <Avatar className={cn("size-5 rounded-md ",className)}>
            <AvatarFallback className={cn(
                "block h-full w-full flex items-center justify-center text-white bg-blue-600 font-semibold text-sm uppercase rounded-md",
                fallbackClassname,
            )}>
                {name?.[0]??"?"}
            </AvatarFallback>
        </Avatar>
    )
}