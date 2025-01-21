import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
}

export const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.items.push(action.payload);
        },
        deleteFavorite: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);

        },
        clearFavorites: () => initialState,
        },

});

export const {
    addFavorite, deleteFavorite, clearFavorites
} = favoritesSlice.actions;

export default favoritesSlice.reducer;