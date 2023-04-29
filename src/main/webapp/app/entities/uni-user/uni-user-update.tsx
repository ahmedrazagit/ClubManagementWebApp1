import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUniUser } from 'app/shared/model/uni-user.model';
import { getEntity, updateEntity, createEntity, reset } from './uni-user.reducer';

export const UniUserUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const uniUserEntity = useAppSelector(state => state.uniUser.entity);
  const loading = useAppSelector(state => state.uniUser.loading);
  const updating = useAppSelector(state => state.uniUser.updating);
  const updateSuccess = useAppSelector(state => state.uniUser.updateSuccess);

  const handleClose = () => {
    navigate('/uni-user');
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
    values.birthday = convertDateTimeToServer(values.birthday);

    const entity = {
      ...uniUserEntity,
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
          birthday: displayDefaultDateTime(),
        }
      : {
          ...uniUserEntity,
          birthday: convertDateTimeFromServer(uniUserEntity.birthday),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="teamprojectApp.uniUser.home.createOrEditLabel" data-cy="UniUserCreateUpdateHeading">
            <Translate contentKey="teamprojectApp.uniUser.home.createOrEditLabel">Create or edit a UniUser</Translate>
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
                  id="uni-user-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('teamprojectApp.uniUser.name')}
                id="uni-user-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  minLength: { value: 3, message: translate('entity.validation.minlength', { min: 3 }) },
                }}
              />
              <ValidatedField
                label={translate('teamprojectApp.uniUser.nickname')}
                id="uni-user-nickname"
                name="nickname"
                data-cy="nickname"
                type="text"
              />
              <ValidatedField label={translate('teamprojectApp.uniUser.role')} id="uni-user-role" name="role" data-cy="role" type="text" />
              <ValidatedField
                label={translate('teamprojectApp.uniUser.studentId')}
                id="uni-user-studentId"
                name="studentId"
                data-cy="studentId"
                type="text"
              />
              <ValidatedField
                label={translate('teamprojectApp.uniUser.gender')}
                id="uni-user-gender"
                name="gender"
                data-cy="gender"
                type="text"
              />
              <ValidatedField
                label={translate('teamprojectApp.uniUser.birthday')}
                id="uni-user-birthday"
                name="birthday"
                data-cy="birthday"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('teamprojectApp.uniUser.clubs')}
                id="uni-user-clubs"
                name="clubs"
                data-cy="clubs"
                type="text"
              />
              <ValidatedField label={translate('teamprojectApp.uniUser.uni')} id="uni-user-uni" name="uni" data-cy="uni" type="text" />
              <ValidatedField
                label={translate('teamprojectApp.uniUser.email')}
                id="uni-user-email"
                name="email"
                data-cy="email"
                type="text"
              />
              <ValidatedField
                label={translate('teamprojectApp.uniUser.balance')}
                id="uni-user-balance"
                name="balance"
                data-cy="balance"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/uni-user" replace color="info">
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

export default UniUserUpdate;
