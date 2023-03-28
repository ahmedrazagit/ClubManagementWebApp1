import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './clubs.reducer';

export const ClubsDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const clubsEntity = useAppSelector(state => state.clubs.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="clubsDetailsHeading">
          <Translate contentKey="teamprojectApp.clubs.detail.title">Clubs</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{clubsEntity.id}</dd>
          <dt>
            <span id="clubname">
              <Translate contentKey="teamprojectApp.clubs.clubname">Clubname</Translate>
            </span>
          </dt>
          <dd>{clubsEntity.clubname}</dd>
          <dt>
            <span id="clubdescription">
              <Translate contentKey="teamprojectApp.clubs.clubdescription">Clubdescription</Translate>
            </span>
          </dt>
          <dd>{clubsEntity.clubdescription}</dd>
          <dt>
            <span id="numberofmembers">
              <Translate contentKey="teamprojectApp.clubs.numberofmembers">Numberofmembers</Translate>
            </span>
          </dt>
          <dd>{clubsEntity.numberofmembers}</dd>
          <dt>
            <span id="numberofevents">
              <Translate contentKey="teamprojectApp.clubs.numberofevents">Numberofevents</Translate>
            </span>
          </dt>
          <dd>{clubsEntity.numberofevents}</dd>
        </dl>
        <Button tag={Link} to="/clubs" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/clubs/${clubsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ClubsDetail;
