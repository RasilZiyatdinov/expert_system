import { isVisible } from '@testing-library/user-event/dist/utils';
import React from 'react';
import Element from './Element';
import './index.css'

const Matrix = function (props) {
    return (
        <div>
            {/* <div className="board-row" >
                {props.concents.map((concent, i) => (
                    <span className='conc' key={concent.id}>
                        {concent}
                    </span>))}
            </div> */}
            <div className="board-row" >
                <span className='class'></span>
                {props.classes.map((concent, i) => (
                    <span className='conc' key={concent.id}>
                        {concent}
                    </span>))}
            </div>


            {props.array.map((row, i) => (
                <div className="board-row" >
                    <span className='class' key={props.concents[i].id}>
                        {props.concents[i]}
                    </span>
                    {row.map((col, j) => (
                        <Element key={col.id} data={col}></Element>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Matrix;