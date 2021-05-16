import { AnyAction, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk, { ThunkDispatch } from 'redux-thunk';
import { state } from './reducers';

const store = createStore(
  state,
  composeWithDevTools(
    applyMiddleware(reduxThunk),
  ),
);

// The RootState includes EmptyObject because we do not have any preloaded state
export type RootState = ReturnType<typeof store.getState>;
// We need to include the ThunkDispatch type in order to allow type-safety while dispatching thunks
// It would still work without it in pure JavaScript, but this way TypeScript is also happy
export type AppDispatch = typeof store.dispatch & ThunkDispatch<RootState, void, AnyAction>;

export default store;
