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

describe('ExtendedEvents e2e test', () => {
  const extendedEventsPageUrl = '/extended-events';
  const extendedEventsPageUrlPattern = new RegExp('/extended-events(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const extendedEventsSample = {
    event: 'ToysXXXXXX',
    date: '2023-04-30T18:45:52.122Z',
    location: 'Berkshire application',
    eventdescription: 'back-end payment',
  };

  let extendedEvents;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/extended-events+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/extended-events').as('postEntityRequest');
    cy.intercept('DELETE', '/api/extended-events/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (extendedEvents) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/extended-events/${extendedEvents.id}`,
      }).then(() => {
        extendedEvents = undefined;
      });
    }
  });

  it('ExtendedEvents menu should load ExtendedEvents page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('extended-events');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('ExtendedEvents').should('exist');
    cy.url().should('match', extendedEventsPageUrlPattern);
  });

  describe('ExtendedEvents page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(extendedEventsPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create ExtendedEvents page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/extended-events/new$'));
        cy.getEntityCreateUpdateHeading('ExtendedEvents');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', extendedEventsPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/extended-events',
          body: extendedEventsSample,
        }).then(({ body }) => {
          extendedEvents = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/extended-events+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [extendedEvents],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(extendedEventsPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details ExtendedEvents page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('extendedEvents');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', extendedEventsPageUrlPattern);
      });

      it('edit button click should load edit ExtendedEvents page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ExtendedEvents');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', extendedEventsPageUrlPattern);
      });

      it('edit button click should load edit ExtendedEvents page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('ExtendedEvents');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', extendedEventsPageUrlPattern);
      });

      it('last delete button click should delete instance of ExtendedEvents', () => {
        cy.intercept('GET', '/api/extended-events/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('extendedEvents').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', extendedEventsPageUrlPattern);

        extendedEvents = undefined;
      });
    });
  });

  describe('new ExtendedEvents page', () => {
    beforeEach(() => {
      cy.visit(`${extendedEventsPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('ExtendedEvents');
    });

    it('should create an instance of ExtendedEvents', () => {
      cy.get(`[data-cy="event"]`).type('COM matrix').should('have.value', 'COM matrix');

      cy.get(`[data-cy="date"]`).type('2023-04-30T00:18').blur().should('have.value', '2023-04-30T00:18');

      cy.get(`[data-cy="location"]`).type('incubate back-end').should('have.value', 'incubate back-end');

      cy.get(`[data-cy="eventdescription"]`).type('Ball Chicken').should('have.value', 'Ball Chicken');

      cy.get(`[data-cy="category"]`).select('Culture');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        extendedEvents = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', extendedEventsPageUrlPattern);
    });
  });
});
