import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { pokemonApi } from "../features/pokemon/pokemonAPI";
import pokemonReducer from "../features/pokemon/pokemonSlice";
import pokemonDetailsReducer from "../features/pokemon/pokemonDetailSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pokemon: pokemonReducer,
    pokemonDetails: pokemonDetailsReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

setupListeners(store.dispatch);
