import faker from "faker";

describe("smoke", () => {
    it("should allow a typical user flow", () => {
        cy.visit("/");

        cy.findByRole("progressbar").should("exist");
        cy.findByRole("progressbar").should("not.exist");

        // 1st text
        const sentence = faker.lorem.sentence();
        cy.findByRole("button", {name: /send/i}).should("exist").should("be.disabled");
        cy.findByPlaceholderText(/text message/i).type(sentence);
        cy.findByRole("button", {name: /send/i}).should("not.be.disabled").click();
        cy.findByRole("button", {name: /send/i}).should("be.disabled");
        cy.findByPlaceholderText(/text message/i).should("have.value", "");

        cy.findByText(sentence).should("exist");
        cy.findByText("Hello there!").should("exist");
        cy.findByText(`You said: ${sentence}`).should("exist");

        cy.findAllByTestId("user-message-container").should("have.length", 1);
        cy.findAllByTestId("bot-message-container").should("have.length", 2);

        // 2nd text
        const sentence2 = faker.lorem.sentence();
        cy.findByPlaceholderText(/text message/i).type(sentence2);
        cy.findByRole("button", {name: /send/i}).click();

        cy.findByText(sentence2).should("exist");
        cy.findByText(`You said: ${sentence2}`).should("exist");

        cy.findAllByTestId("user-message-container").should("have.length", 2);
        cy.findAllByTestId("bot-message-container").should("have.length", 3);

        // Disabled on offline
        cy.findByPlaceholderText(/text message/i).type("Hi");
        cy.findByRole("button", {name: /send/i}).should("not.be.disabled");
        cy.findByPlaceholderText(/text message/i).should("not.be.disabled");
        cy.window().trigger("offline");

        cy.findByRole("button", {name: /send/i}).should("be.disabled");
        cy.findByPlaceholderText(/text message/i).should("be.disabled");
        cy.findByRole("alert").should("exist");

        cy.wait(2000);

        cy.window().trigger("online");
        cy.findByRole("button", {name: /send/i}).should("not.be.disabled");
        cy.findByPlaceholderText(/text message/i).should("not.be.disabled");
        cy.findByRole("alert").should("not.exist");

    });
});
