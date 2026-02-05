import {useMutation} from "@tanstack/react-query"
import { InferRequestType,InferResponseType } from "hono"
import { client } from "@/lib/rpc"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
type ResponseType = InferResponseType<typeof client.api.tasks[":taskId"]["$patch"],200>
type RequestType = InferRequestType<typeof client.api.tasks[":taskId"]["$patch"]>

export const useUpdateTask = ()=>{
    const router = useRouter()
    const queryClient = useQueryClient()
    const mutation = useMutation<
    ResponseType,
    Error,
    any
    >({
        mutationFn:async(payload)=>{
            const response = await client.api.tasks[":taskId"]["$patch"](payload as any);
            if(!response.ok)
            {
                throw new Error("Failed to Update task");
            }
            return await response.json();
        },
        onSuccess:({data})=>{
            //router.refresh();
            toast.success("Task Updated")
            queryClient.invalidateQueries({queryKey:["tasks"]})
            queryClient.invalidateQueries({queryKey:["tasks",data.$id]})
        },
        onError:()=>{
            toast.error("Failed to Update Task");
        }
    });
    return mutation;
}