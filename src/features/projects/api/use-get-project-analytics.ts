import { useQuery } from "@tanstack/react-query"
import {client} from "@/lib/rpc"
import { InferResponseType } from "hono"

interface UseGetProjectAnalyticsProps{
    projectId:string
}

export type ProjectAnalyticsResponseType = InferResponseType<typeof client.api.projects[":projectId"]["analytics"]["$get"],200>

export const useGetProjectAnalytics = ({
    projectId
}:UseGetProjectAnalyticsProps)=>{
    const query = useQuery({
        queryKey:["projects-analytics",projectId],
        queryFn:async()=>{
            const response = await client.api.projects[":projectId"]["analytics"].$get({
                param:{projectId},
            });
            if(!response.ok)
            {
                throw new Error("Failed to Load Project Analytics");
            }

            const json = await response.json();
            return json?.data ?? null;
        },
    });
    return query;
}