import { combineReducers } from 'redux';
import pokeReducer from './pokeReducer';

export const state = combineReducers({
  pokemon: pokeReducer,
});

export default state;
