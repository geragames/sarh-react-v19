import { useInfiniteQuery } from "@tanstack/react-query";
import { AgentAPI, AgentWithId } from "../../models/agent";
import axiosWithAuth from "../../api/api.axios";
import { useMemo } from "react";
import { Info } from "../../models/info-page";

// Tipamos explícitamente el shape del argumento que react-query pasa al queryFn
type FetchAgentsArg = { pageParam?: number };

// fetchAgents recibe { pageParam } tipado y devuelve Promise<AgentAPI>
const fetchAgents = async ({ pageParam = 0 }: FetchAgentsArg): Promise<AgentAPI> => {
  const response = await axiosWithAuth.get<AgentAPI>(`/agent/all?page=${pageParam}`);
  return response.data;
};

 type AgentList = { info: Info, results: AgentWithId[]};

// Genéricos: <TQueryFnData, TError, TData, TQueryKey, TPageParam>
export const useAgentInfinite = () => {
   const { data, error, fetchNextPage, status, hasNextPage, isLoading
   }  =useInfiniteQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
    initialPageParam: 0,
    getNextPageParam: (lastPage)=> {
   
      const nextPage = lastPage.page.number + 1;
      return nextPage < lastPage.page.totalPages?  nextPage: undefined
    },
  }) 

   const agents = useMemo( () => { 
        const initial: AgentList = {
            info: { size: 0, number: 0, totalElements: 0, totalPages : 0},
            results: [],
        }

        if(!data?.pages) return initial;
    
        return data?.pages.reduce<AgentList> ((acc, page) => {
            acc.results.push(...page.content);
            acc.info = page.page;
            return acc;
        }, initial)  

    }, [data]);

    return { error, fetchNextPage, status, hasNextPage,
          agents, data, isLoading
    }

};
