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

    rl.question("palavra | letras na palavra | letras fora: ", function (answer) {

        let knowWord = answer.split(' ')[0]
        let lettersInWord = answer.split(' ')[1]
        let lettersNotInWord = answer.split(' ')[2]

        for (let i = 0; i < lettersNotInWord.length; i++) {
            remainingWords = remainingWords.filter((word) => word.indexOf(lettersNotInWord[i]) == -1)
        }

        for (let i = 0; i < lettersInWord.length; i++) {
            remainingWords = remainingWords.filter((word) => word.indexOf(lettersInWord[i]) > -1)
        }

        for (let i = 0; i < knowWord.length; i++) {
            remainingWords = getWordsByLetterOnPosition(remainingWords, knowWord[i], i)
        }
        console.log(remainingWords)
        rl.close();

    })

    // TxtFile = comUltimaletra(fiveLetras, 'r').reduce((acum, curr) =>
    //     acum += '\n' + curr
    // )

    // fs.writeFile('cinco-letras.txt', TxtFile, function (err) {
    //     if (err) throw err;
    //     console.log('Saved!');
    // });
}

fs.readFile('./palavras.txt', 'utf8', (err, data) => {
    console.clear()
    if (err) {
        console.error(err);
        return;
    }

    main(data)
});