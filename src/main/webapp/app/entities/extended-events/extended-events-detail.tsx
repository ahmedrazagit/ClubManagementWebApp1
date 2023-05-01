import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './extended-events.reducer';

export const ExtendedEventsDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const extendedEventsEntity = useAppSelector(state => state.extendedEvents.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="extendedEventsDetailsHeading">
          <Translate contentKey="teamprojectApp.extendedEvents.detail.title">ExtendedEvents</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{extendedEventsEntity.id}</dd>
          <dt>
            <span id="event">
              <Translate contentKey="teamprojectApp.extendedEvents.event">Event</Translate>
            </span>
          </dt>
          <dd>{extendedEventsEntity.event}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="teamprojectApp.extendedEvents.date">Date</Translate>
            </span>
          </dt>
          <dd>
            {extendedEventsEntity.date ? <TextFormat value={extendedEventsEntity.date} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="location">
              <Translate contentKey="teamprojectApp.extendedEvents.location">Location</Translate>
            </span>
          </dt>
          <dd>{extendedEventsEntity.location}</dd>
          <dt>
            <span id="eventdescription">
              <Translate contentKey="teamprojectApp.extendedEvents.eventdescription">Eventdescription</Translate>
            </span>
          </dt>
          <dd>{extendedEventsEntity.eventdescription}</dd>
          <dt>
            <span id="category">
              <Translate contentKey="teamprojectApp.extendedEvents.category">Category</Translate>
            </span>
          </dt>
          <dd>{extendedEventsEntity.category}</dd>
          <dt>
            <Translate contentKey="teamprojectApp.extendedEvents.club">Club</Translate>
          </dt>
          <dd>{extendedEventsEntity.club ? extendedEventsEntity.club.clubname : ''}</dd>
          <dt>
            <Translate contentKey="teamprojectApp.extendedEvents.user">User</Translate>
          </dt>
          <dd>{extendedEventsEntity.user ? extendedEventsEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/extended-events" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/extended-events/${extendedEventsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ExtendedEventsDetail;
