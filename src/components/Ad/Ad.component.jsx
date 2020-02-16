import React from "react";
import './Ad.styles.css'

const Ad = ({url}) => {
    console.log(url);// even though this is running 25 time if we have 25 items inside array looping through, we can see in the developer's tool that only the last item is being rendered, not all of them are rendered over and over
    return (
        <div className="ad">
            <p className='ad__header'>If you enjoy shopping here, please be sure to appreciate our sponsors</p>
            <img src={url} alt="one of the sponsors"/>
        </div>
    )};

export default Ad;