<template>
  <div class="ele-inst">
    <EleHeader title="Instruction"/>
    <el-select v-model="selectedInst" class="m-2" placeholder="Select" size="small">
      <el-option
        v-for="inst in insts"
        :key="inst.name"
        :label="inst.name"
        :value="inst.name"
        />
    </el-select>
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
const insts = [
  {name: 'vaddps'},
  {name: 'vsubps'},
]
const selectedInst = ref('')
// TODO: data write back
</script>

<style scoped>
</style>