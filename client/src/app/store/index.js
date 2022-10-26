import {  compose , createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducer/index.js';

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;