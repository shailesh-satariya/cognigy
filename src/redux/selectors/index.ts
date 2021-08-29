import {RootState} from "../store";
import {Message} from "types";

export const getMessages = (state: RootState): Message[] => state.messages;
