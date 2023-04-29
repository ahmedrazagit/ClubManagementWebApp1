import React, { useEffect, useRef, useState } from 'react';
import './profile.scss';

export interface Props {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  setRole: React.Dispatch<React.SetStateAction<string>>;
  setStudentId: React.Dispatch<React.SetStateAction<string>>;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  setClubs: React.Dispatch<React.SetStateAction<string>>;
  setUni: React.Dispatch<React.SetStateAction<string>>;

  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

export const Edit = ({ setName, setNickname, setRole, setStudentId, setGender, setClubs, setUni, setEmail }: Props) => {
  const [name, setNameSt] = useState('');
  const [nickname, setNicknameSt] = useState('');
  const [role, setRoleSt] = useState('');
  const [studentId, setStudentIdSt] = useState('');
  const [gender, setGenderSt] = useState('');
  const [clubs, setClubsSt] = useState('');
  const [uni, setUniSt] = useState('');
  const [email, setEmailSt] = useState('');

  const func1 = e => {
    setName(e.target.value);
    setNameSt(e.target.value);
  };
  const func2 = e => {
    setNickname(e.target.value);
    setNicknameSt(e.target.value);
  };

  const func3 = e => {
    setRole(e.target.value);
    setRoleSt(e.target.value);
  };

  const func4 = e => {
    setStudentId(e.target.value);
    setStudentIdSt(e.target.value);
  };

  const func5 = e => {
    setGender(e.target.value);
    setGenderSt(e.target.value);
  };

  const func6 = e => {
    setClubs(e.target.value);
    setClubsSt(e.target.value);
  };

  const func7 = e => {
    setUni(e.target.value);
    setUniSt(e.target.value);
  };

  const func8 = e => {
    setEmail(e.target.value);
    setEmailSt(e.target.value);
  };

  //useRef:
  const nameRef = useRef<HTMLInputElement>(null);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);
  const stIdRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);
  const clubsRef = useRef<HTMLInputElement>(null);
  const uniRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  return (
    <div className="input-container">
      <h2>Please fill all those fields :)</h2>
      <form>
        <div className="input-row">
          <label htmlFor="name">Name:</label>
          <input value={name} id="name" ref={nameRef} className="name" onChange={func1} />
        </div>
        <div className="input-row">
          <label htmlFor="nickname">Nickname:</label>
          <input value={nickname} id="nickname" ref={nicknameRef} className="nickname" onChange={func2} />
        </div>
        <div className="input-row">
          <label htmlFor="role">Email:</label>
          <input value={email} id="email" ref={emailRef} className="email" onChange={func8} />
        </div>
        <div className="input-row">
          <label htmlFor="role">Role:</label>
          <input value={role} id="role" ref={roleRef} className="role" onChange={func3} />
        </div>
        <div className="input-row">
          <label htmlFor="stId">ID:</label>
          <input value={studentId} id="stId" ref={stIdRef} className="stId" onChange={func4} />
        </div>
        <div className="input-row">
          <label htmlFor="gender">Gender:</label>
          <input value={gender} id="gender" ref={genderRef} className="gender" onChange={func5} />
        </div>
        <div className="input-row">
          <label htmlFor="clubs">Clubs:</label>
          <input value={clubs} id="clubs" ref={clubsRef} className="clubs" onChange={func6} />
        </div>
        <div className="input-row">
          <label htmlFor="uni">University:</label>
          <input value={uni} id="uni" ref={uniRef} className="uni" onChange={func7} />
        </div>
      </form>
    </div>
  );
};

export default Edit;
