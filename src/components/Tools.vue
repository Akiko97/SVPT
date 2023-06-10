<template>
  <div class="tools">
    <div class="run-tool">
      <el-button type="success">Run</el-button>
      <el-button type="primary" :icon="Setting" style="width: 25%;"/>
    </div>
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
    <!-- TODO: setting -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import { regs } from '../data/registers'
const drawer = ref(false)
const dialogVisible = ref(false)
const registers = computed(() => {
  const list = []
  for (const group in regs) {
    for (const reg in regs[group].children) {
      list.push({
        key: regs[group].children[reg].value,
        label: regs[group].children[reg].label,
        disabled: false,
      })
    }
  }
  return list
})
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
.run-tool {
  display: flex;
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