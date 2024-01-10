const express = require('express');
const path = require('path')
const fs = require("fs");
const multer = require('multer')
const { faceDetect } = require('ai-face-detection')
var csv = require('node-csv').createParser();

const imageRoute = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

// [neutral, happy, sad, angry, fearful, disgusted, surprised]

// ['happy','calm','energetic','sad']

const song_mapping = (face_mood) => {
    if (['fearful', 'surprised'].includes(face_mood)) return 'happy'
    if (['disgusted', 'angry'].includes(face_mood)) return 'calm'
    if (['happy'].includes(face_mood)) return 'energetic'
    if (['sad'].includes(face_mood)) return 'sad'
    if (['neutral'].includes(face_mood)) return ['happy', 'calm', 'energetic', 'sad'].at(Math.round(0 + Math.random() * (3 - 0)))
}

const upload = multer({ storage: storage })

imageRoute.route('/').post(upload.single('image'), async function (req, res) {
    console.log(req.file)
    try {
        const imageName = req.file.filename
        faceDetect("./images/" + imageName)
            .then((result) => {
                mood = result?.expressions.asSortedArray()[0].expression
                console.log(mood)
                csv.mapFile('./audio_file.csv', function (err, data) {
                    res.send(data.filter((ele) => { 
                        return ele.mood == song_mapping(result?.expressions.asSortedArray()[0].expression) 
                    }))
                });
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
            .finally(() => {
                fs.unlinkSync("./images/" + imageName);
            })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ error: "internal error" });
    }
});

module.exports = imageRoute;


// 8460128381