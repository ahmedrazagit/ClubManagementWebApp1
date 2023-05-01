import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './extend-club.reducer';

export const ExtendClubDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const extendClubEntity = useAppSelector(state => state.extendClub.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="extendClubDetailsHeading">
          <Translate contentKey="teamprojectApp.extendClub.detail.title">ExtendClub</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{extendClubEntity.id}</dd>
          <dt>
            <span id="clubname">
              <Translate contentKey="teamprojectApp.extendClub.clubname">Clubname</Translate>
            </span>
          </dt>
          <dd>{extendClubEntity.clubname}</dd>
          <dt>
            <span id="clubdescription">
              <Translate contentKey="teamprojectApp.extendClub.clubdescription">Clubdescription</Translate>
            </span>
          </dt>
          <dd>{extendClubEntity.clubdescription}</dd>
          <dt>
            <span id="numberofmembers">
              <Translate contentKey="teamprojectApp.extendClub.numberofmembers">Numberofmembers</Translate>
            </span>
          </dt>
          <dd>{extendClubEntity.numberofmembers}</dd>
          <dt>
            <span id="numberofevents">
              <Translate contentKey="teamprojectApp.extendClub.numberofevents">Numberofevents</Translate>
            </span>
          </dt>
          <dd>{extendClubEntity.numberofevents}</dd>
          <dt>
            <span id="university">
              <Translate contentKey="teamprojectApp.extendClub.university">University</Translate>
            </span>
          </dt>
          <dd>{extendClubEntity.university}</dd>
          <dt>
            <Translate contentKey="teamprojectApp.extendClub.user">User</Translate>
          </dt>
          <dd>{extendClubEntity.user ? extendClubEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/extend-club" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/extend-club/${extendClubEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ExtendClubDetail;
