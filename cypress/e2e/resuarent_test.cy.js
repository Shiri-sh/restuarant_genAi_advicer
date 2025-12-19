describe("resuarent_test", () => {

    it("send_audio_to_server_test", () => {
        cy.visit("http://localhost:3000/", {
            onBeforeLoad(win) {
                const text = " give-me-a-tasty-brackfast ";
                const encoder = new TextEncoder();

                win.__TEST_AUDIO_CHUNKS__ = [
                    encoder.encode(text)
                ];
            }
        });

        cy.wait(5000);
        cy.click(".mic-button", { force: true });
        cy.wait(5000);
        cy.get(".wave-bar").first().should("be.visible");
        cy.get("[data-testid='confirm-btn']").click({ force: true });
        cy.wait(20000);
        cy.get(".dishes-grid .dish-card")
            .should("have.length.at.least", 1)
            .first()
            .should("be.visible");

    });

});
