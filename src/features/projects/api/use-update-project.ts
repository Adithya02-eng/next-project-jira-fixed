import {useMutation} from "@tanstack/react-query"
import { InferRequestType,InferResponseType } from "hono"
import { client } from "@/lib/rpc"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
type ResponseType = InferResponseType<typeof client.api.projects[":projectId"]["$patch"],200>
type RequestType = InferRequestType<typeof client.api.projects[":projectId"]["$patch"]>

export const useUpdateProject = ()=>{
    const queryClient = useQueryClient()
    const mutation = useMutation<
    ResponseType,
    Error,
    any
    >({
        mutationFn:async(payload)=>{
            const response = await client.api.projects[":projectId"]["$patch"](payload as any);
            if(!response.ok)
            {
                throw new Error("Failed to Update project");
            }
            return await response.json();
        },
        onSuccess:({data})=>{
            toast.success("Project Updated")
            queryClient.invalidateQueries({queryKey:["projects"]})
            queryClient.invalidateQueries({queryKey:["project",data.$id]})
        },
        onError:()=>{
            toast.error("Failed to Update Project");
        }
    });
    return mutation;
}