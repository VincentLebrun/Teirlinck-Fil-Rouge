import React from 'react'

const Section = ({title, icon}) => {
    return (
            <div className="section">
                <div className="insection">
                    <i className={icon}></i>
                </div>
                <h2>{title}</h2>

            </div>
        
    )
}

export default Section
