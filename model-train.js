const tf = require("@tensorflow/tfjs-node");
const neatCsv = require("neat-csv");
const fs = require("fs").promises;

// Load the CSV file with audio embeddings
const csvPath = "./output_embeddings.csv";

// Function to load CSV data
async function loadCSV() {
  const data = await fs.readFile(csvPath, "utf-8");
  const parsedData = await neatCsv(data);

  // Extract embeddings and labels
  const embeddings = parsedData.map((row) => row.slice(2).map(parseFloat)); // Assuming embeddings start from index 2
  const labels = parsedData.map((row) => row[1]); // Assuming the mood column is at index 1

  return { embeddings, labels };
}

// Function to preprocess data and train the model
async function trainModel() {
  // Load CSV data
  const { embeddings, labels } = await loadCSV();

  // Convert labels to numerical values
  const uniqueLabels = Array.from(new Set(labels));
  const labelMap = new Map(uniqueLabels.map((label, index) => [label, index]));
  const yTrain = labels.map((label) => labelMap.get(label));

  // Convert data to tensors
  const xTrain = tf.tensor2d(embeddings);

  // Define a simple neural network model
  const model = tf.sequential({
    layers: [
      tf.layers.dense({
        inputShape: [embeddings[0].length],
        units: 64,
        activation: "relu",
      }),
      tf.layers.dense({ units: uniqueLabels.length, activation: "softmax" }),
    ],
  });

  // Compile the model
  model.compile({
    optimizer: tf.train.adam(),
    loss: "sparseCategoricalCrossentropy",
    metrics: ["accuracy"],
  });

  // Train the model
  await model.fit(xTrain, yTrain, {
    epochs: 50,
    shuffle: true,
    validationSplit: 0.2,
  });

  // Save the model
  await model.save("file://model_of_two_songs");
}

// Train the model
trainModel();
