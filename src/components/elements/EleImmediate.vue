<template>
  <div class="ele-imm" ref="elimm">
    <EleHeader title="Immediate" color="#0808ff" :id="`${nodeId}`"/>
    <el-input
      v-model="inputValue"
      placeholder="Immediate"
      class="input-with-select"
      size="small"
      @blur="completeInput"
      clearable
      df-inputimmvalue
      >
      <template #prepend>
        <el-select
          v-model="type"
          placeholder="Select"
          size="small"
          style="width: 100px"
          @change="changeType"
          df-selectimmtype
          >
          <el-option label="Binary" value="Binary" />
          <el-option label="Octal" value="Octal" />
          <el-option label="Decimal" value="Decimal" />
          <el-option label="Hexadecimal" value="Hexadecimal" />
        </el-select>
      </template>
    </el-input>
  </div>
</template>

<script setup>
import { defineComponent, ref, getCurrentInstance, onMounted, nextTick, computed } from 'vue'
import EleHeader from './EleHeader.vue'
defineComponent({
  components: {
    EleHeader
  }
})
const inputValue = ref('')
const type = ref('')
const elimm = ref(null)
const df = getCurrentInstance().appContext.config.globalProperties.$df.value
const nodeId = ref(0)
const dataNode = ref({})
onMounted(async () => {
  await nextTick()
  nodeId.value = elimm.value.parentElement.parentElement.id.slice(5)
  dataNode.value = df.getNodeFromId(nodeId.value)
  if (dataNode.value.data.type) {
    type.value = dataNode.value.data.type
  }
  else {
    dataNode.value.data.type = type.value
    df.updateNodeDataFromId(nodeId.value, dataNode.value)
  }
  if (dataNode.value.data.value) {
    inputValue.value = dataNode.value.data.value
  }
  else {
    dataNode.value.data.value = inputValue.value
    df.updateNodeDataFromId(nodeId.value, dataNode.value)
  }
})
const changeType = () => {
  dataNode.value.data.type = type.value
  df.updateNodeDataFromId(nodeId.value, dataNode.value)
}
const completeInput = () => {
  dataNode.value.data.value = inputValue.value
  df.updateNodeDataFromId(nodeId.value, dataNode.value)
}
</script>

<style scoped>
</style>