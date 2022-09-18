const fs = require('fs');

const getWordsWithFiveLetters = (words) => {
    const fiveLettersWords = []
    for (let i = 0; i < words.length; i++) {
        if (words[i].length === 5) {
            fiveLettersWords.push(words[i].toLowerCase())
        }
    }

    return fiveLettersWords
}

const parseWordsToArray = (data) => { return data.split(/\r?\n/); }

fs.readFile('./palavras.txt', 'utf8', (err, data) => {
    console.clear()
    if (err) {
        console.error(err);
        return;
    }

    const fiveLettersWords = {
        words: getWordsWithFiveLetters(parseWordsToArray(data))
    }

    fs.writeFile('fiveLettersWords.json', JSON.stringify(fiveLettersWords), {}, () => {
        console.log('salvo')
    })
});