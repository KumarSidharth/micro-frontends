<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div></div>
    <label>Post message</label>&nbsp;
    <output>{{postMessage}}</output>
    <br />
    <label>localStorage</label>&nbsp;
    <output>{{storage}}</output>
    <br />
    <label>Send Post Message to React</label>
    <input :on-change="this.sendPostMessageToParent()" v-model="inputPostMessageValue"/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      postMessage: '',
      storage: '',
      inputPostMessageValue: ''
    }
  },
  methods: {
    receivePostMessage (event) {
      console.log(event);
      if (event.origin === "http://localhost:3000") {
        this.postMessage = event.data;
      }
    },
    receiveLocalStorageData (event) {
      console.log(event);
    },
    sendPostMessageToParent () {
      window.parent.postMessage(this.inputPostMessageValue, "http://localhost:3000");
    }
  },
  mounted() {
    window.addEventListener('message', this.receivePostMessage);
    window.addEventListener('storage', this.receiveLocalStorageData);
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
}
</style>
