import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Row, Table } from 'reactstrap';
import { Translate, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TodoList from './components/TodoList';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IClubs } from 'app/shared/model/clubs.model';
//import { getEntities } from 'app/entities/clubs/clubs.reducer';
import { getEntities } from 'app/entities/extend-club/extend-club.reducer';
import clubs from 'app/entities/clubs/clubs';
import { match } from 'cypress/types/minimatch';

const Clubs = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(location, ITEMS_PER_PAGE, 'id'), location.search)
  );
  const totalItems = useAppSelector(state => state.clubs.totalItems);
  const loading = useAppSelector(state => state.clubs.loading);
  const clubsList = useAppSelector(state => state.clubs.entities);

  const handleClick = club => {
    setSelectedClub(club);
  };
  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      })
    );
  };

  const [selectedClub, setSelectedClub] = useState(null);

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (location.search !== endURL) {
      navigate(`${location.pathname}${endURL}`);
    }
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
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [location.search]);

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  const [searchText, setSearchText] = useState('');

  const extendClubList = useAppSelector(state => state.extendClub.entities);

  let [filteredClubsList, setFilteredClubsList] = useState(extendClubList);

  useEffect(() => {
    setFilteredClubsList(extendClubList.filter(entity => entity.clubname.toLowerCase().includes(searchText.toLowerCase())));
  }, [extendClubList, searchText]);

  return (
    <div>
      <div className="todo-app">{/*<TodoList />*/}</div>
      <h2 id="clubs-heading" data-cy="ClubsHeading">
        <Translate contentKey="teamprojectApp.clubs.home.title">Clubs</Translate>
        <div className="d-flex justify-content-end">
          <input type="text" placeholder="Search" value={searchText} onChange={e => setSearchText(e.target.value)} />
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />
            &nbsp;
            <Translate contentKey="teamprojectApp.clubs.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/clubs/new" className="btn btn-primary jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="teamprojectApp.clubs.home.createLabel">Create new Club</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        <Table responsive striped={true}>
          <thead>
            <tr>
              <th className="hand" onClick={sort('clubname')}>
                <Translate contentKey="teamprojectApp.clubs.clubname">Clubname</Translate>
                <FontAwesomeIcon icon="sort" />
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredClubsList.map((clubs, i) => (
              <tr key={`entity-${clubs.id}`} data-cy="entityTable">
                <td>{clubs.clubname}</td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button onClick={() => setSelectedClub(clubs)} color="link" size="sm">
                      <FontAwesomeIcon icon="eye" />{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.view">View</Translate>
                      </span>
                    </Button>

                    <Button
                      tag={Link}
                      to={`/clubs/${clubs.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                      color="primary"
                      size="sm"
                    >
                      <FontAwesomeIcon icon="pencil-alt" />{' '}
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.edit">Edit</Translate>
                      </span>
                    </Button>
                    <Button
                      tag={Link}
                      to={`/clubs/${clubs.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                      color="danger"
                      size="sm"
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
        <div className={filteredClubsList && filteredClubsList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </Row>
          {selectedClub && (
            <div className="container-pane">
              <h2>{selectedClub.clubname}</h2>
              <p>{selectedClub.clubdescription}</p>
              <p>{selectedClub.numberofmembers}</p>
              <p>{selectedClub.numberofevents}</p>
              {/* Add other details as needed */}
            </div>
          )}
          -
        </div>
      </div>
    </div>
  );
};
export default Clubs;
