const natural = require('natural');
const csv = require('node-csv').createParser()

const fs = require("fs");
const csvParser = require("csv-parser");

const classifier = new natural.BayesClassifier();

const mood = ['sadness', 'joy', 'love', 'anger', 'fear', 'surprise']

const trainingData = [];

const fetchTrainingData = (filepath) => {
    fs.createReadStream(filepath)
        .pipe(csvParser())
        .on("data", (data) => {
            trainingData.push(data);
        })
        .on("end", () => {
            for (const element of trainingData) {
                classifier.addDocument(element.text, mood[element.label]);
            }
            classifier.train();
            classifier.save("text-emotion-model.json")
            console.log("Succesfully Trained")
        });
}

fetchTrainingData("./text-models/training.csv")






// csv.mapFile('./text-models/test.csv', function (err, data) {
//     for (const element of data) {
//         // console.log(element.text, mood[element.label])
//         classifier.addDocument(element.text, mood[element.label]);
//     }
//     classifier.train();

//     console.log(classifier.classify('im feeling quite sad and sorry for myself but ill snap out of it soon')); // spam
//     console.log(classifier.classify('i am just feeling cranky and blue')); // regular
// });