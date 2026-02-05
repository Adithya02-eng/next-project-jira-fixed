import 
{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteTask } from "../api/use-delete-task";


import { ExternalLinkIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { useEditTaskModal } from "../hooks/use-edit-task-modal";

interface TaskActionsProps{
    id: string,
    projectId:string;
    children:React.ReactNode
}

export const TaskActions = ({id,projectId,children}:TaskActionsProps)=>{
    const router = useRouter()
    const workspaceId = useWorkspaceId();
    const [ConfirmDialog,confirm] = useConfirm(
        "Delete Task",
        "This action cannot be undone",
        "destructive"
    );
    const {open} = useEditTaskModal();
    const {mutate,isPending} = useDeleteTask();

    
    const onDelete = async ()=>{
        const ok = await confirm();
        if(!ok) return;
        mutate({param:{taskId:id}});
    }

    const onOpenTask = ()=>{
        router.push(`/workspaces/${workspaceId}/tasks/${id}`)
    }

    const onOpenProject = ()=>{
        router.push(`/workspaces/${workspaceId}/projects/${projectId}`);
    }
    return (
        <div>
            <ConfirmDialog/>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                    onClick={onOpenTask}
                    disabled={false}
                    className="font-medium p-[10px]">
                        <ExternalLinkIcon className="size-4 mr-2 stroke-4"/>
                        Task Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    onClick={onOpenProject}
                    disabled={false}
                    className=" font-medium p-[10px]">
                        <ExternalLinkIcon className="size-4 mr-2 stroke-4"/>
                        Open Project
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    onClick={()=>open(id)}
                    disabled={false}
                    className="font-medium p-[10px]">
                        <PencilIcon className="size-4 mr-2 stroke-4"/>
                        Edit Task
                    </DropdownMenuItem>
                    
                    <DropdownMenuItem
                    onClick={onDelete}
                    disabled={isPending}
                    className="text-amber-700 focus:text-amber-700 font-medium p-[10px]">
                        <TrashIcon className="size-4 mr-2 stroke-4"/>
                        Delete Task
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}