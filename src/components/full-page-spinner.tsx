import React, {ReactElement} from "react";
import {CircularProgress, makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    spinnerWrapper: {
        fontSize: "4em",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
});

function FullPageSpinner(): ReactElement {
    const classes = useStyles();
    return (
        <div className={classes.spinnerWrapper}>
            <CircularProgress/>
        </div>
    );
}

export default FullPageSpinner;