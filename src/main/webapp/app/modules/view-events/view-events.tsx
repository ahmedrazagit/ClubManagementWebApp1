import './view-events.scss';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IExtendedEvents } from 'app/shared/model/extended-events.model';
import { getEntities } from 'app/entities/extended-events/extended-events.reducer';

import { getEntities as getClubEntities } from 'app/entities/extend-club/extend-club.reducer';

export const ViewEvents = () => {
  const [announcements, setAnnouncements] = useState([]);
  //const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [university, setUniversity] = useState('all');
  const [place, setPlace] = useState('all');
  const [showAddEditBox, setShowAddEditBox] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    university: '',
    place: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [announcementToEdit, setAnnouncementToEdit] = useState(null);

  useEffect(() => {
    document.title = 'Events Page';
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = () => {
    // Replace this with your own API call or data source
    const mockAnnouncements = [];
    setAnnouncements(mockAnnouncements);
  };

  //const handleCategoryChange = event => {
  //  const value = event.target.value;
  //  setCategory(value);
  //};

  //const handleUniversityChange = event => {
  //  setUniversity(event.target.value);
  //  console.log(universityNames);
  //};

  const handlePlaceChange = event => {
    setPlace(event.target.value);
  };

  const handleAddAnnouncement = event => {
    event.preventDefault();
    const newId = announcements.length + 1;
    const newAnnouncement = {
      id: newId,
      title: '',
      content: '',
      university: '',
      place: '',
    };
    setNewAnnouncement(newAnnouncement);
    setEditMode(false);
    setAnnouncementToEdit(null);
    setShowAddEditBox(true);
  };

  const handleEditAnnouncement = id => {
    const announcementToEdit = announcements.find(announcement => announcement.id === id);
    setAnnouncementToEdit(announcementToEdit);
    setNewAnnouncement({
      title: announcementToEdit.title,
      content: announcementToEdit.content,
      university: announcementToEdit.university,
      place: announcementToEdit.place,
    });
    setEditMode(true);
    setShowAddEditBox(true);
  };

  const handleDeleteAnnouncement = id => {
    const updatedAnnouncements = announcements.filter(announcement => announcement.id !== id);
    setAnnouncements(updatedAnnouncements);
  };

  const handleCancelEditAnnouncement = event => {
    event.preventDefault();
    setNewAnnouncement(null);
    setAnnouncementToEdit(null);
    setEditMode(false);
    setShowAddEditBox(false);
  };
  const handleEditAnnouncementInputChange = event => {
    const { name, value } = event.target;
    setAnnouncementToEdit(prevAnnouncement => ({ ...prevAnnouncement, [name]: value }));
  };
  const filteredAnnouncements = announcements.filter(announcement => {
    if (category === 'all' || announcement.category.toLowerCase() === category.toLowerCase()) {
      if (university === 'all' || announcement.university.toLowerCase() === university.toLowerCase()) {
        if (place === 'all' || announcement.place.toLowerCase() === place.toLowerCase()) {
          if (searchText === '' || announcement.title.toLowerCase().includes(searchText.toLowerCase())) {
            return true;
          }
        }
      }
    }
    return false;
  });

  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const extendedEventsList = useAppSelector(state => state.extendedEvents.entities);
  const loading = useAppSelector(state => state.extendedEvents.loading);

  const extendClubList = useAppSelector(state => state.extendClub.entities);
  const clubloading = useAppSelector(state => state.extendClub.loading);

  useEffect(() => {
    dispatch(getClubEntities({}));
  }, []);

  const handleClubSyncList = () => {
    dispatch(getClubEntities({}));
  };

  const commentsList = useAppSelector(state => state.comments.entities);
  const commentloading = useAppSelector(state => state.comments.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  //const universityNames = Array.from(new Set(extendedEventsList.map(entity => entity.university)));
  const [selectedUniversity, setSelectedUniversity] = useState('all');

  const [selectedClub, setSelectedClub] = useState('all');

  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleClubChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClub(e.target.value);
  };

  const handleUniversityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUniversity(e.target.value);
  };

  //const [searchText, setSearchText] = useState('');

  {
    /*const filteredEventsList = selectedUniversity === 'all' && selectedClub === 'all'
    ? extendedEventsList
    : extendedEventsList.filter(entity =>
      (selectedUniversity === 'all' || entity.university === selectedUniversity) ||
      (selectedClub === 'all' || (entity.club && entity.club.clubname === selectedClub))
    );*/
  }

  let [filteredEventsList, setFilteredEventsList] = useState(extendedEventsList);

  const [searchText, setSearchText] = useState('');

  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);

  const currentUser = useAppSelector(state => state.authentication.account);

  const isCurrentUserPost = post => {
    return isAuthenticated && post.user && post.user.login === currentUser.login;
  };

  useEffect(() => {
    setFilteredEventsList(extendedEventsList.filter(entity => entity.event.toLowerCase().includes(searchText.toLowerCase())));
  }, [extendedEventsList, searchText]);

  if (selectedUniversity !== 'all') {
    filteredEventsList = filteredEventsList.filter(entity => entity.club && entity.club.university === selectedUniversity);
  }

  if (selectedCategory !== 'all') {
    filteredEventsList = filteredEventsList.filter(entity => entity.category === selectedCategory);
  }

  if (selectedClub !== 'all') {
    filteredEventsList = filteredEventsList.filter(entity => entity.club && entity.club.clubname === selectedClub);
  }

  return (
    <div>
      <div className="table-responsive">
        <h2 id="extended-events-heading" data-cy="ExtendedEventsHeading">
          <h1>Events</h1>

          <div className="search-bar">
            <input type="text" placeholder="Search" value={searchText} onChange={e => setSearchText(e.target.value)} />
            {/*<select value={category} onChange={handleCategoryChange}>
                  <option value="all">All Categories</option>
                  {extendedEventsList.map((extendedEvents, i) => (
                    <option key={`entity-${i}`} value={extendedEvents.category}></option>
                    ))}
                </select>*/}

            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="all">All Categories</option>
              <option value="Fest">Fest</option>
              <option value="Culture">Culture</option>
              <option value="Dance">Dance</option>
              <option value="Other">Other</option>
            </select>

            <select value={selectedClub} onChange={handleClubChange}>
              <option value="all">All Clubs</option>
              {extendedEventsList &&
                extendedEventsList
                  .filter(extendedEvents => extendedEvents.club && extendedEvents.club.clubname) // filter out null entries
                  .reduce((uniqueClubs, extendedEvents) => {
                    const clubName = extendedEvents.club.clubname;
                    if (!uniqueClubs.includes(clubName)) {
                      uniqueClubs.push(clubName);
                    }
                    return uniqueClubs;
                  }, [])
                  .map((clubName, i) => (
                    <option key={`entity-${i}`} value={clubName}>
                      {clubName}
                    </option>
                  ))}
            </select>

            <select value={selectedUniversity} onChange={handleUniversityChange}>
              <option value="all">All Universities</option>
              {extendClubList.map((extendedClubs, i) => (
                <option key={`entity-${i}`} value={extendedClubs.university}>
                  {extendedClubs.university}
                </option>
              ))}
            </select>

            {/*<Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
                  <FontAwesomeIcon icon="sync" spin={loading}/>{' '}
                  <Translate contentKey="teamprojectApp.extendedEvents.home.refreshListLabel">Refresh List</Translate>
                </Button>*/}

            <Link
              to="/extended-events/new"
              className="btn btn-primary btn-sm jh-create-entity"
              id="jh-create-entity"
              data-cy="entityCreateButton"
            >
              <FontAwesomeIcon icon="plus" />
              Create New Event
            </Link>
          </div>
        </h2>
        <div className="container">
          <div className="row" style={{ gap: '25px' }}>
            {extendedEventsList && extendedEventsList.length > 0 ? (
              <>
                {/*<div className="announcement-list">*/}
                {filteredEventsList.map((extendedEvents, i) => (
                  <div
                    style={{ marginRight: '10px' }}
                    key={`entity-${i}`}
                    data-cy="entityTable"
                    className="announcement-list col-md-3 mb-4"
                  >
                    <Link to={`/extended-events/${extendedEvents.id}`}>
                      <div className="announcement-box">
                        <h2>{extendedEvents.event}</h2>
                        {isCurrentUserPost(extendedEvents) && (
                          <>
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
                          </>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </>
            ) : (
              !loading && (
                <div className="alert alert-warning">
                  <Translate contentKey="teamprojectApp.extendedEvents.home.notFound">No Extended Events found</Translate>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEvents;
