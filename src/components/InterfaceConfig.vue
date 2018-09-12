<template>
  <div class="g-interface-config">
    <div class="m-header">
      <h2 class="black m-header-text">接口配置</h2>
      <i class="el-icon-edit pointer" @click="handleConfigEditClick"></i>
    </div>
    <div class="m-config">
      <label class="u-config-header">接口延迟(s)：</label>
      <label>{{ responseDelay }}s</label>
    </div>
    <div class="m-config">
      <label class="u-config-header">响应状态码：</label>
      <label>{{ responseStatus }}</label>
    </div>
    <div class="m-config">
      <label class="u-config-header">自定义响应头：</label>
      <el-table :data="tableData" class="m-table" border :show-header="false">
        <el-table-column prop="key" label="key" width="149"></el-table-column>
        <el-table-column prop="value" label="value" width="149"></el-table-column>
      </el-table>
    </div>

    <context-config-form
      :dialogData="dialogData"
      :dialogVisible.sync="dialogVisible"
      @update-success="$emit('update-success')">
    </context-config-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import ContextConfigForm from './forms/ContextConfigForm';

export default {
  components: {
    'context-config-form': ContextConfigForm
  },
  watch: {
    currentInterface() {
      if (this.currentInterface && this.currentInterface.contextConfig) {
        const contextConfig = this.currentInterface.contextConfig
        this.responseDelay = contextConfig.responseDelay || 0;
        this.responseStatus = contextConfig.responseStatus || 200;
        this.responseHeaders = contextConfig.responseHeaders || {};
      }
    }
  },
  data() {
    return {
      dialogData: {},
      responseDelay: 0,
      responseStatus: 200,
      responseHeaders: {},
      dialogVisible: false,
      supportMethod: ['ALL', 'GET', 'POST', 'PUT', 'DELETE'],
    }
  },
  computed: {
    ...mapState({
      currentInterface: state => state.currentInterface
    }),
    tableData() {
      const result = [];
      const contextConfig = this.currentInterface.contextConfig;
      if (contextConfig && contextConfig.responseHeaders) {
        const responseHeaders = contextConfig.responseHeaders;
        Object.keys(responseHeaders).forEach((key) => {
          result.push({
            key,
            value: responseHeaders[key]
          });
        });
      }
      return result;
    }
  },
  methods: {
    // 点击修改接口配置
    handleConfigEditClick() {
      this.dialogVisible = true;
      this.dialogData.responseDelay = this.responseDelay;
      this.dialogData.responseStatus = this.responseStatus;
      this.dialogData.responseHeaders = this.responseHeaders;
    }
  }
}
</script>

<style lang="less" scoped>
.g-interface-config {
  .m-header {
    .m-header-text {
      display: inline-block;
      margin-right: 5px;
    }
  }
  .m-config {
    margin: 5px 0;
    line-height: 25px;
    letter-spacing: 1px;
    .u-config-header {
      display: inline-block;
      width: 105px;
      margin: 0;
      text-align: right;
    }
    .u-config-content {
      width: 300px;
    }
    .m-table {
      display: inline-block;
      width: 300px;
      vertical-align: text-top;
    }
  }
}
</style>
