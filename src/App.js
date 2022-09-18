import './App.css';
import wordsFile from './assets/fiveLettersWords.json'

import WordTry from './components/wordTry'

import { useState, useEffect } from 'react'

function App() {

  const copyJson = (x) => JSON.parse(JSON.stringify(x))

  const positionFactory = () => ({
    current: '-',
    state: 2
  })

  const wordTryFactory = () => [
    positionFactory(),
    positionFactory(),
    positionFactory(),
    positionFactory(),
    positionFactory(),
  ]

  const [wordsTry, setWordsTry] = useState([wordTryFactory(), wordTryFactory(), wordTryFactory(), wordTryFactory(), wordTryFactory()])
  const [remainingWords, setRemainingWords] = useState(wordsFile.words)

  const getWantedLettersOnWantedPositions = () => {
    const tempWordsTry = copyJson(wordsTry)
    const tempWantedPositions = []

    for (let i = 0; i < tempWordsTry.length; i++) {
      const wordTry = tempWordsTry[i]
      for (let j = 0; j < wordTry.length; j++) {
        const position = wordTry[j];
        if (position.state == 0) tempWantedPositions.push({
          letter: position.current,
          position: j
        })
      }
    }
    return tempWantedPositions
  }

  const removeWordsWithoutWantedLettersOnWantedPlaces = (wordsList, wantedPositions) => {
    const checkIsWantedWord = (word) => {
      for (let j = 0; j < wantedPositions.length; j++) {
        const position = wantedPositions[j];
        for (let i = 0; i < word.length; i++) {
          const letter = word[i];
          if (position.letter != letter && i == position.position) return false
        }
      }
      return true
    }

    let tempWordsList = copyJson(wordsList)
    let newWordsList = []

    for (let i = 0; i < tempWordsList.length; i++) {
      const word = tempWordsList[i]
      let isWantedWord = checkIsWantedWord(word)
      if (isWantedWord) newWordsList.push(word)
    }

    return newWordsList
  }

  const getUnwantedLetters = () => {
    const tempWordsTry = copyJson(wordsTry)
    const tempUnwantedLetters = []

    for (let i = 0; i < tempWordsTry.length; i++) {
      const wordTry = tempWordsTry[i]
      for (let j = 0; j < wordTry.length; j++) {
        const position = wordTry[j];
        if (position.state == 2) tempUnwantedLetters.push(position.current)
      }
    }
    return tempUnwantedLetters
  }

  const getWantedLettersOnUnwantedPositions = () => {
    const tempWordsTry = copyJson(wordsTry)
    const tempUnwantedPositions = []

    for (let i = 0; i < tempWordsTry.length; i++) {
      const wordTry = tempWordsTry[i]
      for (let j = 0; j < wordTry.length; j++) {
        const position = wordTry[j];
        if (position.state == 1) tempUnwantedPositions.push({
          letter: position.current,
          position: j
        })
      }
    }
    return tempUnwantedPositions
  }

  const removeWordsWithWantedLettersOnUnwantedPlaces = (wordsList, unwantedPositions) => {
    const checkIsUnwantedWord = (word) => {
      for (let j = 0; j < word.length; j++) {
        const letter = word[j]
        for (let k = 0; k < unwantedPositions.length; k++) {
          const unwantedPosition = unwantedPositions[k]
          const isUnwantedWord = unwantedPosition.position == j && unwantedPosition.letter == letter
          if (isUnwantedWord) return true
        }
      }
      return false
    }

    let tempWordsList = copyJson(wordsList)
    let newWordsList = []

    for (let i = 0; i < tempWordsList.length; i++) {
      const word = tempWordsList[i]
      let isUnwantedWord = checkIsUnwantedWord(word)
      if (!isUnwantedWord) newWordsList.push(word)
    }

    return newWordsList
  }

  const removeWordsWithUnwantedLetters = (wordsList, unwantedLetters) => {
    let tempWordsList = wordsList

    for (let i = 0; i < unwantedLetters.length; i++) {
      if ((/[a-zA-Z]/).test(unwantedLetters[i]))
        tempWordsList = tempWordsList.filter((word) => word.indexOf(unwantedLetters[i]) == -1)
    }

    return tempWordsList
  }

  const updateWordTry = (wordTryState, wordTryIndex) => {
    let tempWordsTry = copyJson(wordsTry)
    tempWordsTry[wordTryIndex] = wordTryState
    setWordsTry(tempWordsTry)
  }

  useEffect(() => {
    let tempRemainingWords = wordsFile.words

    tempRemainingWords =
      removeWordsWithUnwantedLetters(
        tempRemainingWords,
        getUnwantedLetters()
      )
    tempRemainingWords =
      removeWordsWithWantedLettersOnUnwantedPlaces(
        tempRemainingWords,
        getWantedLettersOnUnwantedPositions()
      )
    tempRemainingWords =
      removeWordsWithoutWantedLettersOnWantedPlaces(
        tempRemainingWords,
        getWantedLettersOnWantedPositions()
      )

    setRemainingWords(tempRemainingWords)
  }, [wordsTry])

  return (
    <div className="App">
      {wordsTry.map(
        (value, index) => {
          return <WordTry key={index} wordTryIndex={index} wordTry={value} updateWordTry={updateWordTry} />
        }
      )}
      <div className='sugestionWords'>
        {remainingWords.slice(0, 100).map((value, index) =>
          <h3 key={index} className="sugestionWord">
            {value}
          </h3>)}
      </div>
    </div>
  );
}

export default App;
