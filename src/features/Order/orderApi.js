
import { createApi } from "@reduxjs/toolkit/query/react"
import { fetchBaseQuery} from "@reduxjs/toolkit/query";

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000" }),
    endpoints: (builder) => ({
        fetchOrders: builder.query({
            query: () => "orders",
            providesTags: "orders"
        }),

        getOrderById: builder.query({
            query: (orderId) => `orders?orderId=${orderId}`,
            providesTags: "orders"
        }),

        createOrder: builder.mutation({
            query: (order) => ({
                url: "/orders",
                method: "POST",
                body: JSON.stringify(order),
                invalidatesTags: "orders"
            }),
        }),
    }),
})

export const { useFetchOrdersQuery ,useGetOrderByIdQuery, useCreateOrderMutation} = orderApi;





