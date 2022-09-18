import { useState, useEffect } from 'react'
import './style.css'

function WordTry({ updateWordTry, wordTry, wordTryIndex }) {
    const copyJson = x => JSON.parse(JSON.stringify(x))

    const [wordTryState, setWordTryState] = useState(wordTry)

    const letterStates = [
        'RIGHT_POSITION',
        'WRONG_POSITION',
        'WRONG_LETTER'
    ]

    const positionState = {
        current: '-',
        lettersData: {
            a: letterStates[0],
            b: letterStates[0],
            c: letterStates[0],
            d: letterStates[0],
        }
    }

    const nextLetterState = (letterState) => {
        if (letterState + 1 > 2)
            return 0
        return letterState + 1
    }

    const changePositionData = (positionIndex) => {
        let tempWordState = copyJson(wordTryState)

        let tempPosition = tempWordState[positionIndex]
        // if (tempLetter == false)
        //     tempLetter = 0

        tempPosition.lettersData[tempPosition.current] = nextLetterState(tempPosition.lettersData[tempPosition.current])

        setWordTryState(tempWordState)
    }

    const changeHandle = (e, positionIndex) => {
        let tempWordTryState = copyJson(wordTryState)
        console.log(tempWordTryState)
        tempWordTryState[positionIndex].current = e.target.value
        tempWordTryState[positionIndex].lettersData[e.target.value] = 2

        setWordTryState(tempWordTryState)
    }



    useEffect(() => {
        updateWordTry(wordTryState, wordTryIndex)
    }, wordTryState)

    return (
        <div className='inputRow'>
            {wordTryState.map((value, index) =>
                <div key={index}>
                    <input onChange={e => changeHandle(e, index)} className='letterInput' type={'text'} maxLength="1" value={value.current} />
                    <button onClick={() => changePositionData(index,)}> %</button>
                </div>
            )}
        </div>
    );
}

export default WordTry;
