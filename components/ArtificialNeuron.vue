<template lang="html">
  <div class="neuron">
    <strong>Neuron {{ index }}</strong>
    <div class="value-display">
      <div v-if="neuron.inputs.length" class="input-addons">
        <div v-for="(input, i) in neuron.inputs" class="input-addon box">
          {{ i }}
          <i class="fa fa-caret-right"></i>

        </div>
      </div>
      <div class="central-column">
        <div v-if="neuron.inputs.length" class="weights box">
          <div v-for="(input, i) in neuron.inputs" class="weight">
            <span class="input-value">{{ input.toFixed(2) }}</span>
            <i class="fa fa-caret-left horizontal-divider"></i>
            <strong>{{ neuron.weights[i].toFixed(2) }}</strong>
          </div>
        </div>
        <i class="fa fa-angle-down vertical-divider"></i>
        <div class="outputs box">
          <span class="output">
            {{ neuron.output.toFixed(2) }}
          </span>
          <i class="fa fa-flash horizontal-divider"></i>
          <span class="delta">
            {{ neuron.delta.toFixed(2) }}
          </span>
        </div>
      </div>
      <div class="output-addons">
        <div class="output-addon box">
           <i class="fa fa-caret-right"></i> {{ index }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['neuron', 'index']
}
</script>

<style lang="scss" scoped>
.neuron {
  display: flex;
  flex-direction: column;
  margin: 0 5px 15px 5px;
}

.value-display {
  display: flex;
}

.central-column {
  display: flex;
  flex-direction: column;
}

.input-addons {
  display: flex;
  flex-direction: column;

  .input-addon {
    border: 1px solid darkgray;
    border-right: unset;
    padding: 2px 5px;
    margin-bottom: 2px;

    .input-value {
      margin-left: 3px;
      // color: darkgray;
    }
  }
}

.output-addons {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .output-addon {
    border: 1px solid darkgray;
    border-left: unset;
    padding: 2px 5px;
  }
}

.box {
  border: 1px solid darkgray;
}

.weights {
  padding: 2px 5px;
  // align-self: stretch;
  // border-bottom: 1px solid darkgray;

  .weight {
    &:not(:last-child) {
      margin-bottom: 8px;
    }

    i {
      margin: 0 3px;
    }
  }
}

.vertical-divider {
  margin: -2px 0;
}

.horizontal-divider {
  width: 10px;
}

.outputs {
  padding: 2px 5px;
  margin-top: 2px;

  .output {
    align-self: flex-end;
  }

  .delta, .horizontal-divider {
    color: #e49b9b;
  }
}
</style>
