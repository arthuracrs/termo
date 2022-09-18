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
        state: 2
    }

    const nextLetterState = (letterState) => {
        if (letterState + 1 > 2)
            return 0
        return letterState + 1
    }

    const changePositionData = (positionIndex) => {
        let tempWordState = copyJson(wordTryState)
        let tempPosition = tempWordState[positionIndex]
        tempPosition.state = nextLetterState(tempPosition.state)

        setWordTryState(tempWordState)
    }

    const changeHandle = (e, positionIndex) => {
        let tempWordTryState = copyJson(wordTryState)

        tempWordTryState[positionIndex].current = e.target.value

        setWordTryState(tempWordTryState)
    }

    const getPositionInputBackgroundColor = (value) => {
        const colors = {
            0: '#3AA394',
            1: '#D3AD69',
            2: '#312A2C'
        }

        return colors[value.state]
    }

    useEffect(() => {
        updateWordTry(wordTryState, wordTryIndex)
    }, wordTryState)

    return (
        <div className='inputRow'>
            {wordTryState.map((value, index) =>
                <div key={index} >
                    <input
                        style={{
                            backgroundColor: getPositionInputBackgroundColor(value)
                        }}
                        onChange={e => changeHandle(e, index)}
                        className='letterInput'
                        type={'text'}
                        maxLength="1"
                        value={value.current}
                    />
                    <div onClick={() => changePositionData(index,)}> %</div>
                </div>
            )}
        </div>
    );
}

export default WordTry;
