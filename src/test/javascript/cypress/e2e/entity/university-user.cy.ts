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

describe('UniversityUser e2e test', () => {
  const universityUserPageUrl = '/university-user';
  const universityUserPageUrlPattern = new RegExp('/university-user(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const universityUserSample = {};

  let universityUser;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/university-users+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/university-users').as('postEntityRequest');
    cy.intercept('DELETE', '/api/university-users/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (universityUser) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/university-users/${universityUser.id}`,
      }).then(() => {
        universityUser = undefined;
      });
    }
  });

  it('UniversityUsers menu should load UniversityUsers page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('university-user');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('UniversityUser').should('exist');
    cy.url().should('match', universityUserPageUrlPattern);
  });

  describe('UniversityUser page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(universityUserPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create UniversityUser page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/university-user/new$'));
        cy.getEntityCreateUpdateHeading('UniversityUser');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', universityUserPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/university-users',
          body: universityUserSample,
        }).then(({ body }) => {
          universityUser = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/university-users+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [universityUser],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(universityUserPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details UniversityUser page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('universityUser');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', universityUserPageUrlPattern);
      });

      it('edit button click should load edit UniversityUser page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('UniversityUser');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', universityUserPageUrlPattern);
      });

      it('edit button click should load edit UniversityUser page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('UniversityUser');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', universityUserPageUrlPattern);
      });

      it('last delete button click should delete instance of UniversityUser', () => {
        cy.intercept('GET', '/api/university-users/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('universityUser').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', universityUserPageUrlPattern);

        universityUser = undefined;
      });
    });
  });

  describe('new UniversityUser page', () => {
    beforeEach(() => {
      cy.visit(`${universityUserPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('UniversityUser');
    });

    it('should create an instance of UniversityUser', () => {
      cy.get(`[data-cy="name"]`).type('Tanzanian').should('have.value', 'Tanzanian');

      cy.get(`[data-cy="nickname"]`).type('discrete Andorra').should('have.value', 'discrete Andorra');

      cy.get(`[data-cy="role"]`).type('object-oriented').should('have.value', 'object-oriented');

      cy.get(`[data-cy="studentId"]`)
        .type('Directives synthesize Administrator')
        .should('have.value', 'Directives synthesize Administrator');

      cy.get(`[data-cy="gender"]`).type('intuitive Tuna').should('have.value', 'intuitive Tuna');

      cy.get(`[data-cy="birthday"]`).type('2023-04-26T00:54').blur().should('have.value', '2023-04-26T00:54');

      cy.get(`[data-cy="clubs"]`).type('connecting overriding drive').should('have.value', 'connecting overriding drive');

      cy.get(`[data-cy="uni"]`).type('compress Street Usability').should('have.value', 'compress Street Usability');

      cy.get(`[data-cy="email"]`).type('Mabel_Steuber@gmail.com').should('have.value', 'Mabel_Steuber@gmail.com');

      cy.get(`[data-cy="balance"]`).type('1521').should('have.value', '1521');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        universityUser = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', universityUserPageUrlPattern);
    });
  });
});
