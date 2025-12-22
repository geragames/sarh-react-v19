export interface Point {
    positionCode: number;
    namePosition: string;
    dedication: string;
    amountPoint: number;
    date: string
}

export interface PointWithId extends Point {
    id: number;
 }

 export interface PercentagePoint {
    percentage: number;
 }

 export interface AmountPoint {
    amountPositionNew: number;
 }