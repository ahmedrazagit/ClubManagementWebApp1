import event from 'app/entities/event/event.reducer';
import gDPR from 'app/entities/gdpr/gdpr.reducer';
import extendEvent from 'app/entities/extend-event/extend-event.reducer';
import clubs from 'app/entities/clubs/clubs.reducer';
import post from 'app/entities/post/post.reducer';

import comments from 'app/entities/comments/comments.reducer';

import universityUser from 'app/entities/university-user/university-user.reducer';
import uniUser from 'app/entities/uni-user/uni-user.reducer';

import extendClub from 'app/entities/extend-club/extend-club.reducer';
import extendedEvents from 'app/entities/extended-events/extended-events.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  event,
  gDPR,
  extendEvent,
  clubs,
  post,

  comments,

  universityUser,
  uniUser,

  extendClub,
  extendedEvents,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
