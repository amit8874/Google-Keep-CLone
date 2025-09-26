import React, { useCallback, useMemo, useState } from 'react'
import '../assets/styles/home.css';
import CreateComponent from './component/createComponent';
import NoteComponent from './component/NoteComponent';
import { useSelector } from 'react-redux';
import EditPop from './component/EditPop';


function Home() {
  const { notes = [], searchQuery } = useSelector((state) => state.noteStore);
  const [info, setInfo] = useState ({
    editPopup:false,
    selectedNote: null,
  })

  const openEditPopup = useCallback ((value) => {
    setInfo((prev) => ({...prev, editPopup: true , selectedNote: value}))
  },[]);

  const closeEditPopup = useCallback (() => {
    setInfo((prev) => ({...prev, editPopup: false, selectedNote:null}))
  },[]);

  const pinnedData = useMemo(()=> {
      return notes?.filter( 
        (ele) => 
          ele.label === "notes" && 
          ele?.pinned  && 
          ele.title?.toLowerCase().includes(searchQuery?.toLowerCase())
      );
  },[notes, searchQuery])

  const otherData = useMemo(()=> {
    return notes?.filter(
      (ele) => 
        ele.label === "notes" && 
        !ele?.pinned && 
        ele.title?.toLowerCase().includes(searchQuery?.toLowerCase()));
  },[notes, searchQuery]);

  return (
    <div className='homeParentContainer'>
      <CreateComponent />
      <div>
       {pinnedData?.length ?  <span className='pinnedText'>Pinned</span> : ""}
        <div className="notesContentContainer">
          {pinnedData?.map((ele, index) => (
            <NoteComponent 
              key={index} 
              data={ele} 
              source={'notes'} 
              onClick={openEditPopup}  
            />
          ))}
        </div>
      </div>

      <div>
        {pinnedData?.length && otherData?.length ? <span className='pinnedText'>Other</span> : ""}
        <div className="notesContentContainer">
          {otherData?.map((ele, index) => (
              <NoteComponent 
                key={index} 
                data={ele} 
                source={'notes'} 
                onClick={openEditPopup}
              />
            ))}
        </div>
      </div>
      <EditPop 
        open={info?.editPopup} 
        onClose={closeEditPopup}
        selectedNote={info?.selectedNote}
      />
    </div>
  )
}

export default Home;