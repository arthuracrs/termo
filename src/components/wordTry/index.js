// import { useState, useEffect } from 'react'
import './style.css'

function WordTry({ value, index, changeHandler }) {
    return (
        <div className='inputRow'>
            <input key={index} onChange={e => changeHandler(e, index)} className='letterInput' type={'text'} maxLength="1" value={value} />
        </div>
    );
}

export default WordTry;
