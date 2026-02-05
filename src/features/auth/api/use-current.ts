import { useQuery } from "@tanstack/react-query"
import {client} from "@/lib/rpc"

export const useCurrent = ()=>{
    const query = useQuery({
        queryKey:["current"],
        queryFn:async()=>{
            const response = await client.api.auth.current.$get();
            if(!response.ok)
            {
                return null;
            }

            const json = await response.json();
            return json?.data ?? null;
        },
    });
    return query;
}