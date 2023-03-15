import React from 'react';
import './style.css'

function Loader({style = {}}) {
    return (
        <div className={'loader_wrapper' + ' ' + style.loaderClass}>
            <div className="loader"/>
        </div>
    );
}

export default Loader;
