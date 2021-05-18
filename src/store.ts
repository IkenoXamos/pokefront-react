import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './slices/pokemonSlice';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

// The RootState includes EmptyObject because we do not have any preloaded state
export type RootState = ReturnType<typeof store.getState>;
// We need to include the ThunkDispatch type in order to allow type-safety while dispatching thunks
// It would still work without it in pure JavaScript, but this way TypeScript is also happy
export type AppDispatch = typeof store.dispatch;

export default store;
