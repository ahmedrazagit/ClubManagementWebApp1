import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { getSortState, setFileData, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IExtendClub } from 'app/shared/model/extend-club.model';
// @ts-ignore
import { getEntities } from 'app/entities/extend-club/extend-club.reducer';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import TodoList from 'app/modules/clubs/components/TodoList';

export const ExtendClub = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = event => {
    setSearchInput(event.target.value);
  };

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );

  const extendClubList = useAppSelector(state => state.extendClub.entities);
  const loading = useAppSelector(state => state.extendClub.loading);
  const totalItems = useAppSelector(state => state.extendClub.totalItems);

  const sortEntities = () => {
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}&search=${searchInput}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
  };

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
        search: searchInput,
      })
    );
  };

  const [selectedClub, setSelectedClub] = useState(null);

  const handleClick = extendClub => {
    setSelectedClub(extendClub);
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      // @ts-ignore
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [location.search, paginationState]);

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort, searchInput]);

  return (
    <div>
      <div className="clubs-box">
        <div className="todo-app">
          <TodoList />
        </div>
        <h2 id="extend-club-heading" data-cy="ExtendClubHeading">
          <Translate contentKey="teamprojectApp.extendClub.home.title">Extend Clubs</Translate>
          <div className="d-flex justify-content-end">
            <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
              <FontAwesomeIcon icon="sync" spin={loading} />{' '}
              <Translate contentKey="teamprojectApp.extendClub.home.refreshListLabel">Refresh List</Translate>
            </Button>
            <Link to="/extend-club/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
              <FontAwesomeIcon icon="plus" />
              &nbsp;
              <Translate contentKey="teamprojectApp.extendClub.home.createLabel">Create new Extend Club</Translate>
            </Link>
          </div>
        </h2>

        <div className="row">
          <div className="col-9">
            <div className="table-responsive">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for club or university..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
                <button className="btn btn-outline-secondary" type="button" onClick={sortEntities}>
                  Search
                </button>
              </div>

              {extendClubList && extendClubList.length > 0 ? (
                <Table responsive>
                  <thead>
                    <tr>
                      <th className="hand" onClick={sort('clubname')}>
                        <Translate contentKey="teamprojectApp.extendClub.clubname">Clubname</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th>
                        <Translate contentKey="teamprojectApp.extendClub.university">University</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>

                  <tbody>
                    {extendClubList.map((extendClub, i) => (
                      <tr key={`entity-${i}`} data-cy="entityTable">
                        <td>
                          <button type="button" className="btn btn-link" onClick={() => handleClick(extendClub)}>
                            {extendClub.clubname}
                          </button>
                        </td>
                        <td>{extendClub.university}</td>
                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`/extend-club/${extendClub.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`/extend-club/${extendClub.id}/edit`}
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
                              to={`/extend-club/${extendClub.id}/delete`}
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
                    <Translate contentKey="teamprojectApp.extendClub.home.notFound">No Extend Clubs found</Translate>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtendClub;
