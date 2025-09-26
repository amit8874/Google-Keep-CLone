import React, { useEffect, useState } from 'react'
import '../../assets/styles/PopOver.css'

const colors = [
    {
        id: "#faafa8",
        value: "#faafa8",
    },
    {
        id: "#f39f79",
        value: "#f39f79",
    },
    {
        id: "#fff8b8",
        value: "#fff8b8",
    },
    {
        id: "#e2f6d3",
        value: "#e2f6d3",
    },
    {
        id: "#b4ddd3",
        value: "#b4ddd3",
    },
    {
        id: "#d4e4ed",
        value: "#d4e4ed",
    },
    {
        id: "#aeccdc",
        value: "#aeccdc",
    },
    {
        id: "#bc5e56ff",
        value: "#bc5e56ff",
    },
    {
        id: "#f39f79",
        value: "#f39f79",
    },
    {
        id: "#edd81aff",
        value: "#edd81aff",
    },
    {
        id: "#4e782eff",
        value: "#4e782eff",
    },

];

const backgroundImage = [
    {
        id: "1",
        value: "https://www.gstatic.com/keep/backgrounds/grocery_light_thumb_0615.svg",
    },
    {
        id: "2",
        value: "https://www.gstatic.com/keep/backgrounds/food_light_thumb_0615.svg",
    },
    {
        id: "3",
        value: "https://www.gstatic.com/keep/backgrounds/music_light_thumb_0615.svg",
    },
    {
        id: "4",
        value: "https://www.gstatic.com/keep/backgrounds/recipe_light_thumb_0615.svg",
    },
    {
        id: "5",
        value: "https://www.gstatic.com/keep/backgrounds/notes_light_thumb_0615.svg",
    },
    {
        id: "6",
        value: "https://www.gstatic.com/keep/backgrounds/places_light_thumb_0615.svg",
    },
    {
        id: "7",
        value: "https://www.gstatic.com/keep/backgrounds/recipe_light_thumb_0615.svg",
    },
    {
        id: "8",
        value: "https://www.gstatic.com/keep/backgrounds/travel_light_thumb_0615.svg",
    },
    {
        id: "9",
        value: "https://www.gstatic.com/keep/backgrounds/celebration_light_thumb_0715.svg",
    },
]

const BackgroundColorComponent = ({ bgColor , active, onClick }) => {
    return (
        <div className="backgroundColorComponent"
            style={{ backgroundColor: bgColor , border: active ? "2px solid rgb(161, 66, 264)" : ""}}
            onClick={onClick}
        >

        </div>
    );
};

const BackgroundImageComponent = ({ bgImage , active, onClick }) => {
    return (
        <div className="backgroundImageComponent"
            style={{ backgroundImage: `url(${bgImage})`, border: active ? "2px solid rgb(161, 66, 264)" : "" }}
            onClick={onClick}
        >

        </div>
    );
};

const initialState = {
    backgroundColor: null,
    backgroundImage: null,
}


const PopOver=({ 
    open, 
    onClose, 
    handleBackGroundOptionChange, 
    resetCompleteComponent ,
    handleResetChanges,
    customOuterContainerStyle = {},
    activeBackgroundColor,
    activeBackgroundImage,
})=> {
    const [info, setInfo] = useState(initialState);

    useEffect(()=>{
            setInfo((prev) => ({
                ...prev,
                backgroundColor: activeBackgroundColor,
                backgroundImage: activeBackgroundImage,
            }));
    },[activeBackgroundColor, activeBackgroundImage]);

    useEffect(()=> {
        if(resetCompleteComponent){
            setInfo(initialState);
            handleResetChanges(false);
        }
    }, [resetCompleteComponent]);

    const handleBackgroundColor = (color) => {

        setInfo((prev) => ({
            ...prev,
            backgroundColor: color,
        }));
        handleBackGroundOptionChange('activeBackgroundColor', color);
    }
    const handleBackgroundImage = (image) => {
        setInfo((prev) => ({
            ...prev,
            backgroundImage: image,
        }));
        handleBackGroundOptionChange('activeBackgroundImage', image);
    }
    return (
        open && (
            <>
                <div className="popoverOverLay" onClick={() => onClose(false)}> </div>
                <div className='popOverParentContainer' style={{...customOuterContainerStyle}}>

                    <div className="backgroundColorContainer">
                        <div className='slashDropContainer'
                            style={{
                                borderColor: 
                                    info?.backgroundColor === null ? "rgb(161, 66, 264)" : "transparent"
                            }}
                            onClick={() => handleBackgroundColor(null)}
                        >
                            <i class="fa-solid fa-droplet-slash"></i>
                        </div>
                        {colors?.map((ele, index) => (
                            <BackgroundColorComponent
                                key={index}
                                bgColor={ele?.value}
                                active={info?.backgroundColor?.id === ele?.id}
                                onClick={() => handleBackgroundColor(ele)}
                            />

                        ))}</div>
                    <div className="backgroundImageContainer">
                        <div className='slashDropContainer'
                            style={{
                                borderColor: 
                                    info?.backgroundImage === null ? "rgb(161, 66, 264)" : "transparent"
                            }}
                            onClick={() => handleBackgroundImage(null)}
                        >
                            <img src="https://fonts.gstatic.com/s/i/googlematerialicons/image_not_supported/v12/gm_grey-24dp/1x/gm_image_not_supported_gm_grey_24dp.png" />
                        </div>
                        {backgroundImage?.map((ele, index) => (
                            <BackgroundImageComponent
                                key={index}
                                bgImage={ele?.value}
                                active={info?.backgroundImage?.id === ele?.id}
                                onClick={() => handleBackgroundImage(ele)}

                            />

                        ))}</div>
                </div>
            </>
        )
    )
}

export default PopOver