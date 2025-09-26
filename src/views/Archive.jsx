import React, { useCallback, useMemo, useState } from 'react'
import '../assets/styles/archive.css';
import { useSelector } from 'react-redux';
import NoteComponent from './component/NoteComponent';
import EditPop from './component/EditPop';

const Archive = () => {

  const { notes = [], searchQuery } = useSelector((state) => state.noteStore);
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

  const archiveData = useMemo(() => {
    return notes?.filter((ele) => ele.label === "archive" &&
      ele.title?.toLowerCase().includes(searchQuery?.toLowerCase()))
  }, [notes, searchQuery])

  return (
    <div className="notesContentContainer">
      {archiveData?.map((ele, index) => (
        <NoteComponent
          key={index}
          data={ele}
          source={"archive"}
          onClick={openEditPopup}
        />
      ))}

      <EditPop
        open={info?.editPopUp}
        onClose={closedEditPopup}
        selectedNote={info?.selectedNote}
      />
    </div>
  )
}

export default Archive;