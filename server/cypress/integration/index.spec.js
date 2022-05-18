describe("Username form test", () => {
  it("should display the username form", () => {
    cy.visit("/");
    cy.get("#username-form").should("be.visible");
  });

  it("should fill the username form", () => {
    cy.visit("/");
    cy.get("#username-form").should("be.visible");

    cy.get("#username-form input").type("Molly").should("have.value", "Molly");
  });

  it("should fill the username form and submit", () => {
    cy.visit("/");
    cy.get("#username-form").should("be.visible");

    cy.get("#username-form input").type("Molly").should("have.value", "Molly");

    cy.get("#username-form").submit();
  });

  it("should fill the username form and submit and receive response", () => {
    cy.visit("/");
    cy.get("#username-form").should("be.visible");

    cy.get("#username-form input").type("Molly").should("have.value", "Molly");

    cy.get("#username-form").submit();

    cy.get("#userId").then(($userId) => {
      const userId = $userId.text();

      cy.log(userId);
    });
  });

  it("should fill the username form and submit and should fill the exercise form and submit", () => {
    cy.visit("/");
    cy.get("#username-form").should("be.visible");

    cy.get("#username-form input").type("Molly").should("have.value", "Molly");

    cy.get("#username-form").submit();

    cy.get("#userId").then(($userId) => {
      const userId = $userId.text();

      cy.log(userId);

      cy.get("#exercise-form").should("be.visible");
      cy.get('#exercise-form input[name="description"]').type("Yoga").should("have.value", "Yoga");
      cy.get('#exercise-form input[name="duration"]').type(60).should("have.value", 60);
      cy.get('#exercise-form input[name="date"]').type("2022-05-12").should("have.value", "2022-05-12");

      cy.get("#exercise-form").submit();
    });
  });

  it("should fill forms, submit and show exercises table", () => {
    cy.visit("/");
    cy.get("#username-form").should("be.visible");

    cy.get("#username-form input").type("Molly").should("have.value", "Molly");

    cy.get("#username-form").submit();

    cy.get("#userId").then(($userId) => {
      const userId = $userId.text();

      cy.log(userId);

      cy.get("#exercise-form").should("be.visible");
      cy.get('#exercise-form input[name="description"]').type("Yoga").should("have.value", "Yoga");
      cy.get('#exercise-form input[name="duration"]').type(60).should("have.value", 60);
      cy.get('#exercise-form input[name="date"]').type("2022-05-12").should("have.value", "2022-05-12");

      cy.get("#exercise-form").submit();

      cy.get("#showExercises").should("be.visible");
      cy.get("#showExercises").click();
    });
  });
});
