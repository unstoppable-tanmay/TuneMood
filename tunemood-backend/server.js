var express = require("express");
const fs = require("fs");

var app = express();
const port = 4000;

var analyzeRoute = require("./routes/analyze");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/analyze", analyzeRoute);

app.get("/", async (req, res) =>
  fs.readFile(
    "./song-models/danceability/danceability-musicnn-msd-2/model.json",
    (err, data) => {
      res.json(JSON.parse(data));
    }
  )
);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// https://github.com/RahulGaonkar/Music-Sentiment-Analysis
// https://blog.logrocket.com/sentiment-analysis-node-js/
// https://cs310.hashnode.dev/audio-features-extraction-with-javascript-and-essentia
