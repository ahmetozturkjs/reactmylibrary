import {createStore,combineReducers} from "redux"
import categoriesReducer from "./reducers/categoriesReducer"
import booksReducers from "./reducers/booksReducer";

const rootReducer=combineReducers({
    categoriesState:categoriesReducer,
    booksState:booksReducers
})

const store=createStore(rootReducer);
export default store;
