<template lang="html">
  <div class="test-network">
    <div class="network">
      <div class="layer">
        <h2>Inputs</h2>
        <br>
        <input-value v-for="(value, index) in input" :value="value" :index="index"></input-value>
      </div>
      <div v-for="(layer, l) in network" class="layer">
        <h2>Layer {{ l }}</h2>
        <br>
        <artificial-neuron v-for="(neuron, index) in layer" :neuron="neuron" :index="index"></artificial-neuron>
      </div>
      <div class="layer">
        <h2>Outputs</h2>
        <br>
        <output-value v-for="(neuron, index) in network[network.length - 1]" :value="neuron.output" :index="index"></output-value>
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
      network: createNetwork(2, 2, 3, 2),
      input: [0, 1],
      momentum: 0.2
    }
  },
  methods: {
    propagate () { propagate(this.input, this.network) },
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
