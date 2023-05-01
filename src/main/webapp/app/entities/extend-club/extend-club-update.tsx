import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IExtendClub } from 'app/shared/model/extend-club.model';
import { getEntity, updateEntity, createEntity, reset } from './extend-club.reducer';
import axios from 'axios';
export const ExtendClubUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const extendClubEntity = useAppSelector(state => state.extendClub.entity);
  const loading = useAppSelector(state => state.extendClub.loading);
  const updating = useAppSelector(state => state.extendClub.updating);
  const updateSuccess = useAppSelector(state => state.extendClub.updateSuccess);

  const handleClose = () => {
    navigate('/extend-club');
  };

  const clubId = 1; // Replace with the actual club ID
  const eventCountUrl = `/api/clubs/${clubId}/events/count`;

  let eventCount = 0;

  axios
    .get(eventCountUrl)
    .then(response => {
      eventCount = response.data;
      // Do something with the event count, such as displaying it on the page
    })
    .catch(error => {
      console.error(error);
    });

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...extendClubEntity,
      ...values,
      user: users.find(it => it.id.toString() === values.user.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...extendClubEntity,
          user: extendClubEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="teamprojectApp.extendClub.home.createOrEditLabel" data-cy="ExtendClubCreateUpdateHeading">
            <Translate contentKey="teamprojectApp.extendClub.home.createOrEditLabel">Create or edit a ExtendClub</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="extend-club-id"
                  style={{ display: 'none' }}
                  //label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('teamprojectApp.extendClub.clubname')}
                id="extend-club-clubname"
                name="clubname"
                data-cy="clubname"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 5, message: translate('entity.validation.minlength', { min: 5 }) },
                  maxLength: { value: 30, message: translate('entity.validation.maxlength', { max: 30 }) },
                }}
              />
              <ValidatedField
                label={translate('teamprojectApp.extendClub.clubdescription')}
                id="extend-club-clubdescription"
                name="clubdescription"
                data-cy="clubdescription"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 10, message: translate('entity.validation.minlength', { min: 10 }) },
                  maxLength: { value: 600, message: translate('entity.validation.maxlength', { max: 600 }) },
                }}
              />
              <ValidatedField
                label={translate('teamprojectApp.extendClub.numberofmembers')}
                id="extend-club-numberofmembers"
                name="numberofmembers"
                data-cy="numberofmembers"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('teamprojectApp.extendClub.numberofevents')}
                id="extend-club-numberofevents"
                name="numberofevents"
                data-cy="numberofevents"
                type="text"
                readonly
                value={eventCount}
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('teamprojectApp.extendClub.university')}
                id="extend-club-university"
                name="university"
                data-cy="university"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  pattern: { value: /.*University.*/, message: translate('entity.validation.pattern', { pattern: '.*University.*' }) },
                }}
              />
              <ValidatedField
                id="extend-club-user"
                name="user"
                data-cy="user"
                label={translate('teamprojectApp.extendClub.user')}
                type="select"
              >
                <option value="" key="0" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/extend-club" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ExtendClubUpdate;
