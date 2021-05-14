# Cypress.io Test Run

Test run with [Cypress.io](https://www.cypress.io/) for e2e testing.

These tests are a separate repo for testing a React application found at [https://github.com/craig-o-curtis/cypress-target-app](https://github.com/craig-o-curtis/cypress-target-app).
The tests assume the React app is running on port 3000.

## Installing Cypress

```bash
npm i -D cypress
```

## Open Cypress interface

```bash
npx cypress open
```

## Set Base URL

- Go to cypress.json

```json
{
  "baseUrl": "http://localhost:3000"
}
```

## Test Syntax

- Add data-cy attributes on DOM elements
- visit page with `cy.visit('http://localhost:3000/example-3');`
- with baseUrl, visit with `cy.visit('/example-3');`
- Select data-cy with `cy.get('[data-cy="my-unique-identifier"]')`
- Use CSS selector syntax `cy.get('[data-cy="my-unique-identifier"] > :nth-child(2) > span')`
- Aliasing with `as`

```js
    cy.get("[data-cy='last-name-chars-left-count']")
        .as('charsLeftSpan');
    cy.get('@charsLeftSpan')...
```

- Actions
  - click `cy.get('@charsLeftSpan').click()`
  - dblclick `cy.get('@charsLeftSpan').dblclick()`
  - type `cy.get('@input').type('Hello world')`
  - select `cy.get('@select').select('Option 2')`
  - trigger
    - `mouseup`, `mousedown`, `mouseover`
    - `mouseenter`, `mouseleave`
    - `touchstart`, `touchend`
    - `click`, `dblclick`
    ```js
        cy.get('@dropdown')
            .trigger('mouseover', /* optional top */, /* optional left */)
    ```
- Expecting

  - grabbing text
  - should'ing

  ```js
  cy.get("h1").invoke("text").should("equal", "My Awesome Web Application");
  ```

  - working with results (not a promise)

  ```js
  cy.get("@charsLeftSpan").then(($charsLeftSpan) => {
    //** $charsLeftSpan is DOM element; not a promise */
    // ** Use Chai expect, jQuery **/
    expect($charsLeftSpan.text()).to.equal("15");
  });
  ```

- Assertions

  - val `.should('equal', 'some value')`
  - attr val `.should('have.attr', 'style', 'color: orange;')`
  - chaining `.should('have.class', 'active').and('have.attr', 'href')`
  - check length `.should('have.length', 4)`
  - get attr value `.invoke('attr', 'data-test-id').should('equal', 'test-example')`
  - check if element exists `.should('exist'), .should('not.exist')`
  - check visibility `.should('be.visible'), .should('not.be.visible')`
  - check CSS class `.should('have.class', 'selected')`
  - check style `.should('have.css', 'background-color', 'blue')`
  - check text content `.invoke('text').should('equal', 'Hello world')`
  - more text content `.should('contain','string'), .should('not.contain', 'string')`

- Automatic Retrying

  - retry until pas
  - use case - API call
  - do not use timeout
  - retries `.get()`, not interactions like `.click()` or `.type()`
  - only retries failing commands
  - retries until passes or until timeout reached

- Debugging Cypress

  - Simply Debugger

    - add `debugger` in a `.then(()=>{})` , open dev tools > console

    ```js
    ...
    cy.get('@hoverEl')
        .trigger('mouseover')
        .then(() => {
            debugger;
        });
    ...
    ```

    - or simply by adding `.debug()`

    ```js
    ...
    cy.get('@hoverEl')
        .trigger('mouseover')
        .debug();
    ...
    ```

    - In console, type `subject` to inspect jQuery element

- Environment Variables

  - Ex: can change url depending on envt
  - Ex: specify secret keys
  - Add directly to machine (Mac, Linux)

  ```bash
  $ export CYPRESS_MY_ENV_VAR='hello'
  ```

  - Access envt var in cypress spec file

  ```js
  // my-test.spec.js
  ...
  Cypress.env('MY_ENV_VAR')
  ```

  - Remove set envt var

  ```bash
  $ unset CYPRESS_MY_ENV_VAR
  ```

  - OR pass flag when running cypress from command line

  ```bash
  $ npx cypress open --env MY_ENV_VAR="world"
  ```

  - OR add to `cypress.json` file

  ```json
  {
    "baseUrl": "http://localhost:3000",
    "env": {
      "MY_VAR": "planet"
    }
  }
  ```

  - OR create a file `cypress.env.json` (add to gitignore)

  ```json
  {
    "MY_ENV_VAR": "Hello universe"
  }
  ```

- Test Doubles

  - Avoid mocking, stubbing generally
  - want to make sure app works in similar-to-real environment
  - use-cases
    - log in flow
    - server errors
  - wraps Sinon.js
  - mock API calls `cy.stub()`

  ```js
  import { api } from "./my-api";
  cy.stub(api, "getUser").returns({ name: "My name" });
  cy.stub(api, "getUser").resolves({ name: "My name" });
  cy.stub(api, "getUser").rejects();
  ```

  - watch methods `cy.spy()`

  ```js
  const mySpy = cy.spy(api, "getUser");
  expect(mySpy).to.be.called);
  ```

- Useful commands

  - `cy.wrap`

  ```js
    cy.get('h1').then($element => {
        cy.wrap($element).should(...);
    })
  ```

  - `cy.and`

  ```js
  cy.get('h1')
    .should(...)
    .and(...)
  ```

  - `.filter`, `.not`

  ```js
  cy.get("#content-container").filter("button");
  cy.get("#content-container").not("p");
  ```

  - special characters
    - Enter
    - Tab
    - Esc, etc.

  ```js
  cy.get("input").type("This is a test {Enter}");
  cy.get("input").type("{Tab}");
  cy.get("input").type("{Esc}");
  ```

  - VS Code code completion - add `/// <reference types="Cypress" />` to type of file

  ```js
  /// <reference types="Cypress" />
  ...
  ```

  - add `jsonconfig.json` file

  ```json
  {
    "include": ["./node_modules/cypress", "cypress/**/*.js"]
  }
  ```
