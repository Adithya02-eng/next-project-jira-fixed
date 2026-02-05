import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { resourceUsage } from "process";
import { Card, CardContent } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { CreateTaskForm } from "./create-task-form";
interface CreateTaskFormWrapperProps{
    onCancel:()=> void;
}

export const CreateTaskFormWrapper = ({
    onCancel
}:CreateTaskFormWrapperProps)=>{
    const workspaceId = useWorkspaceId();

    const {data:projects,isLoading:isLoadingProject} = useGetProjects({workspaceId});
    const {data:members,isLoading:isLoadingMembers} = useGetMembers({workspaceId})

    const memberOptions = members?.documents.map((member)=>({
        id:member.$id,
        name:member.name
    }))

    const projectOptions = projects?.documents.map((project)=>({
        id:project.$id,
        name:project.name
    }))
    
        // include imageUrl for project avatar usage
        const projectOptionsWithImage = projectOptions?.map((p, i)=>({
            ...p,
            imageUrl: projects?.documents[i]?.imageUrl ?? ""
        }))

    const isLoading = isLoadingMembers || isLoadingProject;

    if(isLoading)
    {
        return (
            <Card className="w-full h-[714px] border-none shadow-none">
            <CardContent className="flex items-center justify-center h-full">
                <Loader className="size-5 animate-spin text-muted-foreground"/>
            </CardContent>
        </Card>
        )
    }

    return (
        <div>
                <CreateTaskForm onCancel={onCancel} projectOptions={projectOptionsWithImage ?? []} memberOptions={memberOptions ?? []}/>
        </div>
    )
}