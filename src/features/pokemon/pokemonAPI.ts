import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getPokemons: builder.mutation({
      query: (body) => {
        return {
          url: `pokemon?limit=${body?.limit}&offset=${body?.offset}`,
          method: "GET"
        };
      }
    }),
    getPokemonByName: builder.mutation({
      query: (body) => {
        return {
          url: `pokemon/${body.name}`,
          method: "GET"
        };
      }
    })
    // getPokemon: builder.mutation({
    //   query: (body) => {
    //     return {
    //       url: userManagement.loginController.login,
    //       method: "POST",
    //       body: body
    //     };
    //   }
    // })
  })
});

export const { useGetPokemonsMutation, useGetPokemonByNameMutation } =
  pokemonApi;
