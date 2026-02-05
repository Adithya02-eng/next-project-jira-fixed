import { useQuery } from "@tanstack/react-query"
import {client} from "@/lib/rpc"

interface UseGetWorkspaceProps{
    workspaceId:string
}

export const useGetWorkspace = ({
    workspaceId
}:UseGetWorkspaceProps)=>{
    const query = useQuery({
        queryKey:["workspace",workspaceId],
        queryFn:async()=>{
            const response = await client.api.workspaces[":workspaceId"].$get({
                param:{workspaceId},
            });
            if(!response.ok)
            {
                throw new Error("Failed to Load Workspace");
            }

            const json = await response.json();
            return json?.data ?? null;
        },
    });
    return query;
}