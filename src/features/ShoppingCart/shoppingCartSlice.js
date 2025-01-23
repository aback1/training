import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderId: null,
    items: [],
    showOrderForm: false,
    payment: "paypal",
    fullName: null,
    address: null,
    email: null,
    allCredentialsentered: false,
};

export const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {
        setOrderId: (state, action) => {
            state.orderId = action.payload;
        },
        addItem: (state, action) => {
            const existingItem = state.items.find(
                (item) =>
                    item.id === action.payload.id &&
                    JSON.stringify(item.options) === JSON.stringify(action.payload.options)
            );
            if (existingItem) {
                existingItem.amount += action.payload.amount;
            } else {
                state.items.push(action.payload);
            }
        },
        deleteItem: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        clearShoppingCart: () => initialState,
        incrementAmount: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item) {
                item.amount += 1;
            }
        },

        incrementByAmount: (state, action) => {
            const { id, amount } = action.payload;

            const existingItem = state.items.find((item) => item.id === id);

            if (existingItem) {
                existingItem.amount += amount;
            }
        },
        decrementAmount: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload);
            if (item && item.amount > 1) {
                item.amount -= 1;
            } else if (item && item.amount <= 1) {
                state.items = state.items.filter((item) => item.id !== action.payload);
            }
        },
        setShowOrderForm: (state, action) => {
            state.showOrderForm = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setFullName: (state, action) => {
            state.fullName = action.payload;
        },
        setAddress: (state, action) => {
            state.address = action.payload;
        },
        setPayment: (state, action) => {
            state.payment = action.payload;
        },
        setAllCredentialsentered: (state, action) => {
            state.allCredentialsentered = action.payload;
        }

    }
});

export const totalCartAmount = (state) => {
    return state.shoppingCart.items.reduce((sum, item) => {
        return(sum + item.amount * item.price);
}, 0)
};

// Selector to get the amount for a specific item by ID
export const selectCartAmount = (state, itemId) => {
    const item = state.shoppingCart.items.find((item) => item.id === itemId);
    return item ? item.amount : 0;
};

export const {
    setOrderId,
    addItem,
    deleteItem,
    incrementAmount,
    incrementByAmount,
    decrementAmount,
    clearShoppingCart,
    setShowOrderForm,
    setEmail,
    setFullName,
    setAddress,
    setPayment,
    setAllCredentialsentered
} = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
