import React, { Children } from 'react'
import '../../assets/styles/noteWrapper.css';
import Header from '../component/Header';
import SideBar from '../component/SideBar';

function NotesWrapper({children}) {
  return (
    <div className='notesParentContainer'>
      <Header/>
      <div className='noteContentContainer'>
        <SideBar/>
        <div className="childrenContentContainer">
            {children}
        </div>
      </div>
    </div>
  )
}

export default NotesWrapper