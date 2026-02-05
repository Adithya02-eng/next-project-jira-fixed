"use client"

import { PageError } from "@/components/page-error"
import { PageLoader } from "@/components/page-loader"
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace"
import { useGetWorkspaceInfo } from "@/features/workspaces/api/use-get-workspace-info"
import { JoinWorkspaceForm } from "@/features/workspaces/components/join-workspace-form"
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id"

export const WorkspaceIdJoinClient = ()=>{

    const workspaceId = useWorkspaceId()
        const{data:intialValues,isLoading} = useGetWorkspaceInfo({
            workspaceId
        })
    
        if(isLoading)
        {
            return <PageLoader/>
        }

        if(!intialValues)
            {
                return <PageError message="Project not Found"/>
            }
    
    return (
        <div className="w-full lg:max-w-xl">
            <JoinWorkspaceForm intialValues={intialValues}/>

        </div>
    )
}