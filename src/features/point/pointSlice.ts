import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PointWithId } from "../../models/point";
import { createPoint, fetchPointById, fetchPoints, updatePoint, updatePointByPercentage } from "./pointThunk";
// import { fetchStart, fetchSuccess } from "../position/positionSlice";

interface PointState {
      point: PointWithId | null,
      points: PointWithId[],
      loading: boolean,
      error: string | null,

}

const initialState: PointState = {
    point: null,
    points: [],
    loading: false,
    error: null
}

const pointSlice = createSlice({
    name: "point",
    initialState: initialState,
    reducers: {
        fetchStart(state) {
            state.loading = true;
            state.error = null
        },
        fetchSuccess(state, action: PayloadAction<PointWithId[]>){
            
            state.points = action.payload;
            state.loading = false;

        },

        setPoint(state, action) {
            state.point = action.payload;
        },
        setPoints(state, action) {
            state.points = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase( fetchPoints.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase( fetchPoints.fulfilled, (state, action: PayloadAction<PointWithId[]>) => {
            state.loading = false;
            state.points = action.payload;
        });
        builder.addCase( fetchPoints.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Error fetching points";
        });

        builder.addCase( fetchPointById.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase( fetchPointById.fulfilled, (state, action: PayloadAction<PointWithId>) => {
            state.point = action.payload;
            state.loading = false;
        });
        builder.addCase( fetchPointById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Error fetching point by ID";
        }); 
        builder.addCase( createPoint    .pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase( createPoint.fulfilled, (state, action: PayloadAction<PointWithId>) => {
            state.point = action.payload;
            state.loading = false;
        });
        builder.addCase( createPoint.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Error creating point";
        }); 
        builder.addCase( updatePointByPercentage.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase( updatePointByPercentage.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase( updatePointByPercentage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Error updating point";
        }); 
      
      

    }          
})



export default pointSlice.reducer;