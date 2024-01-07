imageRoute.route('/').post(upload.single('image'), async function (req, res) {
    try {
        const imageName = req.file.filename
        faceDetect("./images/" + imageName)
            .then((result) => {
                mood = result?.expressions.asSortedArray()[0].expression
                csv.mapFile('./songs/data/audio_file.csv', function (err, data) {
                    res.send(data.filter((ele) => { 
                        return ele.mood == song_mapping(result?.expressions.asSortedArray()[0].expression) 
                    }))
                });
            })
            .finally(() => {
                fs.unlinkSync("./images/" + imageName);
            })
    } catch (error) {
        res.status(500).json({ error: "internal error" });
    }
});