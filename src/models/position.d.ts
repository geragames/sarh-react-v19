import { PointWithId } from "./point";
import { OrganizationalUnitWithId } from './organizationalUnit.d';
import { TransformationWithId } from "./transformation";
import { StatusOfPosition } from '../constants/StatusOfPosition';

export interface Position {
    
    pointID: PointWithId;
    organizationalUnitID: OrganizationalUnitWithId;
    positionStatus: StatusOfPosition;
    newPosition: PositionWithId;
    originPosition:  PositionWithId[];
    pointsAvailable: number;
    creationResolutionID: TransformationWithId;
    resolutionSuppressionID: TransformationWithId ;
}

export interface PositionWithId extends Position {
    id: number;
}

export interface  PositionDto {
    id: number;
    namePosition: string;
    nameUnit?: string;
    pointsAvailable: number;
    amountPoint: number;
    positionStatus: StatusOfPosition;
    resolutionNumber: string;
    discountedQuantity: number;
}

export interface PositionRequest {
    pointId: number;
    organizationalId: number;
    originPositionIds?: number[];
    positionStatus?: (typeof StatusOfPosition)[number];
    resolutionTransformationId: number;
}

export interface PositionRequestWithId extends PositionRequest {
    id?: number;
}

