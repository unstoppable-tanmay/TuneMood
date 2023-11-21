var express = require('express');

var app = express();
const port = 4000

var analyzeRoute = require('./routes/analyze');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/analyze', analyzeRoute);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


// https://github.com/RahulGaonkar/Music-Sentiment-Analysis
// https://blog.logrocket.com/sentiment-analysis-node-js/
// https://cs310.hashnode.dev/audio-features-extraction-with-javascript-and-essentia