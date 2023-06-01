<template>
  <el-container>
    <el-header class="app-header">
      <h2>SVPT</h2>
      <nav>
        <router-link to="/">Main</router-link> |
        <router-link to="/reference">Reference</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer>
      svpt-dev@0.1
    </el-footer>
  </el-container>
</template>

<script setup>
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #494949;
}
</style>