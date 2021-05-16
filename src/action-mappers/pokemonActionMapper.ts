import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import Pokemon from '../models/Pokemon';
import { apiGetPokemon } from '../remote/poke-api/pokeApi';
import { RootState } from '../store';

export enum PokemonActionTypes {
  GET_SINGLE_PENDING = 'pokemon/get-single/pending',
  GET_SINGLE_FULFILLED = 'pokemon/get-single/fulfilled',
  GET_SINGLE_REJECTED = 'pokemon/get-single/rejected',
  GET_SINGLE_SKIPPED = 'pokemon/get-single/skipped'
}

interface PokemonActionSuccessful {
  type: PokemonActionTypes.GET_SINGLE_FULFILLED;
  payload: Pokemon;
}

interface PokemonActionUnsuccessful {
  type: PokemonActionTypes.GET_SINGLE_REJECTED;
}

interface PokemonActionSkipped {
  type: PokemonActionTypes.GET_SINGLE_SKIPPED;
}

interface PokemonActionPending {
  type: PokemonActionTypes.GET_SINGLE_PENDING;
}

export type PokemonAction = PokemonActionSuccessful | PokemonActionUnsuccessful
  | PokemonActionSkipped | PokemonActionPending;

export const getSinglePokemonSuccessful: ActionCreator<PokemonActionSuccessful> = (p: Pokemon) => ({
  type: PokemonActionTypes.GET_SINGLE_FULFILLED,
  payload: p,
});

export const getSinglePokemonUnsuccessful: ActionCreator<PokemonActionUnsuccessful> = () => ({
  type: PokemonActionTypes.GET_SINGLE_REJECTED,
});

export const getSinglePokemonSkipped: ActionCreator<PokemonActionSkipped> = () => ({
  type: PokemonActionTypes.GET_SINGLE_SKIPPED,
});

export const getSinglePokemonPending: ActionCreator<PokemonActionPending> = () => ({
  type: PokemonActionTypes.GET_SINGLE_PENDING,
});

export const getPokemon: ActionCreator<
  ThunkAction< Promise<PokemonAction>, RootState, unknown, PokemonAction>
> = (id: number) => async (dispatch, getState): Promise<PokemonAction> => {
  // If you want to include the skipped logic in the action mapper, you can
  // This is nice if you want to see a "skipped" action
  // This can allow us to avoid network calls if we already have the queried pokemon
  // We include an optional second parameter called getState
  // It is a callback which gives us access to the current root state

  const { pokemon } = getState();

  if(pokemon.find((p) => p.id === id)) {
    return dispatch(getSinglePokemonSkipped());
  }

  // First dispatch a pending action, and then wait for async request
  // This allows our reducer do something in response if desired
  dispatch(getSinglePokemonPending());

  try {
    const response = await apiGetPokemon(id);

    // Type Guard to determine that the response was successful
    if('payload' in response) {
      return dispatch(getSinglePokemonSuccessful(response.payload));
    }
    return dispatch(getSinglePokemonUnsuccessful());
  } catch (error) {
    return dispatch(getSinglePokemonUnsuccessful());
  }
};
