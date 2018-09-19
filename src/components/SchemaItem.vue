<template>
  <div class="g-schema-item">
    <div class="m-header">
      <h2 class="black u-headertext">{{ isRequest ? '请求' : '响应' }}字段描述</h2>
      <div class="m-btngroup">
        <el-button type="primary" size="mini" @click="handleAddClick">新建</el-button>
        <el-button type="primary" size="mini" @click="handleEditClick">编辑</el-button>
      </div>
    </div>

    <schema-form
      :type="type"
      :schema="schema"
      @update-success="$emit('update-success')"
      :dialogVisible.sync="dialogVisible">
    </schema-form>
  </div>
</template>

<script>
import SchemaForm from './forms/SchemaForm';
import { genSchemaList } from '@/utils/helper';

export default {
  props: ['type', 'schema'],
  components: {
    'schema-form': SchemaForm
  },
  data() {
    return {
      schemaData: {},
      dialogVisible: false
    }
  },
  computed: {
    isRequest() {
      return this.type === 'request';
    },
    tableData() {
      return genSchemaList(this.schema || {});
    }
  },
  methods: {
    // 新建一项 schema
    handleAddClick() {

    },
    // 编辑 JSON schema
    handleEditClick() {
      this.dialogVisible = true;
    },
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
