import {ActionTypes} from "../types";
import {ADD_MESSAGE} from "../action-types";
import {Message} from "types";

const initialState: Message[] = [];

/**
 * @function MessagesReducer
 *
 * @param {Message[]} state - State before reducer.
 * @param {ActionTypes} action - Action sent to reducer.
 *
 * @returns {Message[]} - New state.
 */
const MessagesReducer = (state: Message[] = initialState, action: ActionTypes): Message[] => {
    switch (action.type) {
        case ADD_MESSAGE:
            return [...state, action.payload];
        default:
            return state;
    }
};

export default MessagesReducer;