import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers.js';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
   /* compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )*/

   applyMiddleware(...middleware)

);

window.store = store;

export default store;