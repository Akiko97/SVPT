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
        <div class="dfooter" style="flex: auto">
          <el-button @click="drawer = false">Cancel</el-button>
          <el-button type="primary" @click="setupWatcher">Setup</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const drawer = ref(false)
const setupWatcher = () => {
  //
}
</script>

<style scoped>
.tools {
  margin: 20px;
}
.tools .el-button:not(.dfooter .el-button) {
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