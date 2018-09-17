<template>
  <div class="g-interface-detail">
    <el-breadcrumb class="m-breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item><a href="/">所有项目</a></el-breadcrumb-item>
      <el-breadcrumb-item>{{ projectName }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="breadcrumb">{{ breadcrumb }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="g-interface-content">
      <interface-config @update-success="getOneInterface"></interface-config>
      <scene-manage @update-success="getOneInterface"></scene-manage>
      <proxy-mode @update-success="getOneInterface"></proxy-mode>
      <request-schema></request-schema>
      <response-schema></response-schema>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { interfaceService } from '@/api';
import { InterfaceConfig, SceneManage, ProxyMode, RequestSchema, ResponseSchema } from '@/components';

export default {
  components: {
    'proxy-mode': ProxyMode,
    'scene-manage': SceneManage,
    'request-schema': RequestSchema,
    'response-schema': ResponseSchema,
    'interface-config': InterfaceConfig
  },
  data() {
    return {
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
  .g-interface-content {
    height: calc(100% - 40px);
    overflow: auto;
  }
  .m-breadcrumb {
    height: 38px;
    line-height: 38px;
    border-bottom: 2px solid #e4e7ed;
  }
}
</style>
