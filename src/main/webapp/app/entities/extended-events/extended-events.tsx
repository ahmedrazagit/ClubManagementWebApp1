import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IExtendedEvents } from 'app/shared/model/extended-events.model';
import { getEntities } from './extended-events.reducer';

export const ExtendedEvents = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const extendedEventsList = useAppSelector(state => state.extendedEvents.entities);
  const loading = useAppSelector(state => state.extendedEvents.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="extended-events-heading" data-cy="ExtendedEventsHeading">
        <Translate contentKey="teamprojectApp.extendedEvents.home.title">Extended Events</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="teamprojectApp.extendedEvents.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/extended-events/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="teamprojectApp.extendedEvents.home.createLabel">Create new Extended Events</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {extendedEventsList && extendedEventsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="teamprojectApp.extendedEvents.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.extendedEvents.event">Event</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.extendedEvents.date">Date</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.extendedEvents.location">Location</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.extendedEvents.eventdescription">Eventdescription</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.extendedEvents.category">Category</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.extendedEvents.club">Club</Translate>
                </th>
                <th>
                  <Translate contentKey="teamprojectApp.extendedEvents.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {extendedEventsList.map((extendedEvents, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/extended-events/${extendedEvents.id}`} color="link" size="sm">
                      {extendedEvents.id}
                    </Button>
                  </td>
                  <td>{extendedEvents.event}</td>
                  <td>{extendedEvents.date ? <TextFormat type="date" value={extendedEvents.date} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{extendedEvents.location}</td>
                  <td>{extendedEvents.eventdescription}</td>
                  <td>
                    <Translate contentKey={`teamprojectApp.CategoryType.${extendedEvents.category}`} />
                  </td>
                  <td>
                    {extendedEvents.club ? <Link to={`/extend-club/${extendedEvents.club.id}`}>{extendedEvents.club.clubname}</Link> : ''}
                  </td>
                  <td>{extendedEvents.user ? extendedEvents.user.login : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/extended-events/${extendedEvents.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/extended-events/${extendedEvents.id}/edit`}
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
                        to={`/extended-events/${extendedEvents.id}/delete`}
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
              <Translate contentKey="teamprojectApp.extendedEvents.home.notFound">No Extended Events found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ExtendedEvents;
