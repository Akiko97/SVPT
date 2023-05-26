<template>
  <div class="ele-header" :style="`background: ${color};`">
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
  color: {
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
  margin-top: -16px;
  margin-left: -16px;
  margin-right: -16px;
  padding: 10px 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
</style>