import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IExtendClub } from 'app/shared/model/extend-club.model';
import { getEntities as getExtendClubs } from 'app/entities/extend-club/extend-club.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IExtendedEvents } from 'app/shared/model/extended-events.model';
import { CategoryType } from 'app/shared/model/enumerations/category-type.model';
import { getEntity, updateEntity, createEntity, reset } from './extended-events.reducer';

export const ExtendedEventsUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const extendClubs = useAppSelector(state => state.extendClub.entities);
  const users = useAppSelector(state => state.userManagement.users);
  const extendedEventsEntity = useAppSelector(state => state.extendedEvents.entity);
  const loading = useAppSelector(state => state.extendedEvents.loading);
  const updating = useAppSelector(state => state.extendedEvents.updating);
  const updateSuccess = useAppSelector(state => state.extendedEvents.updateSuccess);
  const categoryTypeValues = Object.keys(CategoryType);

  const handleClose = () => {
    navigate('/events-page');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getExtendClubs({}));
    dispatch(getUsers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.date = convertDateTimeToServer(values.date);

    const entity = {
      ...extendedEventsEntity,
      ...values,
      club: extendClubs.find(it => it.id.toString() === values.club.toString()),
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
      ? {
          date: displayDefaultDateTime(),
        }
      : {
          category: 'Fest',
          ...extendedEventsEntity,
          date: convertDateTimeFromServer(extendedEventsEntity.date),
          club: extendedEventsEntity?.club?.id,
          user: extendedEventsEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="teamprojectApp.extendedEvents.home.createOrEditLabel" data-cy="ExtendedEventsCreateUpdateHeading">
            Create or Edit an Event
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
                  style={{ display: 'none' }}
                  id="extended-events-id"
                  //label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('teamprojectApp.extendedEvents.event')}
                id="extended-events-event"
                name="event"
                data-cy="event"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 10, message: translate('entity.validation.minlength', { min: 10 }) },
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                //label={translate('teamprojectApp.extendedEvents.date')}
                id="extended-events-date"
                name="date"
                data-cy="date"
                type="datetime-local"
                readOnly
                style={{ display: 'none' }}
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('teamprojectApp.extendedEvents.location')}
                id="extended-events-location"
                name="location"
                data-cy="location"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 10, message: translate('entity.validation.minlength', { min: 10 }) },
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('teamprojectApp.extendedEvents.eventdescription')}
                id="extended-events-eventdescription"
                name="eventdescription"
                data-cy="eventdescription"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 10, message: translate('entity.validation.minlength', { min: 10 }) },
                  maxLength: { value: 100, message: translate('entity.validation.maxlength', { max: 100 }) },
                }}
              />
              <ValidatedField
                label={translate('teamprojectApp.extendedEvents.category')}
                id="extended-events-category"
                name="category"
                data-cy="category"
                type="select"
              >
                {categoryTypeValues.map(categoryType => (
                  <option value={categoryType} key={categoryType}>
                    {translate('teamprojectApp.CategoryType.' + categoryType)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                id="extended-events-club"
                name="club"
                data-cy="club"
                label={translate('teamprojectApp.extendedEvents.club')}
                type="select"
              >
                {extendClubs
                  ? extendClubs.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.clubname}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="extended-events-user"
                name="user"
                data-cy="user"
                style={{ display: 'none' }}
                //label={translate('teamprojectApp.extendedEvents.user')}
                type="select"
              >
                <option value="" />
                {users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/extended-events" replace color="info">
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

export default ExtendedEventsUpdate;
