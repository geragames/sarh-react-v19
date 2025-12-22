import { FaSearch } from "react-icons/fa";
import axiosWithAuth from "../../api/api.axios";
import { UserWithId } from "../../models/user"
import Autocomplete from "../Autocomplete";

type Props = {
    onSelect: (user: UserWithId) => void
}

export default function UserAutocomplete({ onSelect }: Props) {
    async function fetchUsers(query: string, signal?: AbortSignal): Promise<UserWithId[]> {

        if (!query || query.trim().length == 0) return [];

        const res = await axiosWithAuth.get(`user/search/${encodeURIComponent(query)}`, { signal });
        console.log("USUARIOS ", res.data);
        return res.data;
    }
    return (
        <div className="relative w-full">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            <Autocomplete<UserWithId>
                // 👇 mismas clases que tu Input
                inputClassName="w-full border rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                listClassName="rounded-lg shadow border border-gray-200 text-sm"
                placeholder="Buscar agente"
                fetchItems={fetchUsers}
                onSelect={onSelect}
                renderItem={(a) => (
                    <div className="px-2 py-1">
                        <div className="font-medium text-gray-900">
                            {a.username} 
                        </div>
                        <div className="text-xs text-gray-500">ID: {a.id}</div>
                    </div>
                )}
                itemToString={(a) => (a ? `${a.username}` : "")}
                debounceMs={300}
                minChars={2}
            />
        </div>
    )

}
