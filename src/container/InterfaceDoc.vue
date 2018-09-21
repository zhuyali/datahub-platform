<template>
  <div class="g-interface-doc g-container">
    <div class="g-doc-header g-container-header">
      <el-breadcrumb class="m-breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item><a href="/">所有项目</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ projectName }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="breadcrumb">{{ breadcrumb }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="m-btngroup">
        <el-button type="primary" size="mini" @click="handleConfigClick">接口配置</el-button>
      </div>
    </div>
    <div class="g-doc-content g-container-content">
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
