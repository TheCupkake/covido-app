import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

    export const covidApi = createApi({
        reducerPath: 'covidApi',
        baseQuery: fetchBaseQuery({
            baseUrl: 'https://covid-193.p.rapidapi.com',
            prepareHeaders: (headers) => {
                headers.set('X-RapidAPI-Key', 'dc412f2a70msh711a5d9d5cb4422p1d2c71jsnefdf2d62fb2c')

                return headers
            }
        }),
        endpoints: (builder) => ({
            getAllCountries: builder.query({query: () => '/countries'}),
            getAllStats: builder.query({query: () => '/statistics?country=all'}),
            getCountryStats: builder.query({query: (country) => `/statistics?country=${country}`})
        })
    })

    export const {
        useGetAllCountriesQuery,
        useGetAllStatsQuery,
        useGetCountryStatsQuery,
    } = covidApi