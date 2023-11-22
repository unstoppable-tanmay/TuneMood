# Finding the methodes we need to do what we want

## Reference

- https://webaudioconf.com/_data/papers/pdf/2021/2021_36.pdf
- https://towardsdatascience.com/predicting-the-music-mood-of-a-song-with-deep-learning-c3ac2b45229e
- https://medium.com/blocksurvey/building-sentiment-analysis-module-using-tensorflow-js-keras-accadb77aa38

<br>

# Started The Journey

- we researched about is there any tool available that we are going to make
  - https://www.allmusic.com/moods
  - https://github.com/Chubbyman2/emotion-music-player
- we found that the websites or products available they are not as intended our idea is.
- we initiated with some basic idea
  - Grapping all the data from the user for Mood Detection like (Text,Image,Voice)
  - Finding The Mood From The Data
  - Developing a model for classifing music with mood
  - and then connect all these models and data to recommend songs to the user

<br>

## Model Training For Text Mood Classification

- We Trained The NLP model with 19000 data and we get nearly 75% accuracy.
- Then We Trained with 416000 data from twitter and we get nearly 96% accuracy.
- Then the model is ready for giving the mood with the chatting text

<br>

## Model For Face Detection

- we used a pretrained face detection model to get the mood of the user with many more details that can help us for reccomend songs more accuratly

<br>

## Model For Song Classification

- we are using a tool for getiing the features of a music with "Esentia.js"
- we are training the model with these features with some data we collected our own
- we collected 50 - 60 songs from youtube and classify them in a scale of mood
- and we trained the model
- although this is not so accurate but we are trying to add more data and retraining the model

<br>

## UI developement

- we develped a simple UI for interacting with user and recomending the songs
- we enables user to select any of method for sharing mood with us
- then the songs are recommended with the mood of data given and the history is saved for further classification
