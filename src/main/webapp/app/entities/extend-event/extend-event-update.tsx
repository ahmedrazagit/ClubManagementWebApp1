import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IExtendEvent } from 'app/shared/model/extend-event.model';
import { getEntity, updateEntity, createEntity, reset } from './extend-event.reducer';

export const ExtendEventUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const extendEventEntity = useAppSelector(state => state.extendEvent.entity);
  const loading = useAppSelector(state => state.extendEvent.loading);
  const updating = useAppSelector(state => state.extendEvent.updating);
  const updateSuccess = useAppSelector(state => state.extendEvent.updateSuccess);

  const handleClose = () => {
    navigate('/extend-event' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.date = convertDateTimeToServer(values.date);

    const entity = {
      ...extendEventEntity,
      ...values,
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
          ...extendEventEntity,
          date: convertDateTimeFromServer(extendEventEntity.date),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="teamprojectApp.extendEvent.home.createOrEditLabel" data-cy="ExtendEventCreateUpdateHeading">
            <Translate contentKey="teamprojectApp.extendEvent.home.createOrEditLabel">Create or edit a ExtendEvent</Translate>
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
                  id="extend-event-id"
                  //label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('teamprojectApp.extendEvent.eventname')}
                id="extend-event-eventname"
                name="eventname"
                data-cy="eventname"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 10, message: translate('entity.validation.minlength', { min: 10 }) },
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                //label={translate('teamprojectApp.extendEvent.date')}
                id="extend-event-date"
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
                label={translate('teamprojectApp.extendEvent.location')}
                id="extend-event-location"
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
                label={translate('teamprojectApp.extendEvent.eventdescription')}
                id="extend-event-eventdescription"
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
                label={translate('teamprojectApp.extendEvent.club')}
                id="extend-event-club"
                name="club"
                data-cy="club"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 10, message: translate('entity.validation.minlength', { min: 10 }) },
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/extend-event" replace color="info">
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

export default ExtendEventUpdate;
