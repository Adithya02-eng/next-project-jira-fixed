import {useMutation} from "@tanstack/react-query"
import { InferRequestType,InferResponseType } from "hono"
import { client } from "@/lib/rpc"
import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>
type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>

export const useLogin = ()=>{
    const queryClient = useQueryClient()
    const router = useRouter();
    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
        mutationFn:async(payload)=>{
            const response = await client.api.auth.login["$post"]({json: payload as any});
            if(!response.ok)
            {
                throw new Error("Something Weried Happended");
            }
            return await response.json();
        },
        onSuccess:()=>{
            toast.success("Logged-In")
            router.refresh();
            queryClient.invalidateQueries({queryKey:["current"]})
            
        },
        onError:()=>{
            toast.error("Failed to Log-in")
        },
    });

    return mutation;
}