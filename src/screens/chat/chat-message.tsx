import React, {ReactElement} from "react";
import {Avatar, makeStyles} from "@material-ui/core";
import {Android, Person} from "@material-ui/icons";
import * as colors from "styles/colors";
import {Message} from "types";

const useStyles = makeStyles({
    messageBoxWrapper: {
        marginTop: "32px"
    },
    messageBox: {
        display: "flex",
        marginTop: "32px",
        alignItems: "flex-end",
        padding: "0 16px",

        "&$left": {
            flexDirection: "row"
        },
        "&$right": {
            flexDirection: "row-reverse"
        }
    },
    messageBoxAvatar: {
        width: "24px",
        height: "24px",
        fontSize: "0.75rem",

        "&$left": {
            marginRight: "18px"
        },
        "&$right": {
            marginLeft: "18px"
        }
    },
    messageBoxTextWrapper: {
        color: "hsla(0, 0%, 0%, .8)",
        minWidth: "64px",
        boxShadow: "0 2px 5px 2px rgb(151 124 156 / 10%), 0 4px 5px 4px rgb(203 195 212 / 10%), 0 5px 5px 1px rgb(216 212 221 / 10%), 0 5px 5px 0 rgb(151 124 156 / 10%), 0 8px 5px 0 rgb(203 195 212 / 10%), 0 12px 5px 0 rgb(216 212 221 / 10%)",
        borderRadius: "8px",
        backgroundColor: "rgba(0, 0, 0, 0.12)",

        "&$left": {
            background: colors.primary,
            color: colors.base,
            borderBottomLeftRadius: "2px"
        },
        "&$right": {
            background: colors.base100,
            color: colors.text,
            borderBottomRightRadius: "2px"
        }
    },
    messageBoxText: {
        padding: "8px 16px",
        wordBreak: "break-all",
        overflowWrap: "break-word"
    },
    left: {},
    right: {}
});

function ChatMessage({message}: { message: Message }): ReactElement {
    const classes = useStyles();
    const isBot = message.from === "bot";
    const alignClass = isBot ? "left" : "right";
    return (
        <div className={classes.messageBox + " " + classes[alignClass]} aria-describedby="">
            <Avatar className={classes.messageBoxAvatar + " " + classes[alignClass]}>
                {message.from === "user" ? <Person/> : <Android/>}
            </Avatar>
            <div className={classes.messageBoxTextWrapper + " " + classes[alignClass]}
                 data-testid={isBot ? "bot-message-container" : "user-message-container"}>
                <div className={classes.messageBoxText}>
                    {message.text}
                </div>
            </div>
        </div>
    );
}

export default ChatMessage;