import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@/features/auth/components/user-button";
import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
interface StandloneLayoutProps{
    children:React.ReactNode;
}

const StandloneLayout = async ({children}:StandloneLayoutProps)=>{
    const user = await getCurrent();
    if(!user)
    {
        redirect("/sign-in");
    }
    
    return (
        <main className="bg-neutral-100 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center h-[73px">
                    <Link href="/">
                    <Image src={"/bolt.png"} alt="Logo" height={56} width={56}/>
                    </Link>
                    <UserButton/>
                </nav>
                <div className="flex flex-col items-center justify-center py-4">
                {children}
                </div>
            </div>
        </main>
    )
}

export default StandloneLayout;