import { configureStore } from '@reduxjs/toolkit';

import { covidApi } from './services/covidApi';

export const store = configureStore({
  reducer: {
    [covidApi.reducerPath]: covidApi.reducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(covidApi.middleware),
   
});
