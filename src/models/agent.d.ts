import { Info } from "./info-page";

export enum DocumentType { DNI, PASAPORTE, CE, CI, LE }

export interface Agent {
    firstname: string | undefined;
    lastname: string | undefined;
    documenttype?: (typeof DocumentType)[number];
    document: string | undefined;
    birthdate: string | undefined;
    leavingdate?: string;
    deceased?: boolean;
    file: string;
    address?: string;
    phone?: string;
    email?: string;     
}

export interface AgentWithId extends Agent {
    id: number;
}

export interface AgentAPI {
    page: Info;
    content: AgentWithId[];
}

