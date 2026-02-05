import {useMutation} from "@tanstack/react-query"
import { InferRequestType,InferResponseType } from "hono"
import { client } from "@/lib/rpc"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
type ResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"],200>
type RequestType = InferRequestType<typeof client.api.workspaces[":workspaceId"]["reset-invite-code"]["$post"]>

export const useResetInviteLink = ()=>{
    const queryClient = useQueryClient()
    const router = useRouter();
    const mutation = useMutation<
    ResponseType,
    Error,
    any
    >({
        mutationFn:async(payload)=>{
            const response = await client.api.workspaces[":workspaceId"]["/reset-invite-code"]["$post"](payload as any);
            if(!response.ok)
            {
                throw new Error("Failed to Reset Invite Code");
            }
            return await response.json();
        },
        onSuccess:({data})=>{
            //router.refresh()
            toast.success("Invite Code Reset")
            queryClient.invalidateQueries({queryKey:["workspaces",data.$id]})
        },
        onError:()=>{
            toast.error("Failed to Reset Invite Code");
        }
    });
    return mutation;
}