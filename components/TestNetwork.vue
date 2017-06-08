<template lang="html">
  <div class="test-network">
    <div class="network">
      <div class="layer">
        <h2>Inputs</h2>
        <br>
        <input-value v-for="(value, index) in inputs" :value="value" :index="index"></input-value>
      </div>
      <div v-for="(layer, l) in network" class="layer">
        <h2>Layer {{ l }}</h2>
        <br>
        <artificial-neuron v-for="(neuron, index) in layer" :neuron="neuron" :index="index"></artificial-neuron>
      </div>
      <div class="layer">
        <h2>Target</h2>
        <br>
        <output-value v-for="(value, index) in desiredOutputs" :value="value" :index="index"></output-value>
      </div>
    </div>
    <div class="buttons">
      <button @click="propagate">Propagate</button>
      <button @click="backPropagate">Backpropagate</button>
      <button @click="train">Train (1000 iterations)</button>
    </div>
  </div>
</template>

<script>
import InputValue from './InputValue.vue'
import OutputValue from './OutputValue.vue'
import ArtificialNeuron from './ArtificialNeuron.vue'
import {createNetwork, propagate, backPropagate} from '~assets/ann'

export default {
  data () {
    return {
      layers: 3,
      neuronsPerLayer: 3,
      // network: createNetwork(2, 2, 2, 2),
      inputs: [0, 1, 0],
      desiredOutputs: [0.75, 0.1, 0.3],
      momentum: 0.2
    }
  },
  computed: {
    hiddenLayers () { return new Array(this.layers - 1).fill(this.neuronsPerLayer) },
    network () { return createNetwork(...[3, ...this.hiddenLayers, 3]) }
  },
  methods: {
    propagate () { propagate(this.inputs, this.network) },
    backPropagate () { backPropagate([0.75, 0.1], this.network, this.momentum) },
    train () {
      for (let i = 0; i < 1000; i++) {
        this.propagate()
        this.backPropagate()
      }
    }
  },
  components: {
    InputValue,
    OutputValue,
    ArtificialNeuron
  }
}
</script>

<style lang="scss" scoped>
.test-network {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.network {
  display: flex;
}
.layer {
  display: flex;
  flex-direction: column;
  margin: 0 15px;

  &:first-child {
    border-right: 1px solid darkgray;
  }

  &:last-child {
    border-left: 1px solid darkgray;
  }
}
.buttons {
  display: flex;
  justify-content: space-between;

  button {
    width: 30%;
    padding: 5px;
    border: 1px solid darkgray;
    background-color: #EEE;
    margin-top: 2rem;
    cursor: pointer;

    &:hover {
      background-color: #DDD;
    }
  }
}
</style>
