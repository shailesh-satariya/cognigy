import React from "react";
import {screen, testRender} from "test/app-test-utils";
import App from "../App";
import userEvent from "@testing-library/user-event";
import faker from "faker";
import {act} from "react-dom/test-utils";


async function renderAppScreen(config = {}) {
    const utils = await testRender(<App/>, config);

    return {...utils};
}

describe("App component", () => {
    test("renders chat component", async () => {
        await renderAppScreen();

        expect(
            screen.getByRole("button", {name: /send/i})
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText(/text message/i)
        ).toBeInTheDocument();
    });

    test("renders chat component with messages", async () => {
        await renderAppScreen();

        const input = screen.getByPlaceholderText(/text message/i);
        const button = screen.getByRole("button", {name: /send/i});
        expect(button).toBeDisabled();
        const sentence = faker.lorem.sentence();

        // 1st message
        userEvent.type(input, sentence);
        expect(button).not.toBeDisabled();

        userEvent.click(button);
        expect(button).toBeDisabled();
        expect(input).toHaveValue("");

        expect(screen.getByText(sentence)).toBeInTheDocument();
        const botMsg1 = await screen.findByText("Hello there!");
        const botMsg2 = await screen.findByText(`You said: ${sentence}`);
        expect(botMsg1).toBeInTheDocument();
        expect(botMsg2).toBeInTheDocument();
        expect(screen.getAllByTestId("user-message-container").length).toBe(1);
        expect(screen.getAllByTestId("bot-message-container").length).toBe(2);

        // 2nd message
        const sentence2 = faker.lorem.sentence();
        userEvent.type(input, sentence2);
        userEvent.click(button);
        expect(screen.getByText(sentence2)).toBeInTheDocument();
        const botMsg3 = await screen.findByText(`You said: ${sentence2}`);
        expect(botMsg3).toBeInTheDocument();
        expect(screen.getAllByTestId("user-message-container").length).toBe(2);
        expect(screen.getAllByTestId("bot-message-container").length).toBe(3);
    });

    test("chat input disabled when offline", async () => {
        await renderAppScreen();

        const input = screen.getByPlaceholderText(/text message/i) as HTMLInputElement;
        const button = screen.getByRole("button", {name: /send/i}) as HTMLButtonElement;

        // Goes offline
        expect(input).not.toBeDisabled();
        expect(button).toBeDisabled();

        userEvent.type(input, "foo");
        expect(button).not.toBeDisabled();

        const goOffline = new window.Event("offline");
        act(() => {
            window.dispatchEvent(goOffline);
        });


        expect(input).toBeDisabled();
        expect(button).toBeDisabled();
        expect(screen.queryByRole("alert")).toBeInTheDocument();

        // Goes online
        const goOnline = new window.Event("online");
        act(() => {
            window.dispatchEvent(goOnline);
        });

        expect(input).not.toBeDisabled();
        expect(button).not.toBeDisabled();
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();

    });
});