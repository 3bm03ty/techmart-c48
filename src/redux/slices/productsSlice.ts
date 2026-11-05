import { ProductI } from "@/interfaces/product";
import apiServices from "@/services/apiServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getAllProducts = createAsyncThunk("products/getAllProducts", async () => {

    const { data } = await apiServices.getProducts()
    return data;

})



const initialState: { products: ProductI[] } = {
    products: []
}

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            console.log("Fulfilled");
            state.products = action.payload
        }).addCase(getAllProducts.pending, (state, action) => {
            console.log("Pending");
        }).addCase(getAllProducts.rejected, (state, action) => {
            console.log("Rejected");
        })
    }
})



export const productsReducer = productsSlice.reducer;


