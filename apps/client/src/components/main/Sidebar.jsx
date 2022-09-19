import React from 'react';
import './Sidebar.css'

function Sidebar(props) {
    return (
        <div className='flex fixed h-screen shadow-xl p-2 top-0 left-0 '>
            <div className='flex flex-col gap-3 font-mono'>
                <i>home</i>
                <i>about</i>
                <i>contact</i>
                <i>support</i>
                <i>Profile</i>
            </div>
        </div>
    );
}

export default Sidebar;