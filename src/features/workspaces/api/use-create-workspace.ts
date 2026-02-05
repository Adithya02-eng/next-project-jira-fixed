import {useMutation} from "@tanstack/react-query"
import { InferRequestType,InferResponseType } from "hono"
import { client } from "@/lib/rpc"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
type ResponseType = InferResponseType<typeof client.api.workspaces["$post"]>
type RequestType = InferRequestType<typeof client.api.workspaces["$post"]>

export const useCreateWorkspace = ()=>{
    const queryClient = useQueryClient()
    const mutation = useMutation<
    ResponseType,
    Error,
    any
    >({
        mutationFn:async(payload)=>{
            const response = await client.api.workspaces["$post"](payload as any);
            if(!response.ok)
            {
                throw new Error("Failed to create Workspace");
            }
            return await response.json();
        },
        onSuccess:()=>{
            toast.success("Workspace created")
            queryClient.invalidateQueries({queryKey:["workspaces"]})
        },
        onError:()=>{
            toast.error("Failed to create Workspace");
        }
    });
    return mutation;
}