let upload = document.getElementById("upload");
let inputFileText;
let dictionary = document.getElementById("dictionary");
let dictionaryFileText;
let find = document.getElementById("find");
let findFileText;

function myFunction() {

    let startTime = performance.now();
    // get the input file text

    let fr = new FileReader();
    fr.readAsText(upload.files[0]);
    fr.onload = function () {
        inputFileText = fr.result.toLowerCase().replace(/[\n]+/gm, "<br>"); //console.log(inputFileText);

        // get the english and french dictionary
        let fr2 = new FileReader();
        fr2.readAsText(dictionary.files[0]);
        fr2.onload = function () {
            dictionaryFileText = fr2.result.replace(/[\r]+/gm, ",").replace(/[\n]+/gm, "").split(",");

            let frenchArr = [], englishArr = [];
            for (let i = 0; i < dictionaryFileText.length; i++) {
                if ((i + 2) % 2 == 0) { englishArr.push(dictionaryFileText[i]); } 
                else { frenchArr.push(dictionaryFileText[i]); }
            }

            let dictionaryObj = {};
            for (var i = 0; i < englishArr.length; i++) {
                dictionaryObj[englishArr[i]] = frenchArr[i];
            }//console.log(dictionaryObj); 

            let output = inputFileText.replace(/(\w+)/g, (value,key)=>dictionaryObj[key]||value);
             document.getElementById("result").innerHTML = output;
            
            // geting words to find with frequency
            let fr3 = new FileReader();
            fr3.readAsText(find.files[0]);
            fr3.onload = function () {
                findFileText = fr3.result.split("\n");  //console.log(findFileText);

                // gettting frequency of translated words
                let text = "<tr><th>English</th><th>French</th><th>Count</th></tr>";
                findFileText.forEach(function (englishWord, indexOfEnglishWord) {
                    let frenchWord = frenchArr[indexOfEnglishWord];
                    let count = inputFileText.match(new RegExp(englishWord,"g")).length;
                    text += `<tr> <td>${englishWord}</td> <td>${frenchWord}</td> <td>${count}<td> </tr>`;
                    document.getElementById("frequency").innerHTML = text;
                });  
                let result = (inputFileText!= output)?true:false; console.log(result); // for testing purpose (the translation function is success or failed )
            }
        }
    }

    let finishTime = performance.now();
    document.getElementById("time").innerHTML = (`Time taken to process  ${(finishTime - startTime)/1000} seconds`);
    document.getElementById("memory").innerHTML = (`Memory taken to process ${performance.memory.usedJSHeapSize / 1024/1024} mb`);
}