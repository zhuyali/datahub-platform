<template>
  <div class="g-interface-detail">
    <div class="g-interface-header">
      <el-breadcrumb class="m-breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item><a href="/">所有项目</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ projectName }}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="breadcrumb">{{ breadcrumb }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="m-btngroup">
        <div class="u-switch" type="primary" size="mini">
          <el-switch 
            v-model="enabled"
            active-color="#13ce66"
            :active-value="true"
            :inactive-value="false">
          </el-switch>
          开启全局代理
        </div>
        <el-button type="primary" size="mini">接口文档</el-button>
      </div>
    </div>
    <div class="g-interface-content">
      <interface-config @update-success="getOneInterface"></interface-config>
      <scene-manage @update-success="getOneInterface"></scene-manage>
      <proxy-mode @update-success="getOneInterface"></proxy-mode>
      <schema></schema>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { interfaceService } from '@/api';
import { InterfaceConfig, SceneManage, ProxyMode, Schema } from '@/components';

export default {
  components: {
    'schema': Schema,
    'proxy-mode': ProxyMode,
    'scene-manage': SceneManage,
    'interface-config': InterfaceConfig
  },
  data() {
    return {
      enabled: false,
      projectName: window.context.projectName || ''
    }
  },
  computed: {
    ...mapState({
      currentInterface: state => state.currentInterface
    }),
    breadcrumb() {
      const currentMethod = this.currentInterface.method;
      const currentPathname = this.currentInterface.pathname;
      return currentPathname ? `${currentPathname}（${currentMethod}）` : '';
    }
  },
  methods: {
    // 获取当前接口的详细信息
    async getOneInterface() {
      const res = await interfaceService.getOneInterface(this.currentInterface.uniqId);
      this.$store.dispatch('setCurrentInterface', res.data);
    }
  }
}
</script>

<style lang="less" scoped>
.g-interface-detail {
  height: inherit;
  padding: 0 20px;
  .g-interface-header {
    position: relative;
    .m-btngroup {
      position: absolute;
      top: 5px;
      right: 0;
      .u-switch {
        display: inline-block;
        padding: 0 15px;
        margin-right: 5px;
        line-height: 28px;
        vertical-align: -1px;
        background-color: #409EFF;
        border-color: #409EFF;
        border-radius: 3px;
        color: #fff;
      }
    }
  }
  .g-interface-content {
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
