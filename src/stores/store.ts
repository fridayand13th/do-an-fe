import { TLoaderInitialState } from "@@types/stores/loader";
import { TMeInitialState } from "@@types/stores/me";
import { TNavbarInitialState } from "@@types/stores/navbar";
import { TNavigatorInitialState } from "@@types/stores/navigator";
import { TPopupInitialState, TPopupList } from "@@types/stores/popup";
import {
  combineReducers,
  configureStore,
  PayloadAction,
  Reducer,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import stores from "@stores/index";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

type ReducersType = {
  navbar: TNavbarInitialState;
  test: any;
  popup: TPopupInitialState<TPopupList>[];
  me: TMeInitialState;
  loader: TLoaderInitialState;
  navigator: TNavigatorInitialState;
};
const reducer = (state: ReducersType, action: PayloadAction<any>) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return combineReducers(stores)(state, action);
};

const _configure = {
  reducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
} as {
  reducer:
    | Reducer<
        ReducersType,
        {
          payload: any;
          type: string;
        }
      >
    | ReducersMapObject<
        ReducersType,
        {
          payload: any;
          type: string;
        }
      >;
};
const makeStore = () => configureStore(_configure);

const store = makeStore();

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
