import React, { useCallback, useEffect, useRef, useState } from 'react';
import './profile.scss';
import { BsFillLightbulbFill } from 'react-icons/bs';
import { FaList, FaBook, FaSchool, FaHistory, FaMoneyBill } from 'react-icons/fa';
import Edit from './Edit';
import TransactionChart from 'app/modules/profile/TransactionChart';
import SearchBar from 'app/modules/profile/SearchBar';
import SearchResultsList from 'app/modules/profile/SearchResultsList';
import axios from 'axios';
//import { UniversityUser } from '../../entities/university-user/university-user';
//import { UniversityUser } from 'app/entities/university-user/university-user';

import Speech from 'react-speech';
import { FaMusic } from 'react-icons/fa';

export const Profile = () => {
  // text-to-speech:
  const [text, setText] = useState('');

  const handleTextChange = () => {
    // Function to get all text nodes within an element
    const getTextNodes = node => {
      if (node.nodeType === Node.TEXT_NODE) {
        return [node];
      } else {
        const textNodes = [];
        const childNodes = node.childNodes;
        for (let i = 0; i < childNodes.length; i++) {
          textNodes.push(...getTextNodes(childNodes[i]));
        }
        return textNodes;
      }
    };

    // Get all text nodes within the body element
    const textNodes = getTextNodes(document.body);

    // Concatenate the text content of all the text nodes
    const pageText = textNodes.map(node => node.textContent).join('');
    setText(pageText);
  };

  //temporarily declare the user info here as variables:
  const [name, setName] = useState('John Doe');
  const [nickname, setNickname] = useState('JD');
  const [role, setRole] = useState('User');
  const [studentId, setStudentId] = useState('123456');
  const [gender, setGender] = useState('Male');
  const [birthday, setBirthday] = useState('01/01/2000');
  const [day, setDay] = useState('01');
  const [month, setMonth] = useState('01');
  const [year, setYear] = useState('2000');
  const [clubs, setClubs] = useState('No Clubs Available');
  const [uni, setUni] = useState('University of Birmingham(Dubai)');
  const [email, setEmail] = useState('1234@bham.ac.uk');
  const [balance, setBalance] = useState(0);
  /*const [user, setUser] = useState<UniversityUser>({
    name: '',
    nickName: '',
    role: '',
    studentId: '',
    gender: '',
    birthday: '',
    clubs: '',
    uni: '',
    email: '',
    balance: 0,
  });*/

  /*const fetchUserData = async () => {
    const response = await axios.get('http://localhost:8080/api/university-users'); // Update with the correct API endpoint
    setUser(response.data);
  };*/

  const [results, setResults] = useState([]);
  const labels = [
    'Name',
    'Nickname',
    'Role',
    'Student ID',
    'Gender',
    'Birthday',
    'Clubs joined',
    'Transaction Record',
    'Institution enrolled',
    'Activities History',
    'Balance',
  ];

  //toggle button for dark/light mode:
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [isSave, setSave] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const interfaceClass = isDarkMode ? 'dark-mode' : 'light-mode';

  useEffect(() => {
    document.title = 'User Profile';
    //access the data from the logged in user database;
    /*const fetchUser = async () => {
      try {
        const response = await axios.get<UniversityUser[]>('/api/university-users'); // assuming the backend API endpoint is /api/university-users
        setUser(response.data[0]); // assuming there is only one University User record in the database
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();*/
  }, []);

  //Below the three functions are used for dropdown buttons for birthday
  const handleDayChange = event => {
    setDay(event.target.value);
    setBirthday(`${event.target.value}/${month}/${year}`);
  };

  const handleMonthChange = event => {
    setMonth(event.target.value);
    setBirthday(`${day}/${event.target.value}/${year}`);
  };

  const handleYearChange = event => {
    setYear(event.target.value);
    setBirthday(`${day}/${month}/${event.target.value}`);
  };

  const handleEdit = useCallback(() => {
    setEdit(!isEdit);
  }, [isEdit]);

  const handleSave = useCallback(() => {
    setSave(true);
    setEdit(false); // reset isEdit state to false
    setSave(false);
  }, [isSave]);

  const [imgSrc, setImgSrc] = useState('/content/images/user-logo.jpg');
  const fileInput = useRef(null);

  const handleImageClick = () => {
    fileInput.current.click();
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
      setImgSrc(event.target.result.toString());
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`user-profile ${interfaceClass}`}>
      <div className="toggle-mode" onClick={toggleDarkMode}>
        <BsFillLightbulbFill className={`${isDarkMode ? 'icon-light' : 'icon-dark'}`} />
        {/*{isDarkMode ? 'Light Mode' : 'Dark Mode'}*/}
      </div>

      <label htmlFor="profile-picture">
        <img
          src={imgSrc}
          alt="User Profile"
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            margin: '10px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            cursor: 'pointer',
          }}
          onClick={handleImageClick}
        />
      </label>

      <input type="file" id="profile-picture" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
      {/*<button onClick={()=>{convertTextToSpeech(user.name)}} style={{position: "fixed", top: 0, left: 0}}>Read Profile</button>*/}
      <button
        onClick={handleTextChange}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '10px',
          backgroundColor: '#fff',
          border: 'none',
          borderRadius: '50%',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
        }}
      >
        <FaMusic />
        <Speech text={text} voice="Google US English" rate="0.8" pitch="1" />
      </button>
      <h1 style={{ textAlign: 'left', fontWeight: 'bold' }}>Profile Page</h1>

      <div className="search">
        <div className="search-bar">
          <SearchBar setResults={setResults} labels={labels} />
          {results && results.length > 0 && <SearchResultsList results={results} />}
        </div>
      </div>

      <div className="basic-info">
        <h1>Basic Info</h1>
        <div className="info-row">
          <div className="info-label">Name:</div>
          <div className="info-value">{name}</div>
          <div className="info-label">Email: </div>
          <div className="info-value">{email}</div>
          <div className="info-label">Nickname:</div>
          <div className="info-value">{nickname}</div>
          <div className="info-label">Role:</div>
          <div className="info-value">{role}</div>
        </div>
        <div className="info-row">
          <div className="info-label">Student ID:</div>
          <div className="info-value">{studentId}</div>
          <div className="info-label">Gender:</div>
          <div className="info-value">{gender}</div>
          <div className="info-label">Birthday:</div>
          <div className="info-value">
            <span>{birthday}</span>
            <div className="dropdown">
              <select value={day} onChange={handleDayChange}>
                {Array.from({ length: 31 }, (_, i) => i + 1).map(days => (
                  <option key={days} value={days.toString().padStart(2, '0')}>
                    {days.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
              <select value={month} onChange={handleMonthChange}>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(months => (
                  <option key={months} value={months.toString().padStart(2, '0')}>
                    {months.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
              <select value={year} onChange={handleYearChange}>
                {Array.from({ length: 70 }, (_, i) => i + 1950).map(years => (
                  <option key={years} value={years}>
                    {years}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="more-about-me">
        <h1>More about me</h1>
        <div className="info-column">
          <div className="info-row">
            <div className="info-label">
              {' '}
              <FaBook /> Clubs joined:
            </div>
            <div className="info-value">{clubs}</div>

            <div className="info-label">
              {/*} <h2 style={{
                fontWeight: "bold",
                fontSize: "px",
                marginRight: "auto",
                marginTop: "20px",
                marginBottom: "10px"
              }}>Transaction Record</h2>*/}
              <FaList />
              Transaction Record
            </div>
            <div
              style={{
                width: '90%',
                height: '500px',
                border: '1px solid #ccc',
                borderRadius: '20px',
                padding: '10px',
                margin: '0 auto',
              }}
            >
              {/* Transaction line chart goes here */}
              <TransactionChart />
            </div>
          </div>
          <div className="info-row">
            <div className="info-label">
              {' '}
              <FaSchool /> Institution enrolled:
            </div>
            <div className="info-value">{uni}</div>
          </div>
          <div className="info-row">
            <div className="info-label">
              {' '}
              <FaHistory /> Activities History:
            </div>
            <div className="info-value">Activity 1, Activity 2</div>
          </div>
          <div className="info-row">
            <div className="info-label">
              {' '}
              <FaMoneyBill /> Balance:
            </div>
            <div className="info-value">
              <span>$</span>
              {balance}
            </div>
          </div>

          <div className="info-row">
            <button className="edit-button" onClick={handleEdit}>
              Edit
            </button>
            <button className="save-button" onClick={handleSave}>
              Save
            </button>

            {isEdit ? (
              isSave ? (
                <span
                  style={{
                    paddingTop: '10px',
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    color: 'black',
                    fontSize: '18px',
                    margin: '10px 0',
                  }}
                >
                  Click to Edit
                </span>
              ) : (
                <Edit
                  setName={setName}
                  setNickname={setNickname}
                  setRole={setRole}
                  setStudentId={setStudentId}
                  setGender={setGender}
                  setClubs={setClubs}
                  setUni={setUni}
                  setEmail={setEmail}
                />
              )
            ) : (
              <span
                style={{ paddingTop: '10px', fontStyle: 'italic', fontWeight: 'bold', color: 'black', fontSize: '18px', margin: '10px 0' }}
              >
                Click to Edit & Save
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
