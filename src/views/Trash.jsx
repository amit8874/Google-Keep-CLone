import React, { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import NoteComponent from './component/NoteComponent';
import '../assets/styles/trash.css';
import EditPop from './component/EditPop';

const Trash = () => {

  const {notes = [],searchQuery } = useSelector((state) => state.noteStore);

  const [info, setInfo] = useState({
      editPopUp: false,
      selectedNote: null,
    });
  
    const openEditPopup = useCallback(
      (value) => {
        setInfo((prev) => ({ ...prev, editPopUp: true, selectedNote: value }));
      }, []
    );
  
    const closedEditPopup = useCallback(() => {
      setInfo((prev) => ({ ...prev, editPopUp: false, selectedNote: null }))
    }, [])
  
    const trashData = useMemo(() => {
      return notes?.filter((ele) => ele.label === "trash" &&
        ele.title?.toLowerCase().includes(searchQuery?.toLowerCase()))
    }, [notes, searchQuery])

  return (
    <div className="notesContentContainer">
        {trashData?.map((ele, index) => (
            <NoteComponent 
              key={index} 
              data= {ele} 
              source={"trash"}/>
        ))};

        <EditPop
          open={info?.editPopUp}
          onClose={closedEditPopup}
          selectedNote={info?.selectedNote}
        />
      </div>
  )
}

export default Trash;