"use client";

import { PageError } from "@/components/page-error";
import { PageLoader } from "@/components/page-loader";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

export const workspaceIdSettingsClient = ()=>{

    const workspaceId = useWorkspaceId()
        const{data:intialValues,isLoading} = useGetWorkspace({workspaceId})
    
    if(isLoading)
    {
        return <PageLoader/>
    }
    
    if(!intialValues)
    {
        return <PageError message={"Project Not Found"}/>
    }

    return (
        <div className="w-full lg:max-w-xl">
            <EditWorkspaceForm intialValues={intialValues}/>
        </div>
    )
}