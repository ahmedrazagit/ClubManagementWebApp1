import { entityTableSelector, entityDetailsButtonSelector, entityDetailsBackButtonSelector } from '../../support/entity';

describe('GDPR e2e test', () => {
  const gDPRPageUrl = '/gdpr';
  const gDPRPageUrlPattern = new RegExp('/gdpr(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const gDPRSample = {};

  let gDPR;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/gdprs+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/gdprs').as('postEntityRequest');
    cy.intercept('DELETE', '/api/gdprs/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (gDPR) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/gdprs/${gDPR.id}`,
      }).then(() => {
        gDPR = undefined;
      });
    }
  });

  it('GDPRS menu should load GDPRS page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('gdpr');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('GDPR').should('exist');
    cy.url().should('match', gDPRPageUrlPattern);
  });

  describe('GDPR page', () => {
    describe('with existing value', () => {
      beforeEach(function () {
        cy.visit(gDPRPageUrl);

        cy.wait('@entitiesRequest').then(({ response }) => {
          if (response.body.length === 0) {
            this.skip();
          }
        });
      });

      it('detail button click should load details GDPR page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('gDPR');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', gDPRPageUrlPattern);
      });
    });
  });
});
