/* eslint-disable import/prefer-default-export */
import Pokemon from '../../models/Pokemon';
import PokeClient from './pokeClient';

export interface PokeApiResponse {
  status: number;
  payload: Pokemon;
}

// We can create a series of functions (or an object if you'd like)
// That abstracts away the interaction with the API
// If you're familiar with Angular, this would be our Service in a way
export const apiGetPokemon = async (id: number | string): Promise<PokeApiResponse> => {
  const response = await PokeClient.get<Pokemon>(`/pokemon/${id}`);
  // The axios GET request will throw an error if the request fails
  // If you want to handle that scenario yourself, surround it with a try-catch

  return { status: response.status, payload: response.data };
};

// Defining these ahead of time is helpful
// It makes us consider the error boundaries of interacting with the API
// What kinds of requests can you make?
// What can go wrong?

// Then we can design actions in regards to these results
