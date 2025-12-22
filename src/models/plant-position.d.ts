import { CharacterPlant } from "../constants/CharacterPlant";
import { PlantStatus } from "../constants/PlantStatus";
//import { PlantStatus } from "../constants/PlantStatus";
import { AgentWithId } from "./agent";
import { OrganizationalSubUnitWithId } from "./organizationalSubUnit";
import { PositionWithId } from "./position";

export interface PlantPosition {
  position: PositionWithId;
  agent: AgentWithId;
  organizationalSubUnit:OrganizationalSubUnitWithId;
  characterplantID: (typeof CharacterPlant)[number];
  currentStatusID: (typeof PlantStatus)[number];
}

export interface PlantPositionWithId extends PlantPosition {
  id: number;
}

export interface PlantPositionRequest {
  id: number;
  positionId: number;
  agentId: number;
  organizationalSubUnit: number;
  characterplantID: string | undefined;
  currentStatusID: string | undefined;
  dateFrom: string;
  dateTo: string;
  reasonForMovement: string;
}

export interface PlantOfPositionDto {
  id: number;
  currentStatusID: string;
  characterplantID: string;
  nameSubUnit: string;
  firstname: string;
  lastname: string;
  document: string;
  namePosition: string;
}


