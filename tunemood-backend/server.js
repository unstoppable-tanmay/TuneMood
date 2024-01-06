var express = require("express");
const fs = require("fs");
const cors = require('cors')

var app = express();
const port = 4000;

var textTrainedRoute = require("./routes/text_trained");
const imageRoute = require("./routes/image_trained.");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use("/text", textTrainedRoute);
app.use("/image", imageRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// https://github.com/RahulGaonkar/Music-Sentiment-Analysis
// https://blog.logrocket.com/sentiment-analysis-node-js/
// https://cs310.hashnode.dev/audio-features-extraction-with-javascript-and-essentia