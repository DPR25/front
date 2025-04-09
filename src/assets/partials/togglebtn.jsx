import React from "react";
import './togglebtn.css';

export default function ToggleBtn({isToggled, onToggle}) {

    return (
        <div className="flex gap-5">
            <button onClick={onToggle} className='hover:cursor-pointer'>
                <div className={`toggle-btn ${isToggled ? 'toggled' : ''}`}>
                    
                        <div className='thumb'></div>
                </div>
            </button>
            <img src={`${isToggled? '/satelite.svg' : '/mask.svg'}`} alt="" width={25}/>
        </div>
    )
}