import Link from "next/link"
import { DottedSeparator } from "./dotted-separator"
import Image from "next/image"
import { Navigation } from "./navigation"
import { WorkspaceSwitcher } from "./workspace-switcher"
import { Projects } from "./projects"
export const Sidebar = ()=>{
    return(
        <aside className="h-full bg-neutral-100 p-4 w-full">
            <Link href="/">
            <Image src="/bolt.png" alt="logo" width="50" height={50}/>
            </Link>
            <DottedSeparator className="my-4"/>
            <WorkspaceSwitcher/>
            <Navigation/>
            <DottedSeparator className="my-4"/>
            <Projects/>
        </aside>
    )
}