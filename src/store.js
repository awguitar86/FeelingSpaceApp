import { createStore, combineReducers } from 'redux';
import userInfo from './reducer/userInfo.reducer';


let rootReducer = combineReducers({
    userInfo,
})


export default createStore( rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );