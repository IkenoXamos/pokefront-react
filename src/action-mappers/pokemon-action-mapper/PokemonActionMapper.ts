/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */

import { apiGetPokemon } from '../../remote/poke-api/PokeApi';

const enum PokemonTypes {
    SUCCESSFUL_GET = 'GET_SINGLE_POKEMON_SUCCESSFUL',
    UNSUCCESSFUL_GET = 'GET_SINGLE_POKEMON_UNSUCCESSFUL',
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getPokemon = (id: number) => async (dispatch: any): Promise<void> => {
  try {
    const response = await apiGetPokemon(id);

    if(response.status === 200) {
      dispatch({
        type: PokemonTypes.SUCCESSFUL_GET,
        payload: {

        },
      });
    }
  } catch (error) {
    dispatch({
      type: PokemonTypes.UNSUCCESSFUL_GET,
      payload: {

      },
    });
  }
};
