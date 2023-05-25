<template>
  <div class="ele-reg" ref="el">
    <EleHeader title="Register"/>
    <el-cascader
      v-model="selectedReg"
      :options="regs"
      :props="props"
      @change="handleChange"
      placeholder="Select"
      size="small"
      style="width: 100%;"
    />
    <el-row>
      <el-col v-if="nSize == 1" :span="24" style="text-align: center;">{{ values[0] }}</el-col>
      <el-col v-if="nSize == 2" :span="12" style="text-align: center;">{{ values[0] }}</el-col>
      <el-col v-if="nSize == 2" :span="12" style="text-align: center;">{{ values[1] }}</el-col>
      <el-col v-if="nSize == 4" :span="6" style="text-align: center;">{{ values[0] }}</el-col>
      <el-col v-if="nSize == 4" :span="6" style="text-align: center;">{{ values[1] }}</el-col>
      <el-col v-if="nSize == 4" :span="6" style="text-align: center;">{{ values[2] }}</el-col>
      <el-col v-if="nSize == 4" :span="6" style="text-align: center;">{{ values[3] }}</el-col>
      <el-col v-if="nSize == 8" :span="3" style="text-align: center;">{{ values[0] }}</el-col>
      <el-col v-if="nSize == 8" :span="3" style="text-align: center;">{{ values[1] }}</el-col>
      <el-col v-if="nSize == 8" :span="3" style="text-align: center;">{{ values[2] }}</el-col>
      <el-col v-if="nSize == 8" :span="3" style="text-align: center;">{{ values[3] }}</el-col>
      <el-col v-if="nSize == 8" :span="3" style="text-align: center;">{{ values[4] }}</el-col>
      <el-col v-if="nSize == 8" :span="3" style="text-align: center;">{{ values[5] }}</el-col>
      <el-col v-if="nSize == 8" :span="3" style="text-align: center;">{{ values[6] }}</el-col>
      <el-col v-if="nSize == 8" :span="3" style="text-align: center;">{{ values[7] }}</el-col>
      <el-col v-if="nSize == 16" :span="3" style="text-align: center;">{{ values[0] }}</el-col>
      <el-col v-if="nSize == 16" :span="3" style="text-align: center;">{{ values[1] }}</el-col>
      <el-col v-if="nSize == 16" :span="3" style="text-align: center;">{{ values[2] }}</el-col>
      <el-col v-if="nSize == 16" :span="3" style="text-align: center;">{{ values[3] }}</el-col>
      <el-col v-if="nSize == 16" :span="3" style="text-align: center;">{{ values[4] }}</el-col>
      <el-col v-if="nSize == 16" :span="3" style="text-align: center;">{{ values[5] }}</el-col>
      <el-col v-if="nSize == 16" :span="3" style="text-align: center;">{{ values[6] }}</el-col>
      <el-col v-if="nSize == 16" :span="3" style="text-align: center;">{{ values[7] }}</el-col>
    </el-row>
    <el-row v-if="nSize == 16">
      <el-col v-if="nSize == 16" :span="3" style="text-align: center;">{{ values[8] }}</el-col>
      <el-col v-if="nSize == 16" :span="3" style="text-align: center;">{{ values[9] }}</el-col>
      <el-col v-if="nSize == 16" :span="3" style="text-align: center;">{{ values[10] }}</el-col>
      <el-col v-if="nSize == 16" :span="3" style="text-align: center;">{{ values[11] }}</el-col>
      <el-col v-if="nSize == 16" :span="3" style="text-align: center;">{{ values[12] }}</el-col>
      <el-col v-if="nSize == 16" :span="3" style="text-align: center;">{{ values[13] }}</el-col>
      <el-col v-if="nSize == 16" :span="3" style="text-align: center;">{{ values[14] }}</el-col>
      <el-col v-if="nSize == 16" :span="3" style="text-align: center;">{{ values[15] }}</el-col>
    </el-row>
    <el-button type="primary" @click="drawer = true" style="margin-top: 10px;">
      Setup
    </el-button>
    <teleport to="body">
      <el-drawer
        v-model="drawer"
        title="Setup Register"
        direction="rtl"
        >
        <p>Size:</p>
        <el-radio-group v-model="size" @change="changeSize">
          <el-radio label="1">1</el-radio>
          <el-radio label="2">2</el-radio>
          <el-radio label="4">4</el-radio>
          <el-radio label="8">8</el-radio>
          <el-radio label="16">16</el-radio>
        </el-radio-group>
        <p>Value:</p>
        <el-input
          v-for="(value, index) in values"
          :key="index"
          v-model="values[index]"
          @input="changeInput(index)"
        ></el-input>
      </el-drawer>
    </teleport>
  </div>
</template>

<script setup>
import { defineComponent, ref, computed, watch, onMounted, getCurrentInstance, nextTick } from 'vue'
import EleHeader from './EleHeader.vue'
defineComponent({
  components: {
    EleHeader
  }
})
const props = {
  expandTrigger: 'hover',
}
const selectedReg = ref([])
const size = ref('8')
const regs = [
  {
    value: 'XMM',
    label: 'XMM',
    children: [
      {
        value: 'XMM0',
        label: 'XMM0',
      },
      {
        value: 'XMM1',
        label: 'XMM1',
      },
    ]
  },
  {
    value: 'YMM',
    label: 'YMM',
    children: [
      {
        value: 'YMM0',
        label: 'YMM0',
      },
      {
        value: 'YMM1',
        label: 'YMM1',
      },
    ]
  },
  {
    value: 'ZMM',
    label: 'ZMM',
    children: [
      {
        value: 'ZMM0',
        label: 'ZMM0',
      },
      {
        value: 'ZMM1',
        label: 'ZMM1',
      },
    ]
  },
]
const handleChange = (value) => {
  dataNode.value.data.register = value
  df.updateNodeDataFromId(nodeId.value, dataNode.value)
}
const changeSize = (value) => {
  dataNode.value.data.size = value
  df.updateNodeDataFromId(nodeId.value, dataNode.value)
}
const changeInput = (index) => {
  if (values.value[index] == '') {
    values.value[index] = '0'
  }
  dataNode.value.data.values = values.value
  df.updateNodeDataFromId(nodeId.value, dataNode.value)
}
const drawer = ref(false)
const nSize = computed(() => {
  return size.value === '1' ? 1 :
    size.value === '2' ? 2 :
    size.value === '4' ? 4 :
    size.value === '8' ? 8 :
    size.value === '16' ? 16 : 0;
})
const values = ref(new Array(nSize.value).fill(0))
watch(nSize, (newSize) => {
  values.value = new Array(newSize).fill(0)
})
const el = ref(null)
const df = getCurrentInstance().appContext.config.globalProperties.$df.value
const nodeId = ref(0)
const dataNode = ref({})
onMounted(async () => {
  await nextTick()
  nodeId.value = el.value.parentElement.parentElement.id.slice(5)
  dataNode.value = df.getNodeFromId(nodeId.value)
  if (dataNode.value.data.register) {
    selectedReg.value = dataNode.value.data.register
  }
  else {
    dataNode.value.data.register = selectedReg.value
    df.updateNodeDataFromId(nodeId.value, dataNode.value)
  }
  if (dataNode.value.data.size) {
    size.value = dataNode.value.data.size
  }
  else {
    dataNode.value.data.size = size.value
    df.updateNodeDataFromId(nodeId.value, dataNode.value)
  }
  if (dataNode.value.data.values) {
    values.value = dataNode.value.data.values
  }
  else {
    dataNode.value.data.values = values.value
    df.updateNodeDataFromId(nodeId.value, dataNode.value)
  }
})
</script>

<style scoped>
.el-radio {
  margin-right: 16px;
}
</style>