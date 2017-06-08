<template>
  <section class="container">
    <i class="fa fa-github fa-2x"></i>
    <a href="https://github.com/senritsu/artificial-neural-network">
      senritsu/artificial-neural-network
    </a>
    <h1 class="title">
      Artificial Neural Network experiments
    </h1>
    <test-network></test-network>
  </section>
</template>

<script>
import TestNetwork from '~components/TestNetwork.vue'

export default {
  components: {
    TestNetwork
  }
}
</script>

<style>
.container
{
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title
{
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 100;
  font-size: 5rem;
  color: #35495e;
  letter-spacing: 1px;
  margin-bottom: 5rem;
}
.subtitle
{
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links
{
  padding-top: 15px;
}
</style>
