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
import { defineComponent, ref, getCurrentInstance, onMounted, nextTick, computed } from 'vue'
import EleHeader from './EleHeader.vue'
defineComponent({
  components: {
    EleHeader
  }
})
const inputValue = ref('')
const type = ref('')
const typeName = computed(() => {
  return type.value === '0' ? 'binary' :
  type.value === '1' ? 'octal' :
  type.value === '2' ? 'decimal' :
  type.value === '3' ? 'hexadecimal' : ''
})
const toType = (name) => {
  return name === 'binary' ? '0' :
    name === 'octal' ? '1' :
    name === 'decimal' ? '2' :
    name === 'hexadecimal' ? '3' : ''
}
const elimm = ref(null)
const df = getCurrentInstance().appContext.config.globalProperties.$df.value
const nodeId = ref(0)
const dataNode = ref({})
onMounted(async () => {
  await nextTick()
  nodeId.value = elimm.value.parentElement.parentElement.id.slice(5)
  dataNode.value = df.getNodeFromId(nodeId.value)
  if (dataNode.value.data.type) {
    type.value = toType(dataNode.value.data.type)
  }
  else {
    dataNode.value.data.type = typeName.value
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
  dataNode.value.data.type = typeName.value
  df.updateNodeDataFromId(nodeId.value, dataNode.value)
}
const completeInput = () => {
  dataNode.value.data.value = inputValue.value
  df.updateNodeDataFromId(nodeId.value, dataNode.value)
}
</script>

<style scoped>
</style>