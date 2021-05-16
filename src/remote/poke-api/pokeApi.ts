/* eslint-disable import/prefer-default-export */
import Pokemon from '../../models/Pokemon';
import PokeClient from './pokeClient';

export interface PokeApiResponseSuccess {
  status: number;
  payload: Pokemon;
}

export interface PokeApiResponseError {
  status: number;
  message: string;
}
export type PokeApiResponse = PokeApiResponseSuccess | PokeApiResponseError;

// We can create a series of functions (or an object if you'd like)
// That abstracts away the interaction with the API
// If you're familiar with Angular, this would be our Service in a way
export const apiGetPokemon = async (id: number | string): Promise<PokeApiResponse> => {
  const response = await PokeClient.get<Pokemon>(`/pokemon/${id}`);

  if(response.status === 200) {
    return { status: response.status, payload: response.data };
  }

  if(response.status === 404) {
    return { status: response.status, message: 'Pokemon not found' };
  }

  return { status: response.status, message: 'Failed to get Pokemon' };
};

// Defining these ahead of time is helpful
// It makes us consider the error boundaries of interacting with the API
// What kinds of requests can you make?
// What can go wrong?

// Then we can design actions in regards to these results
