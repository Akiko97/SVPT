<template>
  <div class="ele-header">
    <div>{{ title }}</div>
    <div>ID: {{ id }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  title: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  }
})
</script>

<style scoped>
.ele-header {
  background: #494949;
  margin-top: -15px;
  margin-left: -15px;
  margin-right: -15px;
  padding: 10px 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
}
</style>