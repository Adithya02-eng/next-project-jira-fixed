import { useQuery } from "@tanstack/react-query"
import {client} from "@/lib/rpc"
import { InferResponseType } from "hono"

interface UseWorkspaceAnalyticsProps{
    workspaceId:string
}

export type WorkspaceAnalyticsResponseType = InferResponseType<typeof client.api.workspaces[":workspaceId"]["analytics"]["$get"],200>

export const useGetWorkspaceAnalytics = ({
    workspaceId,
}:UseWorkspaceAnalyticsProps)=>{
    const query = useQuery({
        queryKey:["workspace-analytics",workspaceId],
        queryFn:async()=>{
            const response = await client.api.workspaces[":workspaceId"]["analytics"].$get({
                param:{workspaceId},
            });
            if(!response.ok)
            {
                throw new Error("Failed to Load Workspace Analytics");
            }

            const json = await response.json();
            return json?.data ?? null;
        },
    });
    return query;
}