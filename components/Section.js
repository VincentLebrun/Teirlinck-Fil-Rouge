import React from 'react'

const Section = ({title, icon}) => {
    return (
            <div className="section">
                <div class="insection">
                    <i class={icon}></i>
                </div>
                <h2>{title}</h2>

            </div>
        
    )
}

export default Section
