import './App.css';
import wordsFile from './assets/fiveLettersWords.json'

import WordTry from './components/wordTry'

import { useState, useEffect } from 'react'

function App() {
  const positionFactory = () => ({
    currentValue: '-',
    rightLetter: '',
    wrongLetter: '',
    notLetter: ''
  })

  const wordTryFactory = () => [
    positionFactory(),
    positionFactory(),
    positionFactory(),
    positionFactory(),
    positionFactory(),
  ]

  const [knowWord, setKnowWord] = useState(wordTryFactory())
  const [wordsTry, setWordsTry] = useState([wordTryFactory(), wordTryFactory(), wordTryFactory()])
  const [wantedLetters, setWantedLetters] = useState([''])
  const [unwantedLetters, setUnwantedLetters] = useState([''])
  const [remainingWords, setRemainingWords] = useState(wordsFile.words)

  const removeWordsByWantedLetterOnUnwantedPlaces = (lista, wantedLetter, unwantedPlace) => {
    const processedWords = []

    for (let i = 0; i < lista.length; i++) {
      if (lista[i][unwantedPlace] != wantedLetter) {
        processedWords.push(lista[i])
      }
    }
    return processedWords
  }

  const getWordsByLetterOnWantedPlaces = (lista, letra, position) => {
    const processedWords = []

    for (let i = 0; i < lista.length; i++) {
      if (lista[i][position] == letra) {
        processedWords.push(lista[i])
      }
    }
    return processedWords
  }

  const removeWordsWithWantedLettersOnUnWantedPlaces = (wordsList, wantedLetters) => {
    let tempWordsList = wordsList

    wantedLetters.forEach((element, index) => {
      if ((/[a-zA-Z]/).test(element))
        tempWordsList = getWordsByLetterOnWantedPlaces(tempWordsList, element, index)
    })

    return tempWordsList
  }

  const getWordsWithWantedLettersOnKnowPlaces = (wordsList, wantedLetters) => {
    let tempWordsList = wordsList

    wantedLetters.forEach((element, index) => {
      if ((/[a-zA-Z]/).test(element))
        tempWordsList = getWordsByLetterOnWantedPlaces(tempWordsList, element, index)
    })

    return tempWordsList
  }

  const removeWordsWithWantedLetters = (wordsList, wantedLetters) => {
    let tempWordsList = wordsList

    for (let i = 0; i < wantedLetters.length; i++) {
      if ((/[a-zA-Z]/).test(wantedLetters[i]))
        tempWordsList = tempWordsList.filter((word) => word.indexOf(wantedLetters[i]) != -1)
    }

    return tempWordsList
  }

  const removeWordsWithUnwantedLetters = (wordsList, unwantedLetters) => {
    let tempWordsList = wordsList

    for (let i = 0; i < unwantedLetters.length; i++) {
      if ((/[a-zA-Z]/).test(unwantedLetters[i]))
        tempWordsList = tempWordsList.filter((word) => word.indexOf(unwantedLetters[i]) == -1)
    }

    return tempWordsList
  }

  const copyJson = (x) => JSON.parse(JSON.stringify(x))

  const handleInputKnowLetter = (e, letterIndex, wordTryIndex) => {
    let tempWordsTry = copyJson(wordsTry)
    let newWordTry = tempWordsTry[wordTryIndex]
    newWordTry[letterIndex] = e.target.value

    setWordsTry(tempWordsTry)
  }

  const handleInputWantedLetter = (e) => {
    let tempWantedLetters = copyJson(e.target.value)
    tempWantedLetters = tempWantedLetters.split('')

    setWantedLetters(tempWantedLetters)
  }

  const handleInputUnwantedLetter = (e) => {
    let tempUnwantedLetters = copyJson(e.target.value)
    tempUnwantedLetters = tempUnwantedLetters.split('')

    setUnwantedLetters(tempUnwantedLetters)
  }

  const updateWordsTry = (wordTryIndex, wordTry) => {
    let tempWordsTry = copyJson(wordsTry)

    tempWordsTry[wordTryIndex] = wordTry

    setWordsTry(tempWordsTry)
  }


  useEffect(() => {
    let tempRemainingWords = wordsFile.words
    wordsTry.forEach(element => {
      tempRemainingWords = getWordsWithWantedLettersOnKnowPlaces(tempRemainingWords, element)
      tempRemainingWords = removeWordsWithWantedLetters(tempRemainingWords, wantedLetters)
      tempRemainingWords = removeWordsWithUnwantedLetters(tempRemainingWords, unwantedLetters)
    });


    setRemainingWords(tempRemainingWords)
  }, [wordsTry])


  useEffect(() => {
    let tempRemainingWords = wordsFile.words

    tempRemainingWords = getWordsWithWantedLettersOnKnowPlaces(tempRemainingWords, knowWord)
    tempRemainingWords = removeWordsWithWantedLetters(tempRemainingWords, wantedLetters)
    tempRemainingWords = removeWordsWithUnwantedLetters(tempRemainingWords, unwantedLetters)

    setRemainingWords(tempRemainingWords)
  }, [knowWord, unwantedLetters, wantedLetters])

  return (
    <div className="App">
      <div className='letters'>
        <input className='unwantedWordsInput' type={'text'} onChange={handleInputWantedLetter} placeholder="wanted letters" />
        <input className='unwantedWordsInput' type={'text'} onChange={handleInputUnwantedLetter} placeholder="unwanted letters" />
      </div>
      <button className='clear' onClick={() => {
        setKnowWord(['-', '-', '-', '-', '-',])
      }}>
        apagar
      </button>
      {wordsTry.map(
        (value, index) => {
          console.log(value)
          return <WordTry key={index} wordTryIndex={index} knowWord={value} changeHandler={handleInputKnowLetter} />
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
