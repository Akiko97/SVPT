<template>
  <div class="ele-m" ref="elm">
    <EleHeader title="Memory" color="#e3e3e370" :id="`${nodeId}`"/>
    <el-input
      v-model="inputValue"
      placeholder="Memory"
      size="small"
      @blur="completeInput"
      clearable
      df-inputmemvalue
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
const elm = ref(null)
const df = getCurrentInstance().appContext.config.globalProperties.$df.value
const nodeId = ref(0)
const dataNode = ref({})
onMounted(async () => {
  await nextTick()
  nodeId.value = elm.value.parentElement.parentElement.id.slice(5)
  dataNode.value = df.getNodeFromId(nodeId.value)
  if (dataNode.value.data.label) {
    inputValue.value = dataNode.value.data.label
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