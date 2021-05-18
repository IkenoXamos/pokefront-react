import {
  createAsyncThunk, createSlice,
} from '@reduxjs/toolkit';
import Pokemon from '../models/Pokemon';
import { apiGetPokemon } from '../remote/poke-api/pokeApi';

// createAsyncThunk takes 3 parameters (The third is optional)
// The first parameter is the action type
// It will be suffixed with /pending, /rejected, and /fulfilled according
// to the possible results of an asynchronous operation

// The second parameter is our callback
// It will handle processing the operation (The fulfilled scenario)
// If at any point the promise would reject (an error occurs),
// then the rejected action will be dispatched

// The third parameter is an options object
// It allows us to specify conditions for the operation to be executed
// Among other customizations
export const getPokemon = createAsyncThunk(
  'pokemon/get-single',
  async (id: number): Promise<Pokemon> => {
    // If this axios request throws an error, then Redux Toolkit
    // Will dispatch a rejected action
    const response = await apiGetPokemon(id);

    // This lets us know that we definitely will have a payload of type Pokemon
    return response.payload;
  }, {
    // This option allows us to conditionally cancel this action
    // We shall cancel it if we already have cached the requested pokemon
    condition: (id: number, { getState }) => {
      // Return true if the request is to continue

      // We declare the type of the state here directly
      // We can't define it as RootState, because RootState depends on this
      // Which would create circular references
      const { pokemon } = getState() as { pokemon: Pokemon[] };

      return !pokemon.find((p) => p.id === id);
    },
    // This option will still dispatch the rejected action when the above condition is false
    dispatchConditionRejection: true,
  },
);

// getPokemon will now be able to be dispatched like any thunk
// dispatch(getPokemon(id));

// However, the above statements don't have any reducers associated with it
// We declare them as part of our Redux "Slice" (feature-set)
// Note that we must create them in the extraReducers field

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: [] as Pokemon[],
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(getPokemon.pending, (state, action) => {
        console.log(action);
      })
      .addCase(getPokemon.fulfilled, (state, action) => {
        state.push(action.payload);
        state.sort((a, b) => a.id - b.id);
      })
      .addCase(getPokemon.rejected, (state, action) => {
        console.log(action);
      });
  },
});

export default pokemonSlice.reducer;
