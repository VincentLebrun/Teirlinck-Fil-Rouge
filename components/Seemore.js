import React from 'react'

const Seemore = ({action}) => {
    return (
        <button className="seemore" onClick={action} >Voir plus <i className="fi-rr-angle-down arrow-down"></i></button> 
    )
}

export default Seemore
