<template>
  <div class="ele-cf" ref="elcf">
    <EleHeader class="cf-header" title="Controlflow" color="#ff0808" :id="`${nodeId}`"/>
    <div style="text-align: center;">{{ ConditionStr }}</div>
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
        <p>Type:</p>
        <div style="text-align: center;">
          <el-radio-group v-model="type" size="small" @change="handleChange">
            <el-radio-button label="Conditional" />
            <el-radio-button label="Loop" />
          </el-radio-group>
        </div>
        <p>Condition:</p>
        <div class="cond-items" v-for="(item, index) in conditions" :key="index">
          <div class="cond-eles">
            <div class="cond-ele">
              <el-radio-group v-model="item.cond1type" size="small">
                <el-radio-button label="Register" />
                <el-radio-button label="Immediate" />
              </el-radio-group>
              <el-cascader
                v-if="item.cond1type == 'Register'"
                v-model="item.cond1reg"
                :options="regs"
                :props="props"
                @change="handleChange"
                placeholder="Select"
                size="small"
                :show-all-levels="false"
                df-selectreg
              />
              <el-input
                v-if="item.cond1type == 'Immediate'"
                v-model="item.cond1imm.value"
                placeholder="Immediate"
                class="input-with-select"
                size="small"
                @blur="handleChange"
                clearable
                df-inputimmvalue
              >
                <template #prepend>
                  <el-select
                    v-model="item.cond1imm.type"
                    placeholder="Select"
                    size="small"
                    style="width: 100px"
                    @change="handleChange"
                    df-selectimmtype
                  >
                    <el-option label="Binary" value="Binary" />
                    <el-option label="Octal" value="Octal" />
                    <el-option label="Decimal" value="Decimal" />
                    <el-option label="Hexadecimal" value="Hexadecimal" />
                  </el-select>
                </template>
              </el-input>
              <el-radio-group v-model="item.cond1ismem">
                <el-radio label="nomem" size="small">Not MemAddr</el-radio>
                <el-radio label="mem" size="small">MemAddr</el-radio>
              </el-radio-group>
            </div>
            <div>
              <el-select v-model="item.relationalOperator" placeholder="Select" size="small">
                <el-option label="=" value="equal-to" />
                <el-option label="≠" value="not-equal-to" />
                <el-option label=">" value="greater-than" />
                <el-option label="<" value="less-than" />
                <el-option label="≥" value="greater-than-or-equal-to" />
                <el-option label="≤" value="less-than-or-equal-to" />
              </el-select>
            </div>
            <div class="cond-ele">
              <el-radio-group v-model="item.cond2type" size="small">
                <el-radio-button label="Register" />
                <el-radio-button label="Immediate" />
              </el-radio-group>
              <el-cascader
                v-if="item.cond2type == 'Register'"
                v-model="item.cond2reg"
                :options="regs"
                :props="props"
                @change="handleChange"
                placeholder="Select"
                size="small"
                :show-all-levels="false"
                df-selectreg
              />
              <el-input
                v-if="item.cond2type == 'Immediate'"
                v-model="item.cond2imm.value"
                placeholder="Immediate"
                class="input-with-select"
                size="small"
                @blur="handleChange"
                clearable
                df-inputimmvalue
              >
                <template #prepend>
                  <el-select
                    v-model="item.cond2imm.type"
                    placeholder="Select"
                    size="small"
                    style="width: 100px"
                    @change="handleChange"
                    df-selectimmtype
                  >
                    <el-option label="Binary" value="Binary" />
                    <el-option label="Octal" value="Octal" />
                    <el-option label="Decimal" value="Decimal" />
                    <el-option label="Hexadecimal" value="Hexadecimal" />
                  </el-select>
                </template>
              </el-input>
              <el-radio-group v-model="item.cond2ismem">
                <el-radio label="nomem" size="small">Not MemAddr</el-radio>
                <el-radio label="mem" size="small">MemAddr</el-radio>
              </el-radio-group>
            </div>
          </div>
          <el-radio-group v-if="'logic' in item" v-model="item.logic" size="small">
            <el-radio-button label="AND" />
            <el-radio-button label="OR" />
          </el-radio-group>
        </div>
        <el-button type="primary" :icon="Plus" circle @click="addCond" />
        <el-button type="danger" :icon="Minus" circle @click="reduceCond" />
      </el-drawer>
    </teleport>
  </div>
</template>

<script setup>
import { defineComponent, ref, getCurrentInstance, onMounted, nextTick, computed } from 'vue'
import EleHeader from './EleHeader.vue'
import { Plus, Minus } from '@element-plus/icons-vue'
import { regs } from '../../data/registers'
defineComponent({
  components: {
    EleHeader,
  }
})
const elcf = ref(null)
const df = getCurrentInstance().appContext.config.globalProperties.$df.value
const nodeId = ref(0)
const dataNode = ref({})
onMounted(async () => {
  await nextTick()
  nodeId.value = elcf.value.parentElement.parentElement.id.slice(5)
  dataNode.value = df.getNodeFromId(nodeId.value)
  if (dataNode.value.data.type) {
    type.value = dataNode.value.data.type
  }
  else {
    dataNode.value.data.type = type.value
    df.updateNodeDataFromId(nodeId.value, dataNode.value)
  }
  if (dataNode.value.data.conditions) {
    conditions.value = dataNode.value.data.conditions
  }
  else {
    dataNode.value.data.conditions = conditions.value
    df.updateNodeDataFromId(nodeId.value, dataNode.value)
  }
})
const type = ref('Conditional')
const showDetails = ref(false)
const drawer = ref(false)
const conditions = ref([
  {
    cond1type: ref('Register'),
    cond1reg: ref(['General Purpose Registers', 'RAX']),
    cond1imm: ref({type: '', value: ''}),
    cond1ismem: ref('nomem'),
    cond2type: ref('Immediate'),
    cond2reg: ref([]),
    cond2imm: ref({type: 'Hexadecimal', value: '0'}),
    cond2ismem: ref('nomem'),
    relationalOperator: ref('equal-to'),
  }
])
const addCond = () => {
  conditions.value[conditions.value.length - 1].logic = ref('AND')
  conditions.value.push({
    cond1type: ref('Register'),
    cond1reg: ref(['General Purpose Registers', 'RAX']),
    cond1imm: ref({type: '', value: ''}),
    cond1ismem: ref('nomem'),
    cond2type: ref('Immediate'),
    cond2reg: ref([]),
    cond2imm: ref({type: 'Hexadecimal', value: '0'}),
    cond2ismem: ref('nomem'),
    relationalOperator: ref('equal-to'),
  })
}
const reduceCond = () => {
  if (conditions.value.length > 1) {
    conditions.value.pop()
    delete conditions.value[conditions.value.length - 1].logic
  }
}
const props = {
  expandTrigger: 'hover',
}
const handleChange = () => {
  dataNode.value.data.conditions = conditions.value
  dataNode.value.data.type = type.value
  df.updateNodeDataFromId(nodeId.value, dataNode.value)
}
const ConditionStr = computed(() => {
  let str = ''
  if (type.value == 'Conditional') {
    str += 'IF: '
  }
  else if (type.value == 'Loop') {
    str += 'WHILE: '
  }
  for (let i = 0; i < conditions.value.length; i++) {
    // condition 1
    let tmp = ''
    if (conditions.value[i].cond1type == 'Register') {
      if (conditions.value[i].cond1reg.length > 0) {
        tmp += conditions.value[i].cond1reg[1]
      }
    }
    else if (conditions.value[i].cond1type == 'Immediate') {
      if (conditions.value[i].cond1imm.type == 'Binary') {
        tmp += `0b${conditions.value[i].cond1imm.value}`
      }
      else if (conditions.value[i].cond1imm.type == 'Octal') {
        tmp += `0o${conditions.value[i].cond1imm.value}`
      }
      else if (conditions.value[i].cond1imm.type == 'Decimal') {
        tmp += `${conditions.value[i].cond1imm.value}`
      }
      else if (conditions.value[i].cond1imm.type == 'Hexadecimal') {
        tmp += `0x${conditions.value[i].cond1imm.value}`
      }
    }
    if (conditions.value[i].cond1ismem == 'mem') {
      str += `[${tmp}]`
    }
    else if (conditions.value[i].cond1ismem == 'nomem') {
      str += `${tmp}`
    }
    // relation
    if (conditions.value[i].relationalOperator == 'equal-to') {
      str += '='
    }
    else if (conditions.value[i].relationalOperator == 'not-equal-to') {
      str += '≠'
    }
    else if (conditions.value[i].relationalOperator == 'greater-than') {
      str += '>'
    }
    else if (conditions.value[i].relationalOperator == 'less-than') {
      str += '<'
    }
    else if (conditions.value[i].relationalOperator == 'greater-than-or-equal-to') {
      str += '≥'
    }
    else if (conditions.value[i].relationalOperator == 'less-than-or-equal-to') {
      str += '≤'
    }
    // condition 2
    tmp = ''
    if (conditions.value[i].cond2type == 'Register') {
      if (conditions.value[i].cond2reg.length > 0) {
        tmp += conditions.value[i].cond2reg[1]
      }
    }
    else if (conditions.value[i].cond2type == 'Immediate') {
      if (conditions.value[i].cond2imm.type == 'Binary') {
        tmp += `0b${conditions.value[i].cond2imm.value}`
      }
      else if (conditions.value[i].cond2imm.type == 'Octal') {
        tmp += `0o${conditions.value[i].cond2imm.value}`
      }
      else if (conditions.value[i].cond2imm.type == 'Decimal') {
        tmp += `${conditions.value[i].cond2imm.value}`
      }
      else if (conditions.value[i].cond2imm.type == 'Hexadecimal') {
        tmp += `0x${conditions.value[i].cond2imm.value}`
      }
    }
    if (conditions.value[i].cond2ismem == 'mem') {
      str += `[${tmp}]`
    }
    else if (conditions.value[i].cond2ismem == 'nomem') {
      str += `${tmp}`
    }
    // logic
    if (conditions.value[i].logic) {
      str += ` ${conditions.value[i].logic} `
    }
  }
  return str
})
</script>

<style scoped>
.cond-ele {
  padding: 5px;
  border-radius: 8px;
  border: 1px dashed transparent;
  border-color: #ffffff;
  margin: 5px;
}
.cond-eles {
  padding: 2px;
  border-radius: 8px;
  border: 1px solid transparent;
  border-color: #ffffff;
  margin: 10px;
}
.cond-items {
  text-align: center;
}
</style>