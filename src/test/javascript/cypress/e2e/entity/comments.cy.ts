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

describe('Comments e2e test', () => {
  const commentsPageUrl = '/comments';
  const commentsPageUrlPattern = new RegExp('/comments(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const commentsSample = { comment: 'Li4vZmFrZS1kYXRhL2Jsb2IvaGlwc3Rlci50eHQ=' };

  let comments;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/comments+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/comments').as('postEntityRequest');
    cy.intercept('DELETE', '/api/comments/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (comments) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/comments/${comments.id}`,
      }).then(() => {
        comments = undefined;
      });
    }
  });

  it('Comments menu should load Comments page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('comments');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Comments').should('exist');
    cy.url().should('match', commentsPageUrlPattern);
  });

  describe('Comments page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(commentsPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Comments page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/comments/new$'));
        cy.getEntityCreateUpdateHeading('Comments');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commentsPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/comments',
          body: commentsSample,
        }).then(({ body }) => {
          comments = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/comments+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [comments],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(commentsPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Comments page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('comments');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commentsPageUrlPattern);
      });

      it('edit button click should load edit Comments page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Comments');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commentsPageUrlPattern);
      });

      it('edit button click should load edit Comments page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Comments');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commentsPageUrlPattern);
      });

      it('last delete button click should delete instance of Comments', () => {
        cy.intercept('GET', '/api/comments/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('comments').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commentsPageUrlPattern);

        comments = undefined;
      });
    });
  });

  describe('new Comments page', () => {
    beforeEach(() => {
      cy.visit(`${commentsPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Comments');
    });

    it('should create an instance of Comments', () => {
      cy.get(`[data-cy="comment"]`)
        .type('../fake-data/blob/hipster.txt')
        .invoke('val')
        .should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        comments = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', commentsPageUrlPattern);
    });
  });
});
