import React, {ReactElement} from "react";
import {createTheme, CssBaseline, MuiThemeProvider} from "@material-ui/core";
import {Provider} from "react-redux";
import store from "redux/store";
import * as colors from "styles/colors";

const theme = createTheme({
    palette: {
        background: {
            default: colors.base100
        }
    },
    overrides: {
        MuiCssBaseline: {
            "@global": {
                "*::-webkit-scrollbar": {
                    width: "6px",
                    height: "5px"
                },
                "*::-webkit-scrollbar-track": {
                    "box-shadow": "inset 0 0 6px rgba(0, 0, 0, 0)",
                    "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
                },
                "*::-webkit-scrollbar-thumb": {
                    "border-left": "3px solid white",
                    "background-color": colors.primary
                },
                "*:hover::-webkit-scrollbar-thumb": {
                    "border-left": "0px solid white"
                },
                "*:focus::-webkit-scrollbar-thumb": {
                    "border-left": "0px solid white"
                }
            }
        }
    }
});

function AppProviders({children}: { children: ReactElement }): ReactElement {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <Provider store={store}>
                {children}
            </Provider>
        </MuiThemeProvider>
    );
}

export {AppProviders};
