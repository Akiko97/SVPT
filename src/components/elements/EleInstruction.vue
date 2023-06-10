<template>
  <div class="ele-inst" ref="eli">
    <EleHeader title="Instruction" color="#ff9900" :id="`${nodeId}`"/>
    <el-select
      v-model="selectedInst"
      class="m-2"
      placeholder="Select"
      size="small"
      filterable
      @change="changeInst"
      df-selectinst
    >
      <el-option
        v-for="inst in insts"
        :key="inst.name"
        :label="inst.name"
        :value="inst.name"
      />
    </el-select>
    <div style="text-align: center;">
      <el-link
        v-if="!showDetails"
        :underline="false"
        @click="showDetails = !showDetails"
      >
        <el-icon><ArrowDown /></el-icon>
      </el-link>
      <el-link
        v-if="showDetails"
        :underline="false"
        @click="showDetails = !showDetails"
      >
        <el-icon><ArrowUp /></el-icon>
      </el-link>
    </div>
    <el-button
      v-if="showDetails"
      type="primary"
      @click="drawer = true"
      size="small"
      style="margin-top: 10px;">
      Setup
    </el-button>
    <teleport to="body">
      <el-drawer
        v-model="drawer"
        title="Setup Register"
        direction="rtl"
        >
        <p>Operand Order:</p>
        <div style="text-align: center;">
          <p v-if="orderedOprand.length == 0">No Input Oprand</p>
        </div>
        <draggable 
          v-model="orderedOprand" 
          group="people"
          @start="drag=true"
          @end="drag=false"
          @update="onUpdate"
          item-key="id">
          <template #item="{ element }">
            <div class="drag-element">ID: {{ element.id }}</div>
          </template>
        </draggable>
      </el-drawer>
    </teleport>
  </div>
</template>

<script setup>
import { defineComponent, ref, getCurrentInstance, onMounted, nextTick } from 'vue'
import draggable from 'vuedraggable'
import EleHeader from './EleHeader.vue'
import { insts } from '../../data/instructions'
defineComponent({
  components: {
    EleHeader,
    draggable
  }
})
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
  if (dataNode.value.data.order) {
    orderedOprand.value = dataNode.value.data.order
  }
  else {
    dataNode.value.data.order = orderedOprand.value
    df.updateNodeDataFromId(nodeId.value, dataNode.value)
  }
  df.on('connectionCreated', (obj) => {
    if (obj.input_id === nodeId.value && obj.input_class === 'input_1') {
      orderedOprand.value.push({id: obj.output_id})
      dataNode.value.data.order = orderedOprand.value
      df.updateNodeDataFromId(nodeId.value, dataNode.value)
    }
  })
  df.on('connectionRemoved', (obj) => {
    if (obj.input_id === nodeId.value && obj.input_class === 'input_1') {
      orderedOprand.value = orderedOprand.value.filter(item => item.id !== obj.output_id)
      dataNode.value.data.order = orderedOprand.value
      df.updateNodeDataFromId(nodeId.value, dataNode.value)
    }
  })
})
const changeInst = () => {
  dataNode.value.data.instruction = selectedInst.value
  df.updateNodeDataFromId(nodeId.value, dataNode.value)
}
const showDetails = ref(false)
const drawer = ref(false)
const orderedOprand = ref([])
const drag = ref(false)
const onUpdate = () => {
  dataNode.value.data.order = orderedOprand.value
  df.updateNodeDataFromId(nodeId.value, dataNode.value)
}
</script>

<style scoped>
.drag-element {
  color: #ffffff;
  margin: 5px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid transparent;
  border-color: #ffffff;
}
</style>