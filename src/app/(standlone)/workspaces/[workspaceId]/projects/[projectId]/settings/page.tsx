import { getCurrent } from "@/features/auth/queries";
import { EditProjectForm } from "@/features/projects/components/edit-project-form";
import { TaskViewSwitcher } from "@/features/tasks/components/task-switcher";
import { redirect } from "next/navigation";


const ProjectIdSettingsPage =  async ()=>{
    const user = await getCurrent();
    if(!user) redirect('/sign-in');
    
    
    return (  
        <ProjectIdSettingsPage/>
    )
}

export default ProjectIdSettingsPage;