import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './university-user.reducer';

export const UniversityUserDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const universityUserEntity = useAppSelector(state => state.universityUser.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="universityUserDetailsHeading">
          <Translate contentKey="teamprojectApp.universityUser.detail.title">UniversityUser</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{universityUserEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="teamprojectApp.universityUser.name">Name</Translate>
            </span>
          </dt>
          <dd>{universityUserEntity.name}</dd>
          <dt>
            <span id="nickname">
              <Translate contentKey="teamprojectApp.universityUser.nickname">Nickname</Translate>
            </span>
          </dt>
          <dd>{universityUserEntity.nickname}</dd>
          <dt>
            <span id="role">
              <Translate contentKey="teamprojectApp.universityUser.role">Role</Translate>
            </span>
          </dt>
          <dd>{universityUserEntity.role}</dd>
          <dt>
            <span id="studentId">
              <Translate contentKey="teamprojectApp.universityUser.studentId">Student Id</Translate>
            </span>
          </dt>
          <dd>{universityUserEntity.studentId}</dd>
          <dt>
            <span id="gender">
              <Translate contentKey="teamprojectApp.universityUser.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{universityUserEntity.gender}</dd>
          <dt>
            <span id="birthday">
              <Translate contentKey="teamprojectApp.universityUser.birthday">Birthday</Translate>
            </span>
          </dt>
          <dd>
            {universityUserEntity.birthday ? (
              <TextFormat value={universityUserEntity.birthday} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="clubs">
              <Translate contentKey="teamprojectApp.universityUser.clubs">Clubs</Translate>
            </span>
          </dt>
          <dd>{universityUserEntity.clubs}</dd>
          <dt>
            <span id="uni">
              <Translate contentKey="teamprojectApp.universityUser.uni">Uni</Translate>
            </span>
          </dt>
          <dd>{universityUserEntity.uni}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="teamprojectApp.universityUser.email">Email</Translate>
            </span>
          </dt>
          <dd>{universityUserEntity.email}</dd>
          <dt>
            <span id="balance">
              <Translate contentKey="teamprojectApp.universityUser.balance">Balance</Translate>
            </span>
          </dt>
          <dd>{universityUserEntity.balance}</dd>
        </dl>
        <Button tag={Link} to="/university-user" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/university-user/${universityUserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UniversityUserDetail;
