import React from 'react'

const Seeless = ({ action, display }) => {
    return (
        <button className={display <= 4 ? "notDisplaying" : "seemore"} onClick={action} >Voir Moins <i className="fi-rr-angle-up arrow-up"></i></button>
    )
}

export default Seeless
