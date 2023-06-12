<template>
  <div class="ele-m" ref="elm">
    <EleHeader title="Memory" color="#e3e3e370" :id="`${nodeId}`"/>
    <div style="text-align: center;">{{ memStr }}</div>
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
        <el-checkbox v-model="mem.useImm">Using Immediate</el-checkbox>
        <div v-if="mem.useImm">
          <el-input v-model="mem.imm" placeholder="Input Memory Address" size="small" @blur="updateData" />
        </div>
        <div v-else>
          <p>Base:</p>
          <el-select v-model="mem.base" placeholder="Select" size="small" @change="updateData">
            <el-option
              v-for="reg in regs"
              :key="reg.value"
              :label="reg.label"
              :value="reg.value"
            />
          </el-select>
          <p>Offset:</p>
          <el-input v-model="mem.offset" placeholder="Offset" size="small" @blur="updateData" />
          <p>Index:</p>
          <el-select v-model="mem.index" placeholder="Select" size="small" @change="updateData">
            <el-option
              v-for="reg in regs"
              :key="reg.value"
              :label="reg.label"
              :value="reg.value"
            />
          </el-select>
          <p v-if="mem.index != ''">Scale:</p>
          <el-input v-if="mem.index != ''" v-model="mem.scale" placeholder="Scale" size="small" @blur="updateData" />
        </div>
      </el-drawer>
    </teleport>
  </div>
</template>

<script setup>
import { defineComponent, ref, getCurrentInstance, onMounted, nextTick, computed } from 'vue'
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
  if (dataNode.value.data.mem) {
    mem.value = dataNode.value.data.mem
  }
  else {
    dataNode.value.data.mem = mem.value
    df.updateNodeDataFromId(nodeId.value, dataNode.value)
  }
})
const regs = [
  {value: 'EAX', label: 'EAX'},
  {value: 'EBX', label: 'EBX'},
  {value: 'ECX', label: 'ECX'},
  {value: 'EDX', label: 'EDX'},
  {value: 'ESI', label: 'ESI'},
  {value: 'EDI', label: 'EDI'},
  {value: 'EBP', label: 'EBP'},
  {value: 'ESP', label: 'ESP'},
  {value: 'RAX', label: 'RAX'},
  {value: 'RBX', label: 'RBX'},
  {value: 'RCX', label: 'RCX'},
  {value: 'RDX', label: 'RDX'},
  {value: 'RSI', label: 'RSI'},
  {value: 'RDI', label: 'RDI'},
  {value: 'RBP', label: 'RBP'},
  {value: 'RSP', label: 'RSP'},
  {value: 'R8', label: 'R8'},
  {value: 'R9', label: 'R9'},
  {value: 'R10', label: 'R10'},
  {value: 'R11', label: 'R11'},
  {value: 'R12', label: 'R12'},
  {value: 'R13', label: 'R13'},
  {value: 'R14', label: 'R14'},
  {value: 'R15', label: 'R15'},
]
const showDetails = ref(false)
const drawer = ref(false)
const mem = ref({
  useImm: ref(false),
  imm: ref(''),
  base: ref('RAX'),
  offset: ref(''),
  index: ref(''),
  scale: ref('')
})
const updateData = () => {
  dataNode.value.data.mem = mem.value
  df.updateNodeDataFromId(nodeId.value, dataNode.value)
}
const memStr = computed(() => {
  if (mem.value.useImm) {
    return `[${mem.value.imm}]`
  }
  else {
    let str = `[${mem.value.base}`
    if (mem.value.index != '') {
      str += ` + ${mem.value.index}`
      if (mem.value.scale != '') {
        str += ` * ${mem.value.scale}`
      }
    }
    if (mem.value.offset != '') {
      str += ` + ${mem.value.offset}`
    }
    str += ']'
    return str
  }
})
</script>

<style scoped>
</style>