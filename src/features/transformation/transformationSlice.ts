import { createSlice } from "@reduxjs/toolkit";
import { TransformationWithId } from "../../models/transformation";
import { addTransformation, fetchTransformationLast, fetchTransformations } from "./transformationThunk";



interface TransformationState {
    transformations: TransformationWithId[];
    transformation: TransformationWithId | null;
    loading: boolean;
    error: string | null;
}

const initialState: TransformationState = {
    transformations: [],
    transformation: null,
    loading: false,
    error: null}


const transformationSlice = createSlice({
    name: 'transformation',
    initialState,
    reducers: {
       /*  fetchStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchSuccess(state, action ) {
            state.transformations = action.payload;
            state.loading = false;
        },

        setTransformation(state, action: PayloadAction<TransformationWithId | null>) {
            state.transformation = action.payload;
        },
        setTransformations(state, action: PayloadAction<TransformationWithId[]>) {
            state.transformations = action.payload; 
        } */
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTransformationLast.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTransformationLast.fulfilled, (state, action)=> {
             state.loading = false;
             state.transformation = action.payload;
        });
        builder.addCase(fetchTransformationLast.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(fetchTransformations.pending, (state) => 
        { 
            state.loading = true;
        });
        builder.addCase(fetchTransformations.fulfilled, (state, action) => {
            state.loading = false;
            state.transformations = action.payload;
        });
        builder.addCase(fetchTransformations.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload as string;
        });
        builder.addCase(addTransformation.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addTransformation.fulfilled, (state, action)=> {
            state.loading = false;
            state.transformation = action.payload;
        });
        builder.addCase(addTransformation.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload as string;
        })
    }
})

export default transformationSlice.reducer;
// export const { fetchStart, fetchSuccess, setTransformation, setTransformations } = transformationSlice.actions;