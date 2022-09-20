import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";

export interface PokemonDetailsState {
  abilities: [] | null;
  base_experience: number | null;
  forms: [] | null;
  game_indices: [] | null;
  height: number | null;
  held_items: [] | null;
  id: number | null;
  is_default: boolean | null;
  location_area_encounters: string | null;
  moves: [] | null;
  name: string | null;
  order: number | null;
  past_types: [] | null;
  species: {} | null;
  sprites: {} | null;
  stats: [] | null;
  types: [] | null;
  weight: number | null;
}

const initialState: PokemonDetailsState = {
  abilities: null,
  base_experience: null,
  forms: null,
  game_indices: null,
  height: null,
  held_items: null,
  id: null,
  is_default: null,
  location_area_encounters: null,
  moves: null,
  name: null,
  order: null,
  past_types: null,
  species: null,
  sprites: null,
  stats: null,
  types: null,
  weight: null
};

export const pokemonDetailsSlice = createSlice({
  name: "pokemonDetails",
  initialState,
  reducers: {
    setPokemonDetailsState: (state, action) => {
      state.abilities = action.payload.abilities;
      state.base_experience = action.payload.base_experience;
      state.forms = action.payload.forms;
      state.game_indices = action.payload.game_indices;
      state.height = action.payload.height;
      state.held_items = action.payload.held_items;
      state.id = action.payload.id;
      state.is_default = action.payload.is_default;
      state.location_area_encounters = action.payload.location_area_encounters;
      state.moves = action.payload.moves;
      state.name = action.payload.name;
      state.order = action.payload.order;
      state.past_types = action.payload.past_types;
      state.species = action.payload.species;
      state.sprites = action.payload.sprites;
      state.stats = action.payload.stats;
      state.types = action.payload.types;
      state.weight = action.payload.weight;
    },
    resetPokemonDetailsState: (state) => {
      state.abilities = null;
      state.base_experience = null;
      state.forms = null;
      state.game_indices = null;
      state.height = null;
      state.held_items = null;
      state.id = null;
      state.is_default = null;
      state.location_area_encounters = null;
      state.moves = null;
      state.name = null;
      state.order = null;
      state.past_types = null;
      state.species = null;
      state.sprites = null;
      state.stats = null;
      state.types = null;
      state.weight = null;
    }
  }
});

export const { setPokemonDetailsState, resetPokemonDetailsState } =
  pokemonDetailsSlice.actions;

export const selectPokemonDetails = (state: RootState) => state.pokemonDetails;

export default pokemonDetailsSlice.reducer;
