<template>
  <div class="g-interface-detail g-container">
    <div class="g-interface-header g-container-header">
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
        <el-button type="primary" size="mini" @click="handleDocClick">接口文档</el-button>
      </div>
    </div>
    <div class="g-interface-content g-container-content">
      <interface-config @update-success="getOneInterface"></interface-config>
      <scene-manage @update-success="getOneInterface"></scene-manage>
      <proxy-mode @update-success="getOneInterface"></proxy-mode>
      <schema from="detail"></schema>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { messageWrapper } from '@/utils/message'
import { interfaceService, sdkService } from '@/api'
import { InterfaceConfig, SceneManage, ProxyMode, Schema } from '@/components'

const { uniqId: projectUniqId } = window.context

export default {
  components: {
    'schema': Schema,
    'proxy-mode': ProxyMode,
    'scene-manage': SceneManage,
    'interface-config': InterfaceConfig
  },
  data () {
    return {
      projectName: window.context.projectName || ''
    }
  },
  computed: {
    ...mapState({
      proxyList: state => state.proxyList,
      interfaceUniqId: state => state.interfaceUniqId,
      currentInterface: state => state.currentInterface
    }),
    breadcrumb () {
      const currentMethod = this.currentInterface.method
      const currentPathname = this.currentInterface.pathname
      return currentPathname ? `${currentPathname}（${currentMethod}）` : ''
    },
    enabled: {
      get () {
        const values = Object.values(this.proxyList)
        if (values.length) {
          return values.every(value => value)
        } else {
          return false
        }
      },
      set (newEnabled) {
        this.switchAllProxy(newEnabled)
      }
    }
  },
  methods: {
    // 获取当前接口的详细信息
    async getOneInterface () {
      const res = await interfaceService.getOneInterface(this.currentInterface.uniqId)
      this.$store.dispatch('setCurrentInterface', res.data)
    },
    // 查看接口文档
    handleDocClick () {
      this.$store.dispatch('setActiveName', 'interface-doc')
    },
    // 改变全局代理
    switchAllProxy (enabled) {
      const switchPromise = sdkService.switchAllProxy.bind(null, {
        projectUniqId,
        enabled
      })
      messageWrapper('切换全局代理', switchPromise, () => {
        const newProxyList = {}
        Object.keys(this.proxyList).forEach((key) => {
          newProxyList[key] = enabled
        })
        this.$store.dispatch('setProxyList', newProxyList)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.g-interface-detail {
  .g-interface-header {
    .m-btngroup {
      .u-switch {
        display: inline-block;
        padding: 0 15px;
        margin-right: 5px;
        line-height: 28px;
        vertical-align: -1px;
        font-size: 12px;
        font-weight: 500;
        background-color: #409EFF;
        border-color: #409EFF;
        border-radius: 3px;
        color: #fff;
      }
    }
  }
}
</style>
