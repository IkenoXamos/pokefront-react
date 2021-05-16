import { Reducer } from 'redux';
import { PokemonAction, PokemonActionTypes } from '../action-mappers/pokemonActionMapper';
import Pokemon from '../models/Pokemon';

export type PokemonState = Pokemon[];

// We can put the logic for skipping cached pokemon in the reducer or the action mapper
// It is cleaner if we include the logic here
// Since it is a simple function that maps state into new state
// However, if we do so in the action mapper, we can skip the entire network call
// Which saves bandwidth
const pokeReducer: Reducer<PokemonState, PokemonAction> = (state = [], action) => {
  switch (action.type) {
    case PokemonActionTypes.GET_SINGLE_FULFILLED: {
      // Query the state to determine if the dispatched pokemon already exists
      const indexExisting = state.findIndex((p) => p.id === action.payload.id);
      // Returns -1 only if the pokemon is new

      if(indexExisting === -1) {
        return [...state, action.payload];
      }

      return state;
    }
    default:
      return state;
  }
};

export default pokeReducer;
