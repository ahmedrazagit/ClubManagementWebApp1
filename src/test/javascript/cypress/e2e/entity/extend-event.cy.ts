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

describe('ExtendEvent e2e test', () => {
  const extendEventPageUrl = '/extend-event';
  const extendEventPageUrlPattern = new RegExp('/extend-event(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const extendEventSample = {
    eventname: 'Profound matrix',
    date: '2023-03-27T10:47:04.777Z',
    location: 'online Wooden Sleek',
    eventdescription: 'FTP ubiquitous Kentucky',
    club: 'BerkshireX',
  };

  let extendEvent;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/extend-events+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/extend-events').as('postEntityRequest');
    cy.intercept('DELETE', '/api/extend-events/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (extendEvent) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/extend-events/${extendEvent.id}`,
      }).then(() => {
        extendEvent = undefined;
      });
    }
  });

  it('ExtendEvents menu should load ExtendEvents page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('extend-event');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ExtendEvent').should('exist');
    cy.url().should('match', extendEventPageUrlPattern);
  });

  describe('ExtendEvent page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(extendEventPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ExtendEvent page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/extend-event/new$'));
        cy.getEntityCreateUpdateHeading('ExtendEvent');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', extendEventPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/extend-events',
          body: extendEventSample,
        }).then(({ body }) => {
          extendEvent = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/extend-events+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/extend-events?page=0&size=20>; rel="last",<http://localhost/api/extend-events?page=0&size=20>; rel="first"',
              },
              body: [extendEvent],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(extendEventPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ExtendEvent page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('extendEvent');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', extendEventPageUrlPattern);
      });

      it('edit button click should load edit ExtendEvent page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ExtendEvent');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', extendEventPageUrlPattern);
      });

      it('edit button click should load edit ExtendEvent page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ExtendEvent');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', extendEventPageUrlPattern);
      });

      it('last delete button click should delete instance of ExtendEvent', () => {
        cy.intercept('GET', '/api/extend-events/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('extendEvent').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', extendEventPageUrlPattern);

        extendEvent = undefined;
      });
    });
  });

  describe('new ExtendEvent page', () => {
    beforeEach(() => {
      cy.visit(`${extendEventPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ExtendEvent');
    });

    it('should create an instance of ExtendEvent', () => {
      cy.get(`[data-cy="eventname"]`).type('Albania paradigms').should('have.value', 'Albania paradigms');

      cy.get(`[data-cy="date"]`).type('2023-03-27T19:57').blur().should('have.value', '2023-03-27T19:57');

      cy.get(`[data-cy="location"]`).type('Account networks copying').should('have.value', 'Account networks copying');

      cy.get(`[data-cy="eventdescription"]`).type('Plastic transmit').should('have.value', 'Plastic transmit');

      cy.get(`[data-cy="club"]`).type('DesignerXX').should('have.value', 'DesignerXX');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        extendEvent = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', extendEventPageUrlPattern);
    });
  });
});
