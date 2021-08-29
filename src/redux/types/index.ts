import {ADD_MESSAGE} from "../action-types";
import {Message} from "../../types";

interface DefaultAction {
    type: undefined | null;
}

interface AddMessageAction {
    type: typeof ADD_MESSAGE;
    payload: Message;
}

export type ActionTypes =
    | DefaultAction
    | AddMessageAction;
