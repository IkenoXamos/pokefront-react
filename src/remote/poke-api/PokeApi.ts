/* eslint-disable import/prefer-default-export */
import Pokemon from '../../models/Pokemon';
import PokeClient from './PokeClient';

export interface PokeApiResponse {
    status: number;
    payload: any;
}

export const apiGetPokemon = async (id: number | string): Promise<PokeApiResponse> => {
  const response = await PokeClient.get<Pokemon>(`/pokemon/${id}`);

  console.log(response);

  if(response.status === 200) {
    return { status: response.status, payload: response.data };
  }

  if(response.status === 404) {
    return { status: response.status, payload: 'Pokemon not found' };
  }

  return { status: response.status, payload: 'Failed to get Pokemon' };
};
