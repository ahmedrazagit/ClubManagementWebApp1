import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './uni-user.reducer';

export const UniUserDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const uniUserEntity = useAppSelector(state => state.uniUser.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="uniUserDetailsHeading">
          <Translate contentKey="teamprojectApp.uniUser.detail.title">UniUser</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{uniUserEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="teamprojectApp.uniUser.name">Name</Translate>
            </span>
          </dt>
          <dd>{uniUserEntity.name}</dd>
          <dt>
            <span id="nickname">
              <Translate contentKey="teamprojectApp.uniUser.nickname">Nickname</Translate>
            </span>
          </dt>
          <dd>{uniUserEntity.nickname}</dd>
          <dt>
            <span id="role">
              <Translate contentKey="teamprojectApp.uniUser.role">Role</Translate>
            </span>
          </dt>
          <dd>{uniUserEntity.role}</dd>
          <dt>
            <span id="studentId">
              <Translate contentKey="teamprojectApp.uniUser.studentId">Student Id</Translate>
            </span>
          </dt>
          <dd>{uniUserEntity.studentId}</dd>
          <dt>
            <span id="gender">
              <Translate contentKey="teamprojectApp.uniUser.gender">Gender</Translate>
            </span>
          </dt>
          <dd>{uniUserEntity.gender}</dd>
          <dt>
            <span id="birthday">
              <Translate contentKey="teamprojectApp.uniUser.birthday">Birthday</Translate>
            </span>
          </dt>
          <dd>{uniUserEntity.birthday ? <TextFormat value={uniUserEntity.birthday} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="clubs">
              <Translate contentKey="teamprojectApp.uniUser.clubs">Clubs</Translate>
            </span>
          </dt>
          <dd>{uniUserEntity.clubs}</dd>
          <dt>
            <span id="uni">
              <Translate contentKey="teamprojectApp.uniUser.uni">Uni</Translate>
            </span>
          </dt>
          <dd>{uniUserEntity.uni}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="teamprojectApp.uniUser.email">Email</Translate>
            </span>
          </dt>
          <dd>{uniUserEntity.email}</dd>
          <dt>
            <span id="balance">
              <Translate contentKey="teamprojectApp.uniUser.balance">Balance</Translate>
            </span>
          </dt>
          <dd>{uniUserEntity.balance}</dd>
        </dl>
        <Button tag={Link} to="/uni-user" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/uni-user/${uniUserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UniUserDetail;
