describe("resuarent_test", () => {

    it("send_audio_to_server_test", () => {
        cy.fixture("test-audio.webm.mp3", "binary").then((audio) => {
            const blob = Cypress.Blob.binaryStringToBlob(
              audio,
              "audio/webm;codecs=opus"
            );
            cy.visit("http://localhost:3000", {
              onBeforeLoad(win) {
                win.__TEST_AUDIO_CHUNKS__ = [blob];
              }
            });
          });

        cy.wait(1000);
        cy.get(".mic-button").click({ force: true });
        cy.wait(5000);
        cy.get(".wave-bar").first().should("be.visible");
        cy.get("[data-testid='confirm-btn']").click({ force: true });
        cy.wait(2000);
        cy.get(".dishes-grid .dish-card")
            .should("have.length.at.least", 1)
            .first()
            .should("be.visible");

    });

});
