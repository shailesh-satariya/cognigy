import React, {ReactElement} from "react";
import {useDispatch} from "react-redux";
import {addMessage} from "redux/actions";
import {v4 as uuidv4} from "uuid";
import {Avatar, makeStyles, TextField} from "@material-ui/core";
import {Send} from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import * as colors from "styles/colors";
import {client} from "services";

const useStyles = makeStyles({
    inputForm: {
        background: colors.base100,
        display: "flex",
        padding: "30px 50px",
        alignItems: "center"
    },
    messageTextField: {
        background: colors.base,
        flexGrow: 1
    },
    messageTextInput: {
        padding: "16px 14px"
    },
    sendButton: {
        marginLeft: "30px",
        boxShadow: "none",
        outline: "none",
        border: "none",

        background: colors.primary,
        color: colors.base,
        "&:disabled": {
            background: colors.base300,
            color: colors.base500
        }
    }
});

function ChartInputForm(): ReactElement {
    const [text, setText] = React.useState("");
    const [isOnline, setIsOnline] = React.useState(true);
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleOffline = () => setIsOnline(false);
    const handleOnline = () => setIsOnline(true);

    React.useEffect(() => {
        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        client.sendMessage(text);
        dispatch(addMessage({
            id: uuidv4(),
            text: text,
            from: "user"
        }));
        setText("");
    };

    return (
        <>
            {!isOnline ? <Alert severity="error">No internet connection!</Alert> : null}
            <form onSubmit={onFormSubmit}>
                <div className={classes.inputForm}>
                    <TextField id="standard-basic" placeholder="Text Message" variant="outlined"
                               value={text}
                               disabled={!isOnline}
                               onChange={(event) => setText(event.target.value)}
                               className={classes.messageTextField}
                               InputProps={{
                                   classes: {input: classes.messageTextInput},
                                   "aria-describedby": "message-text"
                               }}/>
                    <Avatar component="button" className={classes.sendButton} disabled={!isOnline || !text.length}
                            aria-label="send">
                        <Send/>
                    </Avatar>
                </div>
            </form>
        </>
    );
}

export default ChartInputForm;