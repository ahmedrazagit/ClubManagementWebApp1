import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { getSortState, setFileData, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IExtendClub } from 'app/shared/model/extend-club.model';

import { getEntities } from 'app/entities/extend-club/extend-club.reducer';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import TodoList from 'app/modules/clubs/components/TodoList';

export const ExtendClub = () => {
  const dispatch = useAppDispatch();
  const extendClubList = useAppSelector(state => state.extendClub.entities);
  const loading = useAppSelector(state => state.extendClub.loading);

  const [searchText, setSearchText] = useState('');
  const [selectedClub, setSelectedClub] = useState(null);

  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

  const currentUser = useAppSelector(state => state.authentication.account);

  const isCurrentUserExtendClub = extendClub => {
    if (isAuthenticated && currentUser) {
      if (currentUser.authorities.includes('admin')) {
        return true; // admin can edit and delete all clubs
      } else if (extendClub.user && extendClub.user.login === currentUser.login) {
        return true; // user can only edit and delete their own clubs
      }
    }
    return false;
  };

  const handleSearchInputChange = event => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    dispatch(getEntities(filteredClubsList));
  }, []);

  useEffect(() => {
    const filteredList = extendClubList.filter(entity => {
      const nameMatch = entity.clubname.toLowerCase().includes(searchText.toLowerCase());
      const universityMatch = entity.university.toLowerCase().includes(searchText.toLowerCase());
      return nameMatch || universityMatch;
    });
    setFilteredClubsList(filteredList);
  }, [extendClubList, searchText]);

  const [filteredClubsList, setFilteredClubsList] = useState(extendClubList);

  const handleViewClick = club => {
    setSelectedClub(club);
  };

  return (
    <div>
      <div className="clubs-box" style={{ background: 'linear-gradient(45deg, #ffb6c1, #87ceeb)' }}>
        <div className="club-section-text-container">
          <h2 id="extend-club-heading" data-cy="ExtendClubHeading" style={{ fontSize: '60px', color: 'white' }}>
            Discover all Clubs and Societies!
          </h2>
        </div>

        <div className="d-flex justify-content-end">
          <div className="search-bar" style={{ margin: '7px', border: '1px' }}>
            <input type="text" placeholder="Search" value={searchText} onChange={handleSearchInputChange} />
          </div>
        </div>
        <Button className="me-2" color="info" onClick={() => dispatch(getEntities(filteredClubsList))} disabled={loading}>
          <FontAwesomeIcon icon="sync" spin={loading} />{' '}
          <Translate contentKey="teamprojectApp.extendClub.home.refreshListLabel">Refresh List</Translate>
        </Button>
        <Link to="/extend-club/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="teamprojectApp.extendClub.home.createLabel">Create new Extend Club</Translate>
        </Link>

        <div className="row">
          <div className="col-9">
            <div className="table-responsive">
              <Table responsive className="table">
                <thead className="table">
                  <tr className="table">
                    <th className="table">
                      <Translate contentKey="teamprojectApp.extendClub.clubname">Clubname</Translate>
                    </th>
                    <th className="table">
                      <Translate contentKey="teamprojectApp.extendClub.university">University</Translate>
                    </th>
                    <th className="table"></th>
                  </tr>
                </thead>
                <tbody className="table">
                  {filteredClubsList.map((extendClub, i) => (
                    <tr key={`entity-${i}`} data-cy="entityTable" className="table">
                      <td className="table" style={{ color: 'red' }}>
                        <button
                          type="button"
                          className="btn btn-link"
                          onClick={() => setSelectedClub(extendClub)}
                          style={{ fontSize: '17px' }}
                        >
                          {extendClub.clubname}
                        </button>
                      </td>
                      <td className="table" style={{ fontSize: '17px' }}>
                        {extendClub.university}
                      </td>
                      <td className="text-right table">
                        <div className="btn-group flex-btn-group-container">
                          {isCurrentUserExtendClub(extendClub) && (
                            <>
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
                            </>
                          )}
                          {/*}   <Button
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
                                <
        <Translate contentKey="entity.action.delete">Delete</Translate>
      </span>
                            </Button>
                          </>
                        )}
                        {/*}   <Button
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
                        </Button>  */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
          <div className="col-3">
            {selectedClub && (
              <div className="transparent-box">
                <h3 style={{ fontSize: '20px' }}>{selectedClub.clubname}</h3>
                <p style={{ fontSize: '20px' }}>University: {selectedClub.university}</p>
                <p style={{ fontSize: '20px' }}>Club description: {selectedClub.clubdescription}</p>
                <p style={{ fontSize: '20px' }}>Number of members: {selectedClub.numberofmembers}</p>
                <p style={{ fontSize: '20px' }}>Number of events: {selectedClub.events}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtendClub;
