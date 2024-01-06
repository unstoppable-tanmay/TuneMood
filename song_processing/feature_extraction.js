const decode = require("audio-decode");
const { Essentia, EssentiaWASM } = require("essentia.js");
const fs = require('fs')


const essentia = new Essentia(EssentiaWASM);


// Returns The Vector Float Of the given song file_path
const decodeAudio = async (filepath) => {
    const buffer = fs.readFileSync(filepath);
    const audio = await decode(buffer);
    // console.log(audio._data)
    return essentia.arrayToVector(audio._data);
};


// Extract Features From Song with Essentia.js
const extract_features_from_song = async (filepath) => {
    const KEYS = ["C", "D", "E", "F", "G", "A", "B"];

    const data = await decodeAudio(filepath);
    
    const danceability = essentia.Danceability(data).danceability;
    const duration = essentia.Duration(data).duration;
    const energy = essentia.Energy(data).energy;
    
    const computedKey = essentia.KeyExtractor(data);
    const key = KEYS.indexOf(computedKey.key);
    const mode = computedKey.scale === "major" ? 1 : 0;
    
    const loudness = essentia.DynamicComplexity(data).loudness;
    const tempo = essentia.PercivalBpmEstimator(data).bpm;
    
    console.log({
        danceability,
        energy,
        computedKey, 
        loudness,
        tempo,
    })

    return {
        danceability,
        duration,
        energy,
        computedKey,
        key,
        mode,
        loudness,
        tempo,
    };
}

extract_features_from_song('./AUDIO_FILE/aaj-phir.mp3')
extract_features_from_song('./AUDIO_FILE/ajnabi-hawayein.mp3')
extract_features_from_song('./AUDIO_FILE/ban-than.mp3')