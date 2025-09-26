import React, { useCallback, useEffect, useRef } from 'react'
import '../../assets/styles/noteComponent.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNote, updateNote } from '../../Redux/HomeSlice';
import unarchive from '../../assets/styles/unarchive.svg';

import deleteForever from '../../assets/styles/deleteforever.svg';
import Restore from '../../assets/styles/Restore.svg';
import pinned from '../../assets/styles/unpin.svg';


const NoteComponent = ({ data, source, onClick }) => {
  const dispatch = useDispatch();
  const { notes = [] } = useSelector((state) => state.noteStore);
  const editableTitleRef = useRef(null);
  const editableContentRef = useRef(null);

  useEffect(() => {
    if (data) {
      editableTitleRef.current.innerText = data?.title || "";
      editableContentRef.current.innerText = data?.content || "";
    }
  }, [data])

  const handleActionButtonClick = useCallback(
    (event, type, value) => {
    const { id } = value;
    let index = -1;
    for (let i = 0; i < notes.length; i++) {
      if (notes[i]?.id === id) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      return;
    }
    const updatedNotesObj = {
      ...value,
    };
    if (type === "archive") {
      updatedNotesObj.label = "archive";
    }

    if (type === 'unarchive') {
      updatedNotesObj.label ='notes'
    }

    if (type === 'Restore') {
      updatedNotesObj.label ='notes'
    }

    if (type === "trash") {
      updatedNotesObj.label = "trash";
    }

    if (type === "pin") {
      updatedNotesObj.pinned = !updatedNotesObj.pinned;
    }

    if (type === "deleteForever"){
      return dispatch(deleteNote({index}))
    }

    dispatch(updateNote({ index, payload: updatedNotesObj }))
    event.stopPropagation();

  }, [notes]
  );

  const handleFooterOption = useCallback(() => {
    if (source === 'notes') {
      return (
        <>
          <div
            className="bottomActionButtonWrapper"
            onClick={(e) => handleActionButtonClick(e,"archive", data)}
          >
            <i class="fa-solid fa-box-archive"></i>
          </div>
          <div
            className="bottomActionButtonWrapper"
            onClick={(e) => handleActionButtonClick(e, "trash", data)}
          >
            <i class="fa-solid fa-trash"></i>
          </div>
        </>
      )
    }
    if (source === 'archive'){
      return (
        <>
          <div
            className="bottomActionButtonWrapper"
            onClick={(e) => handleActionButtonClick(e, "unarchive", data)}
          >
            <img src={unarchive} alt="unarchive" />
          </div>
          <div
            className="bottomActionButtonWrapper"
            onClick={(e) => handleActionButtonClick(e, "trash", data)}
          >
            <i class="fa-solid fa-trash"></i>
          </div>
        </>
      )
    }

    if (source === 'trash'){
      return (
        <>
          <div
            className="bottomActionButtonWrapper"
            onClick={(e) => handleActionButtonClick(e, "deleteForever", data)}
          >
            <img src={deleteForever} alt="deleteForever" />
          </div>
          <div
            className="bottomActionButtonWrapper"
            onClick={(e) => handleActionButtonClick(e, "Restore", data)}
          >
            <img src={Restore} alt="Restore" />
          </div>
        </>
      )
    }

  }, [source])

  return (
    <div
      className='notesCardParentContainer' 
      onClick={() => onClick(data)}
      style={{
        backgroundColor: data?.activeBackgroundColor.value || "",
        backgroundImage: data?.activeBackgroundImage?.value 
        ? `url(${data?.activeBackgroundImage?.value || ""})`
        : "",
      }}
    >
      <div className="titleContentContainer" ref={editableTitleRef} ></div>

      <div className="contentContainer" ref={editableContentRef} >
      </div>

      {source === 'notes' && (
          <div
          className={`pinButton ${data?.pinned ? 'pinned' : ""}`}
          onClick={(e) => handleActionButtonClick(e, "pin", data)}
        >
          <i class={data?.pinned ? pinned : "fa-solid fa-thumbtack"}></i>
        </div>
        )}
      <div className="buttonActionButtonContainer">
        {handleFooterOption(source)}
        {/* <div
          className="bottomActionButtonWrapper"
          onClick={() => handleActionButtonClick("archive", data)}
        >
          <i class="fa-solid fa-box-archive"></i>
        </div>
        <div
          className="bottomActionButtonWrapper"
          onClick={() => handleActionButtonClick("trash", data)}
        >
          <i class="fa-solid fa-trash"></i>
        </div> */}
      </div>
    </div>
  )

};

export default NoteComponent