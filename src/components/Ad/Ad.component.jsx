import React from "react";
import './Ad.styles.css'

const Ad = ({url}) => {
    console.log(url)
    return (
    <div className="ad">
        <p className='ad__header'>If you're enjoying this, please be sure to appreciate our sponsors</p>
        <img src={url} alt="one of the sponsors"/>
    </div>
)};

export default Ad;