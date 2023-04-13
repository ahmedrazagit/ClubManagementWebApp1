import event from 'app/entities/event/event.reducer';
import gDPR from 'app/entities/gdpr/gdpr.reducer';
import extendEvent from 'app/entities/extend-event/extend-event.reducer';
import clubs from 'app/entities/clubs/clubs.reducer';
import post from 'app/entities/post/post.reducer';
import comments from 'app/entities/comments/comments.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  event,
  gDPR,
  extendEvent,
  clubs,
  post,
  comments,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
