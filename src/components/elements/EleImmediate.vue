<template>
  <div class="ele-imm">
    <EleHeader title="Immediate"/>
    <el-input
      v-model="input"
      placeholder="Immediate"
      class="input-with-select"
      size="small"
      clearable
      >
      <template #prepend>
        <el-select v-model="select" placeholder="Select" size="small" style="width: 100px">
          <el-option label="Binary" value="0" />
          <el-option label="Octal" value="1" />
          <el-option label="Decimal" value="2" />
          <el-option label="Hexadecimal" value="3" />
        </el-select>
      </template>
    </el-input>
  </div>
</template>

<script setup>
import { defineComponent, ref } from 'vue'
import EleHeader from './EleHeader.vue'
defineComponent({
  components: {
    EleHeader
  }
})
const input = ref('')
const select = ref('')
// TODO: data write back
</script>

<style scoped>
</style>