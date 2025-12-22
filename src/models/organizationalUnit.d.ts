import { AgentWithId } from "./agent";

export interface OrganizationalUnit {
    nameUnit: string;
    director: AgentWithId;
    viceDirector?: AgentWithId;
}

export interface OrganizationalUnitWithId extends OrganizationalUnit {
    id: number;
}

export interface OrganizationalUnitDto {
    id: number;
    nameUnit: string;
    firstname: string;
    lastname: string;
    lastnamevice?: string;
    firstnamevice?: string;
}
