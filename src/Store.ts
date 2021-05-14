import {
  compose, applyMiddleware, Store, createStore,
} from 'redux';
import reduxThunk from 'redux-thunk';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(reduxThunk),
);

const store: Store<any> = createStore(
  enhancer,
);

export default store;
