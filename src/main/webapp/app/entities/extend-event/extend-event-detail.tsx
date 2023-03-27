import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './extend-event.reducer';

export const ExtendEventDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const extendEventEntity = useAppSelector(state => state.extendEvent.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="extendEventDetailsHeading">
          <Translate contentKey="teamprojectApp.extendEvent.detail.title">ExtendEvent</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{extendEventEntity.id}</dd>
          <dt>
            <span id="eventname">
              <Translate contentKey="teamprojectApp.extendEvent.eventname">Eventname</Translate>
            </span>
          </dt>
          <dd>{extendEventEntity.eventname}</dd>
          <dt>
            <span id="date">
              <Translate contentKey="teamprojectApp.extendEvent.date">Date</Translate>
            </span>
          </dt>
          <dd>{extendEventEntity.date ? <TextFormat value={extendEventEntity.date} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="location">
              <Translate contentKey="teamprojectApp.extendEvent.location">Location</Translate>
            </span>
          </dt>
          <dd>{extendEventEntity.location}</dd>
          <dt>
            <span id="eventdescription">
              <Translate contentKey="teamprojectApp.extendEvent.eventdescription">Eventdescription</Translate>
            </span>
          </dt>
          <dd>{extendEventEntity.eventdescription}</dd>
          <dt>
            <span id="club">
              <Translate contentKey="teamprojectApp.extendEvent.club">Club</Translate>
            </span>
          </dt>
          <dd>{extendEventEntity.club}</dd>
        </dl>
        <Button tag={Link} to="/extend-event" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/extend-event/${extendEventEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ExtendEventDetail;
