import React, { useEffect, useState } from 'react';
import './view-events.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IEvent } from 'app/shared/model/event.model';
import { getEntities } from 'app/entities/event/event.reducer';

export const ViewEvent = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
    const mockAnnouncements = [
      {
        id: 1,
        title: 'Spring Festival',
        content: 'Join us for a celebration of spring!',
        category: 'Fest',
        university: 'AUD',
        place: 'Dubai',
      },
      {
        id: 2,
        title: 'Arabian Nights',
        content: 'Experience the magic of Arabian Nights!',
        category: 'Culture',
        university: 'UOB',
        place: 'Dubai',
      },
      {
        id: 3,
        title: 'Bollywood Dance Workshop',
        content: 'Learn some of the hottest Bollywood moves!',
        category: 'Dance',
        university: 'BITS',
        place: 'Dubai',
      },
      {
        id: 4,
        title: 'Dance Battle',
        content: 'Showcase your moves!',
        category: 'Dance',
        university: 'Skyline University',
        place: 'Sharjah',
      },
      {
        id: 5,
        title: 'Asian Food Fest',
        content: 'Come and discover various foods!',
        category: 'Fest',
        university: 'BITS',
        place: 'Dubai',
      },
      {
        id: 6,
        title: 'Fashion Show',
        content: 'Runway and more',
        category: 'Fest',
        university: 'BITS',
        place: 'Dubai',
      },
      {
        id: 7,
        title: 'Hip Hop Dance',
        content: 'Groove to recent hits!',
        category: 'Dance',
        university: 'UOB',
        place: 'Dubai',
      },
    ];
    setAnnouncements(mockAnnouncements);
  };

  const handleInputChange = event => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleCategoryChange = event => {
    const value = event.target.value;
    setCategory(value);
  };

  const handleUniversityChange = event => {
    setUniversity(event.target.value);
  };

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
  const handleAddNewAnnouncement = event => {
    event.preventDefault();
    const newId = announcements.length + 1;
    const newAnnouncement = {
      id: newId,
      title: prompt('Enter the event name'),
      content: prompt('Enter the description'),
      university: prompt('Enter the university name'),
      place: prompt('Enter the place'),
    };
    setAnnouncements([...announcements, newAnnouncement]);
    setNewAnnouncement(null);
    setShowAddEditBox(false);
  };
  const handleEditAnnouncementClick = id => {
    console.log('handleEditAnnouncementClick triggered');
    const announcementToEdit = announcements.find(announcement => announcement.id === id);
    console.log('announcementToEdit before:', announcementToEdit);
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
          if (searchTerm === '' || announcement.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
          }
        }
      }
    }
    return false;
  });

  {
    /*
  {
    showAddEditBox ? (
      <div className="add-edit-box">
        <h2>{editMode ? 'Edit Announcement' : 'Add Announcement'}</h2>
        <form onSubmit={editMode ? handleEditAnnouncement : handleAddAnnouncement}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newAnnouncement.title}
            onChange={event => setNewAnnouncement({ ...newAnnouncement, title: event.target.value })}
          />
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={newAnnouncement.content}
            onChange={event => setNewAnnouncement({ ...newAnnouncement, content: event.target.value })}
          />
          <label htmlFor="university">University:</label>
          <input
            type="text"
            id="university"
            name="university"
            value={newAnnouncement.university}
            onChange={event => setNewAnnouncement({ ...newAnnouncement, university: event.target.value })}
          />
          <label htmlFor="place">Place:</label>
          <input
            type="text"
            id="place"
            name="place"
            value={newAnnouncement.place}
            onChange={event => setNewAnnouncement({ ...newAnnouncement, place: event.target.value })}
          />
          <button type="submit">{editMode ? 'Save Changes' : 'Add Announcement'}</button>
          <button type="button" onClick={handleCancelEditAnnouncement}>
            Cancel
          </button>
        </form>
      </div>
    ) : null;
  }*/
  }

  return (
    <div>
      <h1 style={{ textAlign: 'left' }}>Events</h1>

      <div className="search-bar">
        <input type="text" placeholder="Search" value={searchTerm} onChange={handleInputChange} />
        <select value={category} onChange={handleCategoryChange}>
          <option value="all">All Categories</option>
          <option value="Fest">Fest</option>
          <option value="Culture">Culture</option>
          <option value="Dance">Dance</option>
        </select>
        <select value={university} onChange={handleUniversityChange}>
          <option value="all">All Universities</option>
          <option value="AUD">AUD</option>
          <option value="UOB">UOB</option>
          <option value="BITS">BITS</option>
          <option value="Skyline University">Skyline University</option>
          <option value="AUS">AUS</option>
        </select>
        <select value={place} onChange={handlePlaceChange}>
          <option value="all">All Places</option>
          <option value="Dubai">Dubai</option>
          <option value="Sharjah">Sharjah</option>
        </select>
      </div>

      <div className="announcement-list">
        {filteredAnnouncements.map(announcement => (
          <Link key={announcement.id} to={`/announcements/${announcement.id}`}>
            <div className="announcement-box">
              <h2>{announcement.title}</h2>
              <p>{announcement.content}</p>
              <button className="btn btn-primary btn-sm" onClick={() => handleEditAnnouncementClick(announcement.id)}>
                Edit
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => handleDeleteAnnouncement(announcement.id)}>
                Delete
              </button>
            </div>
          </Link>
        ))}
      </div>

      <button onClick={handleAddNewAnnouncement}>Add Event</button>
    </div>
  );
};

export default ViewEvent;
