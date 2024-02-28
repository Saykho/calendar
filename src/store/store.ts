import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { watchSaga } from "./saga";
import { complaintsReducer } from "./reducers";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        complaints: complaintsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(sagaMiddleware),
})
sagaMiddleware.run(watchSaga);
