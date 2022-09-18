import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface PokemonState {
  count: number | null;
  next: string | null;
  previous: string | null;
  results: [] | null;
}

const initialState: PokemonState = {
  count: null,
  next: null,
  previous: null,
  results: null
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemonState: (state, action) => {
      state.count = action.payload?.count;
      state.next = action.payload?.next;
      state.previous = action.payload?.previous;
      state.results = action.payload?.results;
    },
    resetPokemonState: (state) => {
      state = initialState;
    }
  }
});

export const { setPokemonState, resetPokemonState } = pokemonSlice.actions;

export const selectPokemons = (state: RootState) => state.pokemon.results;

export default pokemonSlice.reducer;
