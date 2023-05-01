import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('ExtendClub e2e test', () => {
  const extendClubPageUrl = '/extend-club';
  const extendClubPageUrlPattern = new RegExp('/extend-club(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const extendClubSample = {
    clubname: 'utilize Baby Romania',
    clubdescription: 'payment mint',
    numberofmembers: 99163,
    numberofevents: 76014,
    university: '@University',
  };

  let extendClub;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/extend-clubs+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/extend-clubs').as('postEntityRequest');
    cy.intercept('DELETE', '/api/extend-clubs/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (extendClub) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/extend-clubs/${extendClub.id}`,
      }).then(() => {
        extendClub = undefined;
      });
    }
  });

  it('ExtendClubs menu should load ExtendClubs page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('extend-club');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ExtendClub').should('exist');
    cy.url().should('match', extendClubPageUrlPattern);
  });

  describe('ExtendClub page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(extendClubPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ExtendClub page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/extend-club/new$'));
        cy.getEntityCreateUpdateHeading('ExtendClub');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', extendClubPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/extend-clubs',
          body: extendClubSample,
        }).then(({ body }) => {
          extendClub = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/extend-clubs+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [extendClub],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(extendClubPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ExtendClub page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('extendClub');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', extendClubPageUrlPattern);
      });

      it('edit button click should load edit ExtendClub page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ExtendClub');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', extendClubPageUrlPattern);
      });

      it('edit button click should load edit ExtendClub page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ExtendClub');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', extendClubPageUrlPattern);
      });

      it('last delete button click should delete instance of ExtendClub', () => {
        cy.intercept('GET', '/api/extend-clubs/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('extendClub').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', extendClubPageUrlPattern);

        extendClub = undefined;
      });
    });
  });

  describe('new ExtendClub page', () => {
    beforeEach(() => {
      cy.visit(`${extendClubPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ExtendClub');
    });

    it('should create an instance of ExtendClub', () => {
      cy.get(`[data-cy="clubname"]`).type('navigate networks').should('have.value', 'navigate networks');

      cy.get(`[data-cy="clubdescription"]`).type('Multi-tiered magnetic').should('have.value', 'Multi-tiered magnetic');

      cy.get(`[data-cy="numberofmembers"]`).type('8934').should('have.value', '8934');

      cy.get(`[data-cy="numberofevents"]`).type('96902').should('have.value', '96902');

      cy.get(`[data-cy="university"]`).type('University9R8.').should('have.value', 'University9R8.');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        extendClub = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', extendClubPageUrlPattern);
    });
  });
});
