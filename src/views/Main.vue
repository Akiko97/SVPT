<template>
  <div id="main">
    <Canvas/>
  </div>
</template>

<script setup>
import { defineComponent } from 'vue'
import Canvas from '../components/Canvas.vue'
defineComponent({
    components: {
      Canvas
    }
})
</script>

<style scoped>
#main {
  border-radius: 8px; 
  border: 1px solid #494949;
  max-width: calc(100vw - 40px);
  max-height:  calc(100vh - 40px);
  padding: 0;
  background: #181818;
  color: #f7f7f7;
}
</style>