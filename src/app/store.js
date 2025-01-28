import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default: localStorage for web
import { orderApi } from "../features/Order/orderApi.js";
import { menuApi } from "../features/Menu/menuApi.js";
import shoppingCartReducer from "../features/ShoppingCart/shoppingCartSlice.js";
import favoritesReducer from "../features/Favorites/favoritesSlice.js";

const shoppingCartPersistConfig = {
    key: "shoppingCart",
    storage
};

const favoritesPersistConfig = {
    key: "favorites",
    storage
};

const persistedfavoriteReducer = persistReducer(
    favoritesPersistConfig,
    favoritesReducer
);

const persistedShoppingCartReducer = persistReducer(
    shoppingCartPersistConfig,
    shoppingCartReducer
);

export const store = configureStore({
    reducer: {
        [menuApi.reducerPath]: menuApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        shoppingCart: persistedShoppingCartReducer,
        favorites:  persistedfavoriteReducer

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }).concat(menuApi.middleware).concat(orderApi.middleware)
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export default store;
