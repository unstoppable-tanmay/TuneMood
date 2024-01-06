const natural = require('natural');
const fs = require("fs");
const csvParser = require("csv-parser");

// const classifier = new natural.BayesClassifier();
const mood_map = ['sadness', 'joy', 'love', 'anger', 'fear', 'surprise']
const mood_val = { 'sadness': 0, 'joy': 1, 'love': 2, 'anger': 3, 'fear': 4 }

// Initiating the model with loading the model from the folder
const init_text_analysis_model = (model_path) => {
    return new Promise((resolve, reject) => {
        natural.BayesClassifier.load(model_path, null, (err, model) => {
            err ? reject(err) : resolve(model)
        })
    })
}

// Getting the mood from the model with the text data
const get_mood_data_form_text = (classifier, text) => {
    try {
        if (text.trim() == "") return false;
        return classifier.classify(text);
    } catch (error) {
        return error
    }
}


// Testing Function
const _test_text_analysis = (classifier) => {
    const testData = [];
    var counter = 0
    fs.createReadStream("./data/test.csv")
        .pipe(csvParser())
        .on("data", (data) => {
            testData.push(data);
        })
        .on("end", () => {
            for (const element of testData) {
                if (classifier.classify(element.text) != mood_map[element.label]) {
                    console.log(classifier.classify(element.text), mood_map[element.label])
                    counter++;
                }
            }
            console.log(counter)
        });
}

// _test_text_analysis(model)  // For Testing The Model

// (async () => {
//     const text_classifier = await init_text_analysis_model("./model/text-emotion-model-416k-chunk.json")
//     console.log(get_mood_data_form_text(text_classifier, ""))
// })()

module.exports = { init_text_analysis_model, get_mood_data_form_text, mood_map, mood_val, }