import React from 'react'

const Seemore = ({ action, display, slice }) => {
    return (
        <button className={slice >= display ? "notDisplaying" : "seemore"} onClick={action} >Voir plus <i className="fi-rr-angle-down arrow-down"></i></button>
    )
}

export default Seemore
