import React, { useCallback, useRef, useState } from 'react';
import '../../assets/styles/CreateComponent.css'
import colorPallet from '../../assets/keep1.svg'
import PopOver from './PopOver';
import { useDispatch, useSelector } from 'react-redux';
import { createNote } from '../../Redux/HomeSlice';

const initialState = {
    focused: false,
    backgroundOptions: false,
    activeBackgroundColor: null,
    activeBackgroundImage: null,
    resetCompleteComponent: false,
}

const CreateComponent = () => {
    // const incomingState = useSelector((state) => state);
    const dispatch = useDispatch();
    const [info, setInfo] = useState(initialState);
    const editableRef = useRef(null);
    const editableTitleRef = useRef(null);

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
        const payload = {
            title: editableTitleRef.current.innerText,
            content: editableRef.current.innerText,
            activeBackgroundColor: info?.activeBackgroundColor || "",
            activeBackgroundImage: info?.activeBackgroundImage ||"",
            label: "notes",
            pinned: false,
            id: crypto.randomUUID(),
        };
        dispatch(createNote(payload));

        editableRef.current.innerText = "";
        editableTitleRef.current.innerText = "";
        setInfo({ ...initialState, resetCompleteComponent: true });
    }, [editableRef, dispatch , editableTitleRef, info?.activeBackgroundColor, info?.activeBackgroundImage]);

    const handleResetChanges = useCallback(() => {
        setInfo((prev) => ({ ...prev, resetCompleteComponent: false }))
    }, [])

    return (
        <div className='createComponentParentContainer' >

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
            />
        </div>
    )
};

export default CreateComponent;