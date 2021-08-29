import {Dispatch} from "redux";
import {Message} from "types";
import {ADD_MESSAGE} from "../action-types";

export const addMessage = (message: Message) => (dispatch: Dispatch): void => {
    dispatch({
        type: ADD_MESSAGE, payload: message
    });
};

export default {addMessage};