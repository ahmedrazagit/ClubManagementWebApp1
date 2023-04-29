import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUniversityUser } from 'app/shared/model/university-user.model';
import { getEntities } from './university-user.reducer';

export interface UniversityUser {
  name: string;
  nickName: string;
  role: string;
  studentId: string;
  gender: string;
  birthday: string;
  clubs: string;
  uni: string;
  email: string;
  balance: number;
}

export const UniversityUser = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const universityUserList = useAppSelector(state => state.universityUser.entities);
  const loading = useAppSelector(state => state.universityUser.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="university-user-heading" data-cy="UniversityUserHeading">
        <Translate contentKey="teamprojectApp.universityUser.home.title">University Users</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="teamprojectApp.universityUser.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/university-user/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="teamprojectApp.universityUser.home.createLabel">Create new University User</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {universityUserList && universityUserList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="teamprojectApp.universityUser.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.universityUser.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.universityUser.nickname">Nickname</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.universityUser.role">Role</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.universityUser.studentId">Student Id</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.universityUser.gender">Gender</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.universityUser.birthday">Birthday</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.universityUser.clubs">Clubs</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.universityUser.uni">Uni</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.universityUser.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.universityUser.balance">Balance</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {universityUserList.map((universityUser, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/university-user/${universityUser.id}`} color="link" size="sm">
                      {universityUser.id}
                    </Button>
                  </td>
                  <td>{universityUser.name}</td>
                  <td>{universityUser.nickname}</td>
                  <td>{universityUser.role}</td>
                  <td>{universityUser.studentId}</td>
                  <td>{universityUser.gender}</td>
                  <td>
                    {universityUser.birthday ? <TextFormat type="date" value={universityUser.birthday} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{universityUser.clubs}</td>
                  <td>{universityUser.uni}</td>
                  <td>{universityUser.email}</td>
                  <td>{universityUser.balance}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/university-user/${universityUser.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/university-user/${universityUser.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/university-user/${universityUser.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
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
              <Translate contentKey="teamprojectApp.universityUser.home.notFound">No University Users found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UniversityUser;
