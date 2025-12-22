import { StatusOfPosition } from "../constants/StatusOfPosition";
import { PlantPositionWithId } from "./plant-position";
import { PlantHistory } from './plant-history.d';

export interface PlantHistory {
    
    plantOfPosition: PlantPositionWithId;
    plantStatus: (typeof StatusOfPosition)[number];
    dateFrom: string | undefined;
    dateTo?: string | undefined;
}

export interface PlantHistoryWithId extends PlantHistory {
    id: number;
}