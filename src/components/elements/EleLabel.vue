<template>
  <div class="ele-l" ref="ell">
    <EleHeader title="Label" color="#008000" :id="`${nodeId}`"/>
    <el-input
      v-model="inputValue"
      placeholder="Label"
      size="small"
      @blur="completeInput"
      clearable
      df-inputlabelvalue
    >
    </el-input>
  </div>
</template>

<script setup>
import { defineComponent, ref, getCurrentInstance, onMounted, nextTick } from 'vue'
import EleHeader from './EleHeader.vue'
defineComponent({
  components: {
    EleHeader,
  }
})
const ell = ref(null)
const df = getCurrentInstance().appContext.config.globalProperties.$df.value
const nodeId = ref(0)
const dataNode = ref({})
onMounted(async () => {
  await nextTick()
  nodeId.value = ell.value.parentElement.parentElement.id.slice(5)
  dataNode.value = df.getNodeFromId(nodeId.value)
  console.log(dataNode.value.data.id)
  if (dataNode.value.data.id == nodeId.value) {
    inputValue.value = dataNode.value.data.data.label
  }
  else {
    dataNode.value.data.label = inputValue.value
    df.updateNodeDataFromId(nodeId.value, dataNode.value)
  }
})
const inputValue = ref('')
const completeInput = () => {
  dataNode.value.data.label = inputValue.value
  df.updateNodeDataFromId(nodeId.value, dataNode.value)
}
</script>

<style scoped>
</style>