import React, { useCallback, useEffect, useRef, useState } from 'react'
import '../../assets/styles/editpopup.css';
import { useDispatch, useSelector } from 'react-redux';
import PopOver from './PopOver';
import colorPallet from '../../assets/keep1.svg';
import { createNote, updateNote } from '../../Redux/HomeSlice';


const initialState = {
    focused: true,
    backgroundOptions: false,
    activeBackgroundColor: null,
    activeBackgroundImage: null,
    resetCompleteComponent: false,
}

const EditPop = ({open , onClose, selectedNote }) => {
    const { notes = [] } = useSelector((state) => state.noteStore);
    const dispatch = useDispatch();
    const [info, setInfo] = useState(initialState);
    const editableRef = useRef(null);
    const editableTitleRef = useRef(null);

    useEffect(() => {
        if(selectedNote){
            const {title,content,activeBackgroundColor,activeBackgroundImage} = 
                selectedNote || {};
            editableTitleRef.current.innerText = title;
            editableRef.current.innerText = content;

            let requireInfoObj = {
                activeBackgroundColor : null,
                activeBackgroundImage: null,
            };
            if(activeBackgroundColor) {
                requireInfoObj.activeBackgroundColor = activeBackgroundColor;
            }
            if(activeBackgroundImage) {
                requireInfoObj.activeBackgroundImage = activeBackgroundImage;
            }
            setInfo((prev) => ({
                ...prev, ...requireInfoObj
            }));
        }
    },[selectedNote]);

    const toggleBackgroundOption = (val) => {
        setInfo((prev) => ({
            ...prev,
            backgroundOptions: val ? val : !prev.backgroundOptions
        }));
    }

    const handleBackGroundOptionChange = (type, val) => {
        setInfo((prev) => ({
            ...prev,
            [type]: val
        }))
    };

    const handleReset = useCallback(() => {
        let index = -1;
        for(let i=0;i<notes?.length;i++){
            if(notes?.[i].id===selectedNote?.id){
                index= i;
                break;
            }
        }
        if (index !== -1) {
            const payload = {
                ...selectedNote,
                title: editableTitleRef.current.innerText,
                content: editableRef.current.innerText,
                activeBackgroundColor: info?.activeBackgroundColor || "",
                activeBackgroundImage: info?.activeBackgroundImage || "",

            };
            dispatch(updateNote({index, payload}));
        };

        editableRef.current.innerText = "";
        editableTitleRef.current.innerText = "";
        setInfo({ ...initialState, resetCompleteComponent: true });
        onClose();
    }, [
        notes,
        editableRef, 
        dispatch, 
        editableTitleRef, 
        info?.activeBackgroundColor, 
        info?.activeBackgroundImage,
        selectedNote,
        onClose,
    ]);

    const handleResetChanges = useCallback(() => {
        setInfo((prev) => ({ ...prev, resetCompleteComponent: false }))
    }, [])

    return open && 
        <div className='editPopParentContainer' >
            <div className="editOverlayContainer" onClick={handleReset}></div>
            <div className="createComponentContainer"
                style={{
                    backgroundColor: info?.activeBackgroundColor?.value || "", backgroundImage: `url(${info?.activeBackgroundImage?.value})`
                }}
            >
                {info?.focused && (
                    <div className='titleContentInputContainer'
                        contentEditable="true"
                        spellCheck="false"
                        aria-multiline="true"
                        role='textbox'
                        data-placeholder='Title'
                        ref={editableTitleRef}
                    ></div>
                )}
                <div
                    ref={editableRef}
                    className='notesContentInputContainer'
                    contentEditable="true"
                    spellCheck="false"
                    aria-multiline="true"
                    role='textbox'
                    data-placeholder='Write your notes here...'
                    onFocus={() => setInfo((prev) => ({ ...prev, focused: true }))}
                ></div>
                {info?.focused && (
                    <div
                        className="notesFooterContainer"
                        style={{ backgroundColor: info?.activeBackgroundColor?.value || "" }}
                    >
                        <div className='colorPalleteBtn' onClick={toggleBackgroundOption}>
                            <img src={colorPallet} alt="collerpallet" />
                        </div>
                        <button
                            className='closeBtn'
                            onClick={handleReset}>Close</button>
                    </div>
                )}
            </div>
            <PopOver
                open={info?.backgroundOptions}
                onClose={toggleBackgroundOption}
                handleBackGroundOptionChange={handleBackGroundOptionChange}
                resetCompleteComponent={info?.resetCompleteComponent}
                handleResetChanges={handleResetChanges}
                customOuterContainerStyle={{
                    bottom:"-101px",
                    left:'calc(50% - 225px)'
                }}
                activeBackgroundColor={info?.activeBackgroundColor}
                activeBackgroundImage={info?.activeBackgroundImage}
            />
        </div>
    
};

export default EditPop