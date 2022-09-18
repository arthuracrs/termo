import './App.css';
import wordsFile from './assets/fiveLettersWords.json'

import WordTry from './components/wordTry'

import { useState, useEffect } from 'react'

function App() {

  const wordTryFactory = ()=> ['-', '-', '-', '-', '-']

  const [knowWord, setKnowWord] = useState(wordTryFactory())
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

  const handleInputKnowLetter = (e, index) => {
    let tempKnowWord = copyJson(knowWord)
    tempKnowWord[index] = e.target.value

    setKnowWord(tempKnowWord)
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
      <div className='inputRow'>
        {knowWord.map((value, i) =>
          <WordTry value={value} index={i} changeHandler={handleInputKnowLetter}/>
        )}
      </div>
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
