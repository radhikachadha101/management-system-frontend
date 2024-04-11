import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { thunk } from 'redux-thunk';
import promise from 'redux-promise';
import createInterceptors from './axiosInterceptor';

const storeEnhancer = applyMiddleware(promise, thunk)(createStore)
const appStore = storeEnhancer(rootReducer);
createInterceptors(appStore);
export default appStore;
