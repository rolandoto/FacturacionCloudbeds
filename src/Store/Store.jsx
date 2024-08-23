
import {configureStore } from '@reduxjs/toolkit'
import {ApiListHotelSlice} from '../reducers/ApiListHotelSlice';
import {ApiCloubedsSlice} from '../reducers/ApiCloubedsSlice';
import {CitySigoSlice} from '../reducers/ApiCitySigo';

const persistanceLocalStorageMiddleware = (store) => (next) => (action) => {
	next(action);
	localStorage.setItem("redux", JSON.stringify(store.getState()));
};

const store = configureStore ({
    reducer:{
        listHotel:ApiListHotelSlice.reducer,
        Cloubeds:ApiCloubedsSlice.reducer,
        CitySigoSlice:CitySigoSlice.reducer
        },
    devTools:true,
    middleware: [persistanceLocalStorageMiddleware],
})

export const RootState = store.getState

export const  AppDispatch = typeof store.dispatch

export default store
