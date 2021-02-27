import { describe } from "mocha";

describe("", () => {
  beforeEach(() => {
    // seed a post in the DB that we control from our tests
    cy.request("POST", "/seed-todos");
  });

  it("visits todos page", () => {
    cy.visit("/");
  });

  afterEach(() => {
    cy.request("POST", "/delete-all-todos");
  });
});
