const decode = require("audio-decode");
const { Essentia, EssentiaWASM, EssentiaModel } = require("essentia.js");
const fs = require('fs')
const csvParser = require("csv-parser");

const tf = require('@tensorflow/tfjs-node')

const essentia = new Essentia(EssentiaWASM);

// const modelURL = "http://localhost:4000/"
// const musicnn = new EssentiaModel.EssentiaTensorflowJSModel(tf, modelURL);

// musicnn.initialize()

const inputFeatureExtractor = new EssentiaModel.EssentiaTFInputExtractor(EssentiaWASM, "musicnn", false);


// console.log(musicnn)


const decodeAudio = async (filepath) => {
    const buffer = fs.readFileSync(filepath);
    const audio = await decode(buffer);
    const audioVector = essentia.arrayToVector(audio.data[0]);
    return audioVector;
};

const findAudio = async (filepath) => {
    await musicnn.initialize();

    const buffer = fs.readFileSync(filepath);
    const audio = await decode(buffer);

    let inputMusiCNN = inputFeatureExtractor.computeFrameWise(audio.data[0]);
    let predictions = await musicnn.predict(inputMusiCNN, true);

    return predictions;
}


const findMood = async (filepath) => {
    const KEYS = ["C", "D", "E", "F", "G", "A", "B"];

    const data = await decodeAudio(filepath);

    const danceability = essentia.Danceability(data).danceability;
    const duration = essentia.Duration(data).duration;
    const energy = essentia.Energy(data).energy;

    const computedKey = essentia.KeyExtractor(data, true, 4096, 4096, 12, 3500, 60, 25, 0.2, 'bgate', 16000, 0.0001, 440, 'cosine', 'hann');
    const key = KEYS.indexOf(computedKey.key);
    const mode = computedKey.scale === "major" ? 1 : 0;

    const loudness = essentia.DynamicComplexity(data).loudness;
    const tempo = essentia.PercivalBpmEstimator(data).bpm;

    return {
        danceability,
        duration,
        energy,
        key,
        mode,
        loudness,
        tempo,
    };
}


const getMood = async () => {
    // console.log(await findMood('./songs/gulimata.mp3'))
    // console.log(await findMood('./songs/leo.mp3'))
    // console.log(await findAudio('./songs/leo.mp3'))
    var trainingData = []
    var trainedModel = []
    fs.createReadStream("./songs/audio_file.csv")
        .pipe(csvParser())
        .on("data", (data) => {
            trainingData.push(data);
        })
        .on("end", () => {
            trainingData.slice(0, 2).forEach(async (val, ind) => {
                trainedModel.push(val)
                const features = await findMood("./songs/AUDIO_FILE/" + val.song_name);
                trainedModel[ind] = { ...val, ...features }
            })
        });
}
getMood()



// {
//     danceability: 1.1512587070465088,
//     duration: 290.63836669921875,
//     energy: 819255.5,
//     computedKey: { key: 'Ab', scale: 'minor', strength: 0.8394291996955872 },
//     key: -1,
//     mode: 0,
//     loudness: -16.141521453857422,
//     tempo: 50.54248046875
//   }
// {
//     danceability: 1.1730338335037231,
//     duration: 254.1975555419922,
//     energy: 1404917.375,
//     computedKey: { key: 'C', scale: 'minor', strength: 0.8981643319129944 },
//     key: 0,
//     mode: 0,
//     loudness: -12.711812019348145,
//     tempo: 87.96542358398438
//   }