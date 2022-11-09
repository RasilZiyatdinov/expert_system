import React from 'react';
import './index.css'

const Element = (props) => {
    return (
        <div className="square" disabled>
            {props.data.toFixed(1)}
        </div>
    );
}

export default Element;