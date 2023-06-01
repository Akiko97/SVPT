<template>
  <div class="tools">
    <el-button type="success">Run</el-button>
    <br>
    <el-button type="primary" @click="drawer = true">Watcher</el-button>
    <el-drawer
      v-model="drawer"
      title="Register Watcher"
      direction="btt"
      size="600px"
    >
      <template #default>
        <el-row class="watcher">
          <el-col class="left-col" :span="12">
            <p>Initial Value</p>
          </el-col>
          <el-col class="right-col" :span="12">
            <p>Final Value</p>
          </el-col>
        </el-row>
      </template>
      <template #footer>
        <div class="drawer-footer" style="flex: auto">
          <el-button @click="drawer = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = true">Setup</el-button>
        </div>
      </template>
    </el-drawer>
    <el-dialog
      v-model="dialogVisible"
      title="Code"
      width="80%"
    >
      <div style="text-align: center">
        <el-transfer
          v-model="watching"
          :data="registers"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="Search Register"
          :titles="['Registers', 'Watching']"
          @change="handleChange"
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(false)
const dialogVisible = ref(false)
const registers = ref([
  {
    key: 'XMM0',
    label: 'XMM0',
    disabled: false,
  },
  {
    key: 'XMM1',
    label: 'XMM1',
    disabled: false,
  },
  {
    key: 'YMM0',
    label: 'YMM0',
    disabled: false,
  },
  {
    key: 'YMM1',
    label: 'YMM1',
    disabled: false,
  },
  {
    key: 'ZMM0',
    label: 'ZMM0',
    disabled: false,
  },
  {
    key: 'ZMM1',
    label: 'ZMM1',
    disabled: false,
  },
])
const watching = ref([])
const filterMethod = (query, item) => {
  return item.label.toLowerCase().includes(query.toLowerCase())
}
const handleChange = () => {
  // handle change
  console.log('Selected watching register changed', watching.value)
}
</script>

<style scoped>
.tools {
  margin: 20px;
}
.tools .el-button:not(.drawer-footer .el-button):not(.dialog-footer .el-button) {
  display: block;
  width: 100%;
}
.left-col {
  border-right: 1px solid #494949;
}
.watcher {
  height: 100%;
}
</style>