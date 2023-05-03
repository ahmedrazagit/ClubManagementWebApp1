import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IPost } from 'app/shared/model/post.model';
import { getEntity, updateEntity, createEntity, reset } from './post.reducer';

export const PostUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const users = useAppSelector(state => state.userManagement.users);
  const postEntity = useAppSelector(state => state.post.entity);
  const loading = useAppSelector(state => state.post.loading);
  const updating = useAppSelector(state => state.post.updating);
  const updateSuccess = useAppSelector(state => state.post.updateSuccess);

  const handleClose = () => {
    navigate('/forum');
  };

  useEffect(() => {
    if (!isNew) {
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
    values.date = convertDateTimeToServer(values.date);

    const entity = {
      ...postEntity,
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
      ? {
          date: displayDefaultDateTime(),
        }
      : {
          ...postEntity,
          date: convertDateTimeFromServer(postEntity.date),
          user: postEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="teamprojectApp.post.home.createOrEditLabel" data-cy="PostCreateUpdateHeading">
            <Translate contentKey="teamprojectApp.post.home.createOrEditLabel">Create or edit a Post</Translate>
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
                  id="post-id"
                  style={{ display: 'none' }}
                  //label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('teamprojectApp.post.title')}
                id="post-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  minLength: { value: 10, message: translate('entity.validation.minlength', { min: 10 }) },
                }}
              />
              <ValidatedField
                label={translate('teamprojectApp.post.content')}
                id="post-content"
                name="content"
                data-cy="content"
                type="textarea"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                //label={translate('teamprojectApp.post.date')}
                id="post-date"
                name="date"
                data-cy="date"
                type="datetime-local"
                style={{ display: 'none' }}
                readonly
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedBlobField
                label={translate('teamprojectApp.post.image')}
                id="post-image"
                name="image"
                data-cy="image"
                isImage
                accept="image/*"
              />
              <ValidatedField
                label={translate('teamprojectApp.post.annoncement')}
                id="post-annoncement"
                name="annoncement"
                data-cy="annoncement"
                check
                type="checkbox"
              />
              <ValidatedField style={{ display: 'none' }} id="post-user" name="user" data-cy="user" type="select">
                <option value="" />
                {/*{users
                  ? users.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}*/}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/forum" replace color="info">
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

export default PostUpdate;
