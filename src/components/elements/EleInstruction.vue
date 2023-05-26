<template>
  <div class="ele-inst" ref="eli">
    <EleHeader title="Instruction"/>
    <el-select
      v-model="selectedInst"
      class="m-2"
      placeholder="Select"
      size="small"
      @change="changeInst">
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
import { defineComponent, ref, getCurrentInstance, onMounted, nextTick } from 'vue'
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
const eli = ref(null)
const df = getCurrentInstance().appContext.config.globalProperties.$df.value
const nodeId = ref(0)
const dataNode = ref({})
onMounted(async () => {
  await nextTick()
  nodeId.value = eli.value.parentElement.parentElement.id.slice(5)
  dataNode.value = df.getNodeFromId(nodeId.value)
  if (dataNode.value.data.instruction) {
    selectedInst.value = dataNode.value.data.instruction
  }
  else {
    dataNode.value.data.instruction = selectedInst.value
    df.updateNodeDataFromId(nodeId.value, dataNode.value)
  }
})
const changeInst = () => {
  dataNode.value.data.instruction = selectedInst.value
  df.updateNodeDataFromId(nodeId.value, dataNode.value)
}
</script>

<style scoped>
</style>