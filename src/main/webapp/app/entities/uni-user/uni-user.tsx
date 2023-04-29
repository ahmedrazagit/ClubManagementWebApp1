import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUniUser } from 'app/shared/model/uni-user.model';
import { getEntities } from './uni-user.reducer';

export const UniUser = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const uniUserList = useAppSelector(state => state.uniUser.entities);
  const loading = useAppSelector(state => state.uniUser.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="uni-user-heading" data-cy="UniUserHeading">
        <Translate contentKey="teamprojectApp.uniUser.home.title">Uni Users</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="teamprojectApp.uniUser.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/uni-user/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="teamprojectApp.uniUser.home.createLabel">Create new Uni User</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {uniUserList && uniUserList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="teamprojectApp.uniUser.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.uniUser.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.uniUser.nickname">Nickname</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.uniUser.role">Role</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.uniUser.studentId">Student Id</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.uniUser.gender">Gender</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.uniUser.birthday">Birthday</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.uniUser.clubs">Clubs</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.uniUser.uni">Uni</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.uniUser.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.uniUser.balance">Balance</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {uniUserList.map((uniUser, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/uni-user/${uniUser.id}`} color="link" size="sm">
                      {uniUser.id}
                    </Button>
                  </td>
                  <td>{uniUser.name}</td>
                  <td>{uniUser.nickname}</td>
                  <td>{uniUser.role}</td>
                  <td>{uniUser.studentId}</td>
                  <td>{uniUser.gender}</td>
                  <td>{uniUser.birthday ? <TextFormat type="date" value={uniUser.birthday} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{uniUser.clubs}</td>
                  <td>{uniUser.uni}</td>
                  <td>{uniUser.email}</td>
                  <td>{uniUser.balance}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/uni-user/${uniUser.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/uni-user/${uniUser.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/uni-user/${uniUser.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="teamprojectApp.uniUser.home.notFound">No Uni Users found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UniUser;
