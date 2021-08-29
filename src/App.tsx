import React, {ReactElement} from "react";
import {v4 as uuidv4} from "uuid";
import {useDispatch} from "react-redux";
import Chat from "screens/chat";
import {client} from "services";
import {addMessage} from "redux/actions";
import FullPageSpinner from "components/full-page-spinner";

function App(): ReactElement {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const dispatch = useDispatch();

    React.useEffect(() => {
        client.connect().then(
            () => setIsLoading(false),
            (e) => setError(e.toString)
        );

        client.on("output", (output) => {
            dispatch(addMessage({
                id: uuidv4(),
                text: output.text,
                from: "bot"
            }));
        });
        client.on("error", ({message}) => {
            setError(message);
            console.log(message);
        });

        return () => {
            client.disconnect();
        };
    }, []);

    return isLoading ? <FullPageSpinner/> : <Chat/>;
}

export default App;