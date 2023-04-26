import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUniversityUser } from 'app/shared/model/university-user.model';
import { getEntity, updateEntity, createEntity, reset } from './university-user.reducer';

export const UniversityUserUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const universityUserEntity = useAppSelector(state => state.universityUser.entity);
  const loading = useAppSelector(state => state.universityUser.loading);
  const updating = useAppSelector(state => state.universityUser.updating);
  const updateSuccess = useAppSelector(state => state.universityUser.updateSuccess);

  const handleClose = () => {
    navigate('/university-user');
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
      ...universityUserEntity,
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
          ...universityUserEntity,
          birthday: convertDateTimeFromServer(universityUserEntity.birthday),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="teamprojectApp.universityUser.home.createOrEditLabel" data-cy="UniversityUserCreateUpdateHeading">
            <Translate contentKey="teamprojectApp.universityUser.home.createOrEditLabel">Create or edit a UniversityUser</Translate>
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
                  id="university-user-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('teamprojectApp.universityUser.name')}
                id="university-user-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  minLength: { value: 3, message: translate('entity.validation.minlength', { min: 3 }) },
                }}
              />
              <ValidatedField
                label={translate('teamprojectApp.universityUser.nickname')}
                id="university-user-nickname"
                name="nickname"
                data-cy="nickname"
                type="text"
              />
              <ValidatedField
                label={translate('teamprojectApp.universityUser.role')}
                id="university-user-role"
                name="role"
                data-cy="role"
                type="text"
              />
              <ValidatedField
                label={translate('teamprojectApp.universityUser.studentId')}
                id="university-user-studentId"
                name="studentId"
                data-cy="studentId"
                type="text"
              />
              <ValidatedField
                label={translate('teamprojectApp.universityUser.gender')}
                id="university-user-gender"
                name="gender"
                data-cy="gender"
                type="text"
              />
              <ValidatedField
                label={translate('teamprojectApp.universityUser.birthday')}
                id="university-user-birthday"
                name="birthday"
                data-cy="birthday"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('teamprojectApp.universityUser.clubs')}
                id="university-user-clubs"
                name="clubs"
                data-cy="clubs"
                type="text"
              />
              <ValidatedField
                label={translate('teamprojectApp.universityUser.uni')}
                id="university-user-uni"
                name="uni"
                data-cy="uni"
                type="text"
              />
              <ValidatedField
                label={translate('teamprojectApp.universityUser.email')}
                id="university-user-email"
                name="email"
                data-cy="email"
                type="text"
              />
              <ValidatedField
                label={translate('teamprojectApp.universityUser.balance')}
                id="university-user-balance"
                name="balance"
                data-cy="balance"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/university-user" replace color="info">
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

export default UniversityUserUpdate;
