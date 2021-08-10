<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!--<editor/>-->
    <elementTest/>
    <!--<wangEditor1/>-->
    <template>
      <WangEditor :text="text" class="text" @change="changeText" />
    </template>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
/*import editor from "./editor.vue";*/
import elementTest from "@/view/elementTest";
/*import wangEditor1 from "@/wangEditor";*/
import WangEditor  from "@/view/newwang";
export default {
  name: 'App',
  components: {
    HelloWorld,
/*    editor,*/
    elementTest,
   /* wangEditor1,*/
    WangEditor
  },
  data() {
    return {
      text:''
    }
  },
  methods:{
    changeText(val) {
      // 文本更改
      this.text = val;
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
