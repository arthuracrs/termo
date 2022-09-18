const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getWordsByLetterOnPosition = (lista, letra, position) => {
    const processedWords = []

    if (letra === '-') return lista

    for (let i = 0; i < lista.length; i++) {
        if (lista[i][position] == letra) {
            processedWords.push(lista[i])
        }
    }
    return processedWords
}

const parseWordsToArray = (data) => { return data.split(/\r?\n/); }

const getWordsWithFiveLetters = (words) => {
    const fiveLettersWords = []
    for (let i = 0; i < words.length; i++) {
        if (words[i].length === 5) {
            fiveLettersWords.push(words[i])
        }
    }

    return fiveLettersWords
}

const main = (data) => {
    const wordsArray = parseWordsToArray(data)
    const fiveLettersWords = getWordsWithFiveLetters(wordsArray)

    let remainingWords = fiveLettersWords

    let knowWord = ''
    let lettersInWord = ''
    let lettersNotInWord = ''

    console.log("palavra | letras na palavra | letras fora: ")

    rl.on('line', function (answer) {

        knowWord = answer.split(' ')[0]
        lettersInWord = answer.split(' ')[1]
        lettersNotInWord = answer.split(' ')[2]

        for (let i = 0; i < lettersNotInWord.length; i++) {
            remainingWords = remainingWords.filter((word) => word.indexOf(lettersNotInWord[i]) == -1)
        }

        for (let i = 0; i < lettersInWord.length; i++) {
            remainingWords = remainingWords.filter((word) => word.indexOf(lettersInWord[i]) > -1)
        }

        for (let i = 0; i < knowWord.length; i++) {
            remainingWords = getWordsByLetterOnPosition(remainingWords, knowWord[i], i)
        }
        console.clear()
        console.log(remainingWords)
        console.log(lettersInWord)
        // console.log('lettersInWord: ' + lettersInWord)
        console.log('lettersNotInWord: ' + lettersNotInWord)
        console.log("palavra | letras na palavra | letras fora: ")
    })
}

fs.readFile('./palavras.txt', 'utf8', (err, data) => {
    console.clear()
    if (err) {
        console.error(err);
        return;
    }

    main(data)
});