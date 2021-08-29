import {Container, makeStyles} from "@material-ui/core";
import React, {ReactElement} from "react";
import ChatMessages from "./chat-messages";
import ChartInputForm from "./chart-input-form";
import * as colors from "styles/colors";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        width: "460px",
        maxWidth: "100%",
        height: "100vh",
        minHeight: "500px",
        boxShadow: "0 0 20px 0 rgb(0 0 0 / 10%)",
        padding: 0
    },
    chatMessagesContainer: {
        flexGrow: 1,
        overflowY: "hidden",
        backgroundColor: colors.base
    }
});

function Chat(): ReactElement {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <div className={classes.chatMessagesContainer}>
                <ChatMessages/>
            </div>
            <div>
                <ChartInputForm/>
            </div>
        </Container>
    );
}

export default Chat;