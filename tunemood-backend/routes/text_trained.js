const express = require('express');
const path = require('path')
const { init_text_analysis_model, get_mood_data_form_text } = require("../text/analysis.js")
var csv = require('node-csv').createParser();

const textTrainedRoute = express.Router();

// ['sadness', 'joy', 'love', 'anger', 'fear', 'surprise']

// ['happy','calm','energetic','sad']

const text_mapping = (text_mood) => {
    if (['fear', 'surprise'].includes(text_mood)) return 'happy'
    if (['love', 'anger'].includes(text_mood)) return 'calm'
    if (['joy'].includes(text_mood)) return 'energetic'
    if (['sadness'].includes(text_mood)) return 'sad'
}

textTrainedRoute.route('/').post(async function (req, res, next) {
    console.log(req.body)
    try {
        const model = await init_text_analysis_model(path.resolve(__dirname, '../text/model/text-emotion-model-416k-chunk.json'))

        const ans = get_mood_data_form_text(model, req.body.data)
        csv.mapFile('./audio_file.csv', function (err, data) {
            res.status(200).send(data.filter((ele) => ele.mood == text_mapping(ans)));
        });

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "internal error" });
    }
});

module.exports = textTrainedRoute;