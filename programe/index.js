let startTime = new Date().getTime();
translate();
let finishTime = new Date().getTime();
document.getElementById("time").innerHTML=`Time taken to process  ${(finishTime - startTime)/1000} Seconds`;
document.getElementById("memory").innerHTML=` Memory taken to process ${(performance.memory.usedJSHeapSize) / 1024 / 1024}`;

function translate() {

    // read all text files
    Promise.all([
        fetch('t8.shakespeare.txt').then(x => x.text()),
        fetch('french_dictionary.csv').then(x => x.text())
    ]).then(([input, dictionary]) => {

        // modify the text for our requirement
        let inputFileText = input.toLowerCase();
        let dictionaryFileText = dictionary.replace(/[\r\n]+/gm, ",").split(",");

        // creating dictionary object
        let frenchArr = [], englishArr = [],dictionaryObj = {};
        for (let i = 0; i < dictionaryFileText.length; i++) {
            if ((i + 2) % 2 == 0) { englishArr.push(dictionaryFileText[i]); }
            else { frenchArr.push(dictionaryFileText[i]); }
        }

        for (var i = 0; i < englishArr.length; i++) {
            dictionaryObj[englishArr[i]] = frenchArr[i];
        }//console.log(dictionaryObj);

        // replace the english to french using the dictionary
        let output = inputFileText.replace(/(\w+)/g, (value, key) => dictionaryObj[key] || value);
        document.getElementById("result").innerHTML = output;

        // getting frequency of each words
        let text = "<tr><th> &#160; English</th><th>French</th><th>Count</th></tr>";
        englishArr.forEach(function (englishWord, indexOfEnglishWord) {
            let frenchWord = frenchArr[indexOfEnglishWord];
            let count = inputFileText.match(new RegExp(englishWord, "g")).length;
            text += `<tr> <td> &#160; ${englishWord}</td> <td>${frenchWord}</td> <td>${count}<td> </tr>`;
            document.getElementById("frequency").innerHTML = text;
        });
    });
}