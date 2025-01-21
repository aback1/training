import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default: localStorage for web
import { menuApi } from "../features/Menu/menuApi.js";
import shoppingCartReducer from "../features/ShoppingCart/shoppingCartSlice.js";
import favoritesReducer from "../features/Favorites/favoritesSlice.js";
import { orderApi } from "../features/Order/orderApi.js";


// Persist configuration for the shoppingCart slice
const shoppingCartPersistConfig = {
    key: "shoppingCart",
    storage,
    whitelist: ["items", "userId"], // Persist specific keys in the shoppingCart slice
};

const favoritesPersistConfig = {
    key: "favorites",
    storage,
    whitelist: ["items", "favoriteId"],
}

const persistedfavoriteReducer = persistReducer(
    favoritesPersistConfig,
    favoritesReducer
);

// Wrap the shoppingCart reducer with persistReducer
const persistedShoppingCartReducer = persistReducer(
    shoppingCartPersistConfig,
    shoppingCartReducer
);

export const store = configureStore({
    reducer: {
        // Reducer for the menu API
        [menuApi.reducerPath]: menuApi.reducer,
        // Reducer for the order API
        [orderApi.reducerPath]: orderApi.reducer,
        // Persisted shoppingCart reducer
        shoppingCart: persistedShoppingCartReducer,

        favorites:  persistedfavoriteReducer

    },
    // Adding the API middleware enables caching, invalidation, polling
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }).concat(menuApi.middleware).concat(orderApi.middleware)
});

// Setup listeners for RTK Query
setupListeners(store.dispatch);

// Create the persistor for state persistence
export const persistor = persistStore(store);

export default store;
