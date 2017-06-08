<template lang="html">
  <div class="input">
    <strong>In {{ index }}</strong>
    <div class="input-value">
      <div class="box">
        {{ value.toFixed(2) }}
      </div>
      <div class="box">
        <i class="fa fa-caret-right"></i> {{ index }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'index']
}
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  margin: 0 0 16px 16px;
}

.input-value {
  display: flex;
  margin-bottom: 2px;
  margin-right: 12px;
}

.box {
  border: 1px solid darkgray;
  padding: 2px 5px;

  &:not(:first-child) {
    border-left: unset;
  }
}
</style>
