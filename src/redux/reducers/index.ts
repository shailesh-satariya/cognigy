import {combineReducers} from "redux";
import MessagesReducer from "./answers-reducer";

export default combineReducers({
    messages: MessagesReducer,
});
