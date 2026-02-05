import {useMutation} from "@tanstack/react-query"
import { InferRequestType,InferResponseType } from "hono"
import { client } from "@/lib/rpc"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
type ResponseType = InferResponseType<typeof client.api.tasks["$post"],200>
type RequestType = InferRequestType<typeof client.api.tasks["$post"]>

export const useCreateTask = ()=>{
    const queryClient = useQueryClient()
    const mutation = useMutation<
    ResponseType,
    Error,
    any
    >({
        mutationFn:async(payload)=>{
            const response = await client.api.tasks["$post"](payload as any);
            if(!response.ok)
            {
                throw new Error("Failed to create task");
            }
            return await response.json();
        },
        onSuccess:()=>{
            toast.success("Task created")
            queryClient.invalidateQueries({queryKey:["tasks"]})
        },
        onError:()=>{
            toast.error("Failed to create Task");
        }
    });
    return mutation;
}