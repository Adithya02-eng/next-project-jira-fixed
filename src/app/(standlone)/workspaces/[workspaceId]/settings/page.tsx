import { redirect } from "next/navigation";
import { getCurrent } from "@/features/auth/queries";
import { EditWorkspaceForm } from "@/features/workspaces/components/edit-workspace-form";
//import { getWorkspace } from "@/features/workspaces/queries";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";

interface WorkspaceIdSettingsPageProps{
    params:Promise<{
        workspaceId:string;
    }>;
}

const WorkspaceIdSettingsPage = async ()=>{
    const user = await getCurrent();
    if(!user) redirect("/sign-in");
        
    return <WorkspaceIdSettingsPage/>
}

export default WorkspaceIdSettingsPage;