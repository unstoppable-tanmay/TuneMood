const natural = require('natural');

// const classifier = new natural.BayesClassifier();
var classifier;
natural.BayesClassifier.load('text-emotion-model.json',null,(err,model)=>{
    classifier=model;
    console.log(classifier.classify("hey are you good"))
})
