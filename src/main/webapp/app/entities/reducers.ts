import event from 'app/entities/event/event.reducer';
import gDPR from 'app/entities/gdpr/gdpr.reducer';
import extendEvent from 'app/entities/extend-event/extend-event.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  event,
  gDPR,
  extendEvent,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
