import { createSlice} from "@reduxjs/toolkit";
import { PlantOfPositionDto, PlantPositionWithId } from "../../models/plant-position";
import { fetchPlantPositions, fetchPlantsOfPositionById } from "./plantPositionThunk";

//import { addPlantPosition, fetchPlantPositions,
//         fetchPlantsOfPositionById, updatePlantPosition } from "./plantPositionThunk";

export interface PlantPositionState {
    plantDTOs: PlantOfPositionDto[];
    plants: PlantPositionWithId[];
    plant: PlantPositionWithId | null;
    loading: boolean;
    error: string | null;
}

const initialState: PlantPositionState = {
    plantDTOs: [] as PlantOfPositionDto[],
    plants: [] as PlantPositionWithId[],
    plant: null,
    loading: false,
    error: null
}


const plantSlice = createSlice({
    name: 'plant',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPlantPositions.pending, (state)=>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchPlantPositions.fulfilled, (state, action) => {
            state.loading = false;
            state.plantDTOs = action.payload;
        });
        builder.addCase(fetchPlantPositions.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(fetchPlantsOfPositionById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchPlantsOfPositionById.fulfilled, (state, action)=> {
            state.loading = false;
            state.plant = action.payload;
        });
        builder.addCase(fetchPlantsOfPositionById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
        
    }
    
});

export const plantReducer = plantSlice.reducer;