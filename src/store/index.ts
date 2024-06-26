import { configureStore } from "@reduxjs/toolkit";
import configReducer from "./configReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import modalReducer from "./modalReducer";

const store = configureStore({
  reducer: {
    config: configReducer,
    modals: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
