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

describe('Clubs e2e test', () => {
  const clubsPageUrl = '/clubs';
  const clubsPageUrlPattern = new RegExp('/clubs(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const clubsSample = {
    clubname: 'Cheese Unbranded eyeballs',
    clubdescription: 'Bike Baby Operations',
    numberofmembers: 62407,
    numberofevents: 70026,
  };

  let clubs;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/clubs+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/clubs').as('postEntityRequest');
    cy.intercept('DELETE', '/api/clubs/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (clubs) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/clubs/${clubs.id}`,
      }).then(() => {
        clubs = undefined;
      });
    }
  });

  it('Clubs menu should load Clubs page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('clubs');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Clubs').should('exist');
    cy.url().should('match', clubsPageUrlPattern);
  });

  describe('Clubs page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(clubsPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Clubs page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/clubs/new$'));
        cy.getEntityCreateUpdateHeading('Clubs');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', clubsPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/clubs',
          body: clubsSample,
        }).then(({ body }) => {
          clubs = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/clubs+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/clubs?page=0&size=20>; rel="last",<http://localhost/api/clubs?page=0&size=20>; rel="first"',
              },
              body: [clubs],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(clubsPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Clubs page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('clubs');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', clubsPageUrlPattern);
      });

      it('edit button click should load edit Clubs page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Clubs');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', clubsPageUrlPattern);
      });

      it('edit button click should load edit Clubs page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Clubs');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', clubsPageUrlPattern);
      });

      it('last delete button click should delete instance of Clubs', () => {
        cy.intercept('GET', '/api/clubs/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('clubs').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', clubsPageUrlPattern);

        clubs = undefined;
      });
    });
  });

  describe('new Clubs page', () => {
    beforeEach(() => {
      cy.visit(`${clubsPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Clubs');
    });

    it('should create an instance of Clubs', () => {
      cy.get(`[data-cy="clubname"]`).type('bypass Dominican').should('have.value', 'bypass Dominican');

      cy.get(`[data-cy="clubdescription"]`).type('GamesXXXXX').should('have.value', 'GamesXXXXX');

      cy.get(`[data-cy="numberofmembers"]`).type('42490').should('have.value', '42490');

      cy.get(`[data-cy="numberofevents"]`).type('18410').should('have.value', '18410');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        clubs = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', clubsPageUrlPattern);
    });
  });
});
