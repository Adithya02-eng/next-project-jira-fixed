"use client"

import { useGetProject } from "@/features/projects/api/use-get-project"
import { useProjectId } from "@/features/projects/hooks/use-project-id"
import { EditProjectForm } from "@/features/projects/components/edit-project-form"
import { PageLoader } from "@/components/page-loader"
import { PageError } from "@/components/page-error"

export const ProjectIdSettingClient = ()=>{
    const projectId = useProjectId()
    const{data:intialValues,isLoading} = useGetProject({projectId})

    if(isLoading)
    {
        return <PageLoader/>
    }

    if(!intialValues)
    {
        return <PageError message={"Project Not Found"}/>
    }
    return(
        <div className="w-full lg:max-w-xl">
            <EditProjectForm intialValues={intialValues}/>
        </div>
    )
}