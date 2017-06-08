const logistic = x => 1 / (1 + Math.pow(Math.E, -x))
// const squaredError = (output, target) => 0.5 * Math.sqrt(Math.pow(target - output, 2))

// const randomBetween = (a, b) => a + Math.random() * (b - a)
// const randomSymmetric = r => randomBetween(-r, r)
// const initialWeights = (inputCount, outputCount) => {
//   const r = 4 * Math.sqrt(6 / (inputCount + outputCount))
//   return new Array(inputCount).fill(0).map(() => randomSymmetric(r))
// }
const initialWeights2 = inputCount => new Array(inputCount).fill(0).map(x => Math.random() * inputCount * Math.sqrt(2 / inputCount))

const weightedSum = (array, weights) => array
  .map((x, i) => (x * weights[i]) / array.length)
  .reduce((a, b) => a + b)

const scaledDelta = (output, delta) => delta * output * (1 - output)
const deltaOutput = (output, target) => scaledDelta(output, output - target)
const deltaHidden = (output, deltas, weights) => scaledDelta(output, deltas.map((x, i) => x * weights[i]).reduce((a, b) => a + b))

// calculate output
const forward = (inputs, weights) => logistic(weightedSum(inputs, weights))
// calculate adjusted weights
const back = (inputs, weights, delta, learningRate) => inputs.map((x, i) => weights[i] - learningRate * x * delta)

const neuronPrototype = {
  forward (inputs) {
    this.inputs = inputs
    this.output = forward(inputs, this.weights)
  },
  back (delta, learningRate, momentum = 0) {
    this.delta = delta
    this.previousWeights = this.weights
    this.weights = back(this.inputs, this.weights, delta, learningRate)
    if (momentum && this.previousWeights) {
      this.weights.map((x, i) => (1 - momentum) * x + momentum * this.previousWeights[i])
    }
  }
}

export const createNeuron = (inputCount, outputCount) => Object.assign(Object.create(neuronPrototype), {
  inputs: new Array(inputCount).fill(0),
  weights: initialWeights2(inputCount, outputCount),
  previousWeights: null,
  output: 0,
  delta: 0
})

export const createLayer = (neuronCount, inputCount, outputCount = 1) => new Array(neuronCount).fill(null).map(x => createNeuron(inputCount, outputCount))

export const createNetwork = (...counts) => counts.slice(1).map((x, i) => createLayer(x, counts[i], counts[i + 2]))

export const propagate = (input, network) => network.forEach((layer, l) =>
  layer.forEach((neuron, i) =>
    neuron.forward(l === 0 ? input : network[l - 1].map(n => n.output))
  )
)

export const backPropagate = (target, network, learningRate = 0.3, momentum = 0) => [...network].reverse().forEach((layer, l) =>
  layer.forEach((neuron, i) => {
    const delta = l === 0
      ? deltaOutput(neuron.output, target[i])
      : deltaHidden(neuron.output, network[network.length - l].map(n => n.delta), network[network.length - l].map(n => n.weights[i]))
    neuron.back(delta, learningRate, momentum)
  })
)
