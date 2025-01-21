import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const menuApi = createApi({
    reducerPath: "menuApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:9000/" }),
    endpoints: (builder) => ({
        fetchFood: builder.query({
            query: () => "foods",
            providesTags: "food",
        }),

        getFoodById: builder.query({
            query: (id) => `foods/${id}`,
        }),
    }),
})

export const { useGetFoodByIdQuery, useFetchFoodQuery } = menuApi;