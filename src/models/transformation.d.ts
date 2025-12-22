export interface Transformation {

    resolutionNumber?: string;
    date?: string;
    reason?: string;
}

export interface TransformationWithId extends Transformation {
    id: number;
}