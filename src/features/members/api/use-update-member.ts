import {useMutation} from "@tanstack/react-query"
import { InferRequestType,InferResponseType } from "hono"
import { client } from "@/lib/rpc"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
type ResponseType = InferResponseType<typeof client.api.members[":memberId"]["$patch"],200>
type RequestType = InferRequestType<typeof client.api.members[":memberId"]["$patch"]>

export const useUpdateMember = ()=>{
    const queryClient = useQueryClient()
    const mutation = useMutation<
    ResponseType,
    Error,
    any
    >({
        mutationFn:async(payload)=>{
            const response = await client.api.members[":memberId"]["$patch"](payload as any);
            if(!response.ok)
            {
                throw new Error("Failed to Update Member");
            }
            return await response.json();
        },
        onSuccess:()=>{
            toast.success("Member Updated")
            queryClient.invalidateQueries({queryKey:["members"]})
        },
        onError:()=>{
            toast.error("Failed to Update Member");
        }
    });
    return mutation;
}