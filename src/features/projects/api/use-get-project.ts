import { useQuery } from "@tanstack/react-query"
import {client} from "@/lib/rpc"

interface UseGetProjectProps{
    projectId:string
}

export const useGetProject = ({
    projectId
}:UseGetProjectProps)=>{
    const query = useQuery({
        queryKey:["projects",projectId],
        queryFn:async()=>{
            const response = await client.api.projects[":projectId"].$get({
                param:{projectId},
            });
            if(!response.ok)
            {
                throw new Error("Failed to Load Project");
            }

            const json = await response.json();
            return json?.data ?? null;
        },
    });
    return query;
}