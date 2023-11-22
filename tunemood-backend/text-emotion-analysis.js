const natural = require('natural');
const fs = require("fs");
const csvParser = require("csv-parser");

// const classifier = new natural.BayesClassifier();
const mood = ['sadness', 'joy', 'love', 'anger', 'fear', 'surprise']
// const moodMap = { 'sadness': 0, 'joy': 1, 'love': 2, 'anger': 3, 'fear': 4 }
var classifier;
natural.BayesClassifier.load('./text-emotion-model-416k-chunk.json', null, (err, model) => {
    classifier = model;
    console.log(classifier.classify("why are you here"))





    const testData = [];
    var counter = 0
    fs.createReadStream("./text-models/test.csv")
        .pipe(csvParser())
        .on("data", (data) => {
            testData.push(data);
        })
        .on("end", () => {
            for (const element of testData) {
                if (classifier.classify(element.text) != mood[element.label]) {
                    console.log(classifier.classify(element.text), mood[element.label])
                    counter++;
                }
            }
            console.log(counter)
        });
})
