import { Button } from "@/components/ui/button";
import { getCurrent } from "@/features/auth/queries"
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { PencilIcon } from "lucide-react";
import { redirect } from "next/navigation";
import Link from "next/link"
import { TaskViewSwitcher } from "@/features/tasks/components/task-switcher";
import ProjectIdClient from "./client";
interface ProjectIdPageProps {
  params: Promise<{ projectId: string }>
}
const ProjectIdPage = async ({
    params,
}:ProjectIdPageProps)=>{
     const { projectId } = await params;
    const user = await getCurrent();
    
    if(!user)
    {
        redirect("/sign-in");
    }

    return <ProjectIdClient/>
}

export default ProjectIdPage;