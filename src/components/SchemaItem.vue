<template>
  <div class="g-schema-item">
    <div class="m-header">
      <h2 class="black u-headertext">{{ isRequest ? '请求' : '响应' }}字段描述</h2>
      <div class="m-btngroup" v-show="from === 'detail'">
        <el-button type="primary" size="mini" @click="handleAddClick">新建</el-button>
        <el-button type="primary" size="mini" @click="handleEditClick">编辑</el-button>
      </div>
    </div>

    <el-table :data="tableData" border style="width: 100%; font-size: 14px;">
      <el-table-column prop="key" label="字段">
        <template slot-scope="scope">
          <span :style="{ marginLeft: `${15 * scope.row.level}px` }">{{ scope.row.key }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型">
        <template slot-scope="scope">
          <span class="capitalize">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="required" label="是否必须">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.required" :disabled="true"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="参数描述"></el-table-column>
    </el-table>

    <schema-form
      :type="type"
      :schema="schema"
      @update-success="$emit('update-success')"
      :dialogVisible.sync="dialogVisible">
    </schema-form>
  </div>
</template>

<script>
import SchemaForm from './forms/SchemaForm'
import { genSchemaList } from '@/utils/helper'

export default {
  props: ['type', 'schema', 'from'],
  components: {
    'schema-form': SchemaForm
  },
  data () {
    return {
      schemaData: {},
      dialogVisible: false
    }
  },
  computed: {
    isRequest () {
      return this.type === 'request'
    },
    tableData () {
      try {
        return genSchemaList(this.schema || {})
      } catch (e) {
        return []
      }
    }
  },
  methods: {
    // 新建一项 schema
    handleAddClick () {

    },
    // 编辑 JSON schema
    handleEditClick () {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.g-schema-item {
  .m-header {
    position: relative;
    .u-headertext {
      display: inline-block;
    }
    .m-btngroup {
      position: absolute;
      left: 140px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
