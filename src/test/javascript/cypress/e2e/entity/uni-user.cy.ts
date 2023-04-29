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

describe('UniUser e2e test', () => {
  const uniUserPageUrl = '/uni-user';
  const uniUserPageUrlPattern = new RegExp('/uni-user(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const uniUserSample = {};

  let uniUser;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/uni-users+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/uni-users').as('postEntityRequest');
    cy.intercept('DELETE', '/api/uni-users/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (uniUser) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/uni-users/${uniUser.id}`,
      }).then(() => {
        uniUser = undefined;
      });
    }
  });

  it('UniUsers menu should load UniUsers page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('uni-user');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('UniUser').should('exist');
    cy.url().should('match', uniUserPageUrlPattern);
  });

  describe('UniUser page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(uniUserPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create UniUser page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/uni-user/new$'));
        cy.getEntityCreateUpdateHeading('UniUser');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', uniUserPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/uni-users',
          body: uniUserSample,
        }).then(({ body }) => {
          uniUser = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/uni-users+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [uniUser],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(uniUserPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details UniUser page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('uniUser');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', uniUserPageUrlPattern);
      });

      it('edit button click should load edit UniUser page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('UniUser');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', uniUserPageUrlPattern);
      });

      it('edit button click should load edit UniUser page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('UniUser');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', uniUserPageUrlPattern);
      });

      it('last delete button click should delete instance of UniUser', () => {
        cy.intercept('GET', '/api/uni-users/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('uniUser').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', uniUserPageUrlPattern);

        uniUser = undefined;
      });
    });
  });

  describe('new UniUser page', () => {
    beforeEach(() => {
      cy.visit(`${uniUserPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('UniUser');
    });

    it('should create an instance of UniUser', () => {
      cy.get(`[data-cy="name"]`).type('Liaison').should('have.value', 'Liaison');

      cy.get(`[data-cy="nickname"]`).type('compressing Fantastic').should('have.value', 'compressing Fantastic');

      cy.get(`[data-cy="role"]`).type('applications').should('have.value', 'applications');

      cy.get(`[data-cy="studentId"]`).type('the haptic aggregate').should('have.value', 'the haptic aggregate');

      cy.get(`[data-cy="gender"]`).type('redundant synthesize').should('have.value', 'redundant synthesize');

      cy.get(`[data-cy="birthday"]`).type('2023-04-25T20:35').blur().should('have.value', '2023-04-25T20:35');

      cy.get(`[data-cy="clubs"]`).type('Movies').should('have.value', 'Movies');

      cy.get(`[data-cy="uni"]`).type('Centralized synergize').should('have.value', 'Centralized synergize');

      cy.get(`[data-cy="email"]`).type('Cassidy_Roberts@gmail.com').should('have.value', 'Cassidy_Roberts@gmail.com');

      cy.get(`[data-cy="balance"]`).type('40629').should('have.value', '40629');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        uniUser = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', uniUserPageUrlPattern);
    });
  });
});
