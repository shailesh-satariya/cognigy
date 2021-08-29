import React, {ReactElement} from "react";
import {useSelector} from "react-redux";
import {makeStyles} from "@material-ui/core";
import {getMessages} from "redux/selectors";
import ChatMessage from "./chat-message";

const useStyles = makeStyles({
    chatMessages: {
        maxHeight: "100%",
        overflowY: "auto",
        padding: "16px 0"
    }
});

function ChatMessages(): ReactElement {
    const classes = useStyles();
    const ref = React.useRef<HTMLDivElement | null>(null);
    const messages = useSelector(getMessages);

    React.useEffect(() => {
        if (ref?.current) {
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    });


    return (
        <div className={classes.chatMessages} ref={ref}>
            {
                messages.map(message => (<ChatMessage message={message} key={message.id}/>))
            }
        </div>
    );
}

export default ChatMessages;