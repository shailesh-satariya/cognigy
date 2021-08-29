import React from "react";
import {render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {AppProviders} from "context";

async function testRender(ui: React.ReactElement, {...renderOptions} = {}) {
    const returnValue = {
        ...render(ui, {
            wrapper: AppProviders as any as React.ComponentType,
            ...renderOptions
        })
    };

    // wait for react-query to settle before allowing the test to continue
    await waitForLoadingToFinish();

    return returnValue;
}

const waitForLoadingToFinish = () =>
    waitForElementToBeRemoved(
        () => [
            ...screen.queryAllByRole("progressbar")
        ],
        {timeout: 4000}
    );

export * from "@testing-library/react";
export {testRender, userEvent, waitForLoadingToFinish};
