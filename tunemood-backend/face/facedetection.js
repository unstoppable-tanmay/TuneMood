const { faceDetect } = require('ai-face-detection')

const imageFromUrl = 'https://images.unsplash.com/photo-1584518969469-c2d99c7760a0?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5ncnklMjBmYWNlfGVufDB8fDB8fHww'

faceDetect(imageFromUrl)
    .then((result) => {
        console.log(
            `Face detected gender: ${result?.gender} with probability ${result?.genderProbability}`
        )
        console.log(`Face detected age: ${result?.age}`)
        console.log(`Face detected expressions:`)
        console.log(result?.expressions.asSortedArray())
    })
    .catch((err) => {
        logger.error('err, ', err)
    })