import { FaSearch } from "react-icons/fa";
import axiosWithAuth from "../../api/api.axios";
import { AgentWithId } from "../../models/agent";
import Autocomplete from "../Autocomplete";

type Props = {

     onSelect: (agent: AgentWithId) => void;
}

export default function AgentAutocomplete({ onSelect }: Props) {
     async function fetchAgents(query: string, signal?: AbortSignal): Promise<AgentWithId[]> {
          if (!query || query.trim().length === 0) return [];

          const res = await axiosWithAuth.get(`agent/search/${encodeURIComponent(query)}`, { signal })
          return res.data;
     }

     /*    className='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5'
       */
     return (
          <div className="relative w-full">
               <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none"/>
               <Autocomplete<AgentWithId>
                    // 👇 mismas clases que tu Input
                   inputClassName="w-full border rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                   listClassName="rounded-lg shadow border border-gray-200 text-sm"
                    placeholder="Buscar agente"
                    fetchItems={fetchAgents}
                    onSelect={onSelect}
                    renderItem={(a) => (
                         <div className="px-2 py-1">
                              <div className="font-medium text-gray-900">
                                   {a.lastname} {a.firstname}
                              </div>
                              <div className="text-xs text-gray-500">ID: {a.id}</div>
                         </div>
                    )}
                    itemToString={(a) => (a ? `${a.lastname} ${a.firstname}` : "")}
                    debounceMs={300}
                    minChars={2}
               />
          </div>
     )
}