<template>
  <el-container>
    <el-header class="header">
      <h3>SVPT Canvas</h3>
      <el-button type="primary" @click="showCode">Code</el-button>
    </el-header>
    <el-container class="container">
      <el-aside width="250px" class="column">
        <ul>
          <li v-for="n in elements" :key="n" draggable="true" :data-node="n.item" @dragstart="drag($event)" class="drag-drawflow" >
            <div class="element" :style="`background: ${n.color}`" >{{ n.name }}</div>
          </li>
        </ul>
      </el-aside>
      <el-main>
        <div id="drawflow" @drop="drop($event)" @dragover="allowDrop($event)"></div>
      </el-main>
    </el-container>
  </el-container>
  <el-dialog
    v-model="dialogVisible"
    title="Code"
    width="50%"
    >
    <el-scrollbar height="400px">
      <pre><code>{{ dialogData }}</code></pre>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, shallowRef, getCurrentInstance, h, render, onMounted, computed } from 'vue'
import Drawflow from 'drawflow'
import 'drawflow/dist/drawflow.min.css'
import EleRegister from './elements/EleRegister.vue'
import EleInstruction from './elements/EleInstruction.vue'
import EleImmediate from './elements/EleImmediate.vue'
const elements = [
  {
    name: 'Register',
    color: '#49494970',
    item: 'Register',
    input: 1,
    output: 1,
  },
  {
    name: 'Instruction',
    color: '#ff9900',
    item: 'Instruction',
    input: 1,
    output: 1,
  },
  {
    name: 'Immediate',
    color: '#0808ff',
    item: 'Immediate',
    input: 0,
    output: 1,
  },
]
const editor = shallowRef({})
const internalInstance = getCurrentInstance()
internalInstance.appContext.app._context.config.globalProperties.$df = editor
const Vue = { version: 3, h, render }
let mobile_item_selec = ''
let mobile_last_move = null
const drag = (ev) => {
  if (ev.type === 'touchstart') {
    mobile_item_selec = ev.target.closest('.drag-drawflow').getAttribute('data-node')
  } else {
    ev.dataTransfer.setData('node', ev.target.getAttribute('data-node'))
  }
}
const drop = (ev) => {
  if (ev.type === 'touchend') {
    let parentdrawflow = document.elementFromPoint( mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY).closest("#drawflow")
    if(parentdrawflow != null) {
      addNodeToDrawFlow(mobile_item_selec, mobile_last_move.touches[0].clientX, mobile_last_move.touches[0].clientY)
    }
    mobile_item_selec = ''
  } else {
    ev.preventDefault()
    var data = ev.dataTransfer.getData('node')
    addNodeToDrawFlow(data, ev.clientX, ev.clientY)
  }
}
const allowDrop = (ev) => {
  ev.preventDefault()
}
const positionMobile = (ev) => {
  mobile_last_move = ev
}
const addNodeToDrawFlow = (name, pos_x, pos_y) => {
  pos_x = pos_x * ( editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().x * ( editor.value.precanvas.clientWidth / (editor.value.precanvas.clientWidth * editor.value.zoom)))
  pos_y = pos_y * ( editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)) - (editor.value.precanvas.getBoundingClientRect().y * ( editor.value.precanvas.clientHeight / (editor.value.precanvas.clientHeight * editor.value.zoom)))
  const eleSelected = elements.find(ele => ele.item == name)
  editor.value.addNode(name, eleSelected.input, eleSelected.output, pos_x, pos_y, name, {}, name, 'vue')
}
onMounted(() => {
  let es = document.getElementsByClassName('drag-drawflow')
  for (var i = 0; i < es.length; i++) {
    es[i].addEventListener('touchend', drop, false)
    es[i].addEventListener('touchmove', positionMobile, false)
    es[i].addEventListener('touchstart', drag, false)
  }
  const id = document.getElementById('drawflow')
  editor.value = new Drawflow(id, Vue, internalInstance.appContext.app._context)
  editor.value.start()
  editor.value.registerNode('Register', EleRegister, {}, {})
  editor.value.registerNode('Instruction', EleInstruction, {}, {})
  editor.value.registerNode('Immediate', EleImmediate, {}, {})
  editor.value.on('nodeCreated', (id) => {
    console.log('Node Created', id)
    // TODO: function after create node
  })
  editor.value.on('connectionCreated', (obj) => {
    console.log('Connection Created', obj)
    // TODO: function after create connection
  })
})
const dialogVisible = ref(false)
const dialogData = ref({})
const showCode = () => {
  dialogData.value = editor.value.export()
  dialogVisible.value = true
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #494949;
}
.container {
  min-height: calc(100vh - 220px);
}
.column {
  border-right: 1px solid #494949;
}
.column ul {
  padding-inline-start: 0px;
  padding: 10px 10px;
}
.column li {
  background: transparent;
}
.element {
  border-radius: 8px;
  border: 2px solid #494949;
  display: block;
  height:60px;
  line-height:40px;
  padding: 10px;
  margin: 10px 0px;
  cursor: move;
}
#drawflow {
  width: 100%;
  height: 100%;
  text-align: initial;
  background: #2b2c30;
  background-size: 20px 20px;
  background-image: radial-gradient(#494949 1px, transparent 1px);
}
</style>