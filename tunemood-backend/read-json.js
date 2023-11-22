const fs = require('fs');
const readline = require('readline');
const natural = require('natural');


const classifier = new natural.BayesClassifier();


const fileStream = fs.createReadStream('./text-models/data.jsonl'); // 416809
var lastLine = [];
const mood = ['sadness', 'joy', 'love', 'anger', 'fear', 'surprise']

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});
var counter = 0;
rl.on('line', async (line) => {
    counter++;
    let data = JSON.parse(line)
    lastLine.push(data)
    classifier.addDocument(data.text, mood[data.label]);
    if (counter % 10000 == 0) {
        console.time()
        console.log("Training : ", counter)
        classifier.train()
        console.timeEnd()
        classifier.save("text-emotion-model-416k-chunk.json")
        console.log("Model Saved On : ",counter)
        console.log(classifier.classify("Yeah I Am Ok"))
    }
});

rl.on('close', () => {
    // console.time()
    // console.log("Training Started")
    // classifier.train();
    classifier.save("text-emotion-model-416k-chunk.json")
    console.log("Succesfully Trained")
    // console.timeEnd()
    // console.log(lastLine[4])
    // console.log('Finished reading the file.');
});