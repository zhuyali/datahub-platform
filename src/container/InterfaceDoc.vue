<template>
  <div class="g-interface-doc">
    <div class="g-doc-header">
      <el-breadcrumb class="m-breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item><a href="/">所有项目</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ projectName }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="breadcrumb">{{ breadcrumb }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="m-btngroup">
        <el-button type="primary" size="mini" @click="handleConfigClick">接口配置</el-button>
      </div>
    </div>
    <div class="g-doc-content">
      <schema from="doc"></schema>
      <scene-data :key="interfaceUniqId"></scene-data>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { Schema, SceneData } from '@/components'

export default {
  components: {
    'schema': Schema,
    'scene-data': SceneData
  },
  data () {
    return {
      projectName: window.context.projectName || ''
    }
  },
  computed: {
    ...mapState({
      interfaceUniqId: state => state.interfaceUniqId,
      currentInterface: state => state.currentInterface
    }),
    breadcrumb () {
      const currentMethod = this.currentInterface.method
      const currentPathname = this.currentInterface.pathname
      return currentPathname ? `${currentPathname}（${currentMethod}）` : ''
    }
  },
  methods: {
    // 点击查看配置
    handleConfigClick () {
      this.$store.dispatch('setActiveName', 'interface-detail')
    }
  }
}
</script>

<style lang="less" scoped>
.g-interface-doc {
  height: inherit;
  padding: 0 20px;
  .g-doc-header {
    position: relative;
    .m-btngroup {
      position: absolute;
      top: 5px;
      right: 0;
    }
  }
  .g-doc-content {
    box-sizing: border-box;
    height: calc(100% - 40px);
    overflow: auto;
    padding-bottom: 20px;
  }
  .m-breadcrumb {
    height: 38px;
    line-height: 38px;
    border-bottom: 2px solid #e4e7ed;
  }
}
</style>
