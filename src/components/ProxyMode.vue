<template>
  <div class="g-proxy">
    <div class="m-header">
      <h2 class="black m-header-text">代理模式</h2>
      <el-switch
        class="u-switch"
        v-model="enabled"
        active-color="#13ce66"
        :active-value="true"
        :inactive-value="false"
        @change="handleEnabledChange">
      </el-switch>
    </div>
    <el-button type="primary" @click="handleAddClick">添加代理</el-button>
    <div class="m-proxy-list">
      <div class="m-proxy-item"
        v-for="(proxy, index) in (currentInterface.proxyConfig ? (currentInterface.proxyConfig.proxyList || []) : [])"
        :key="index">
        <el-radio border v-model="activeIndex" :label="index" class="u-radio ellipsis" :title="proxy.proxyUrl" @change="handleRadioChange">
          <span class="u-proxyurl ellipsis">{{ proxy.proxyUrl }}</span>
          <i :class="{
            'u-icon': true,
            'el-icon-delete': true,
            'u-opacity': activeIndex === index
          }" title="删除" @click.prevent="handleDeleteClick(index)"></i>
        </el-radio>
      </div>
    </div>

    <proxy-form
      :proxyConfig="proxyConfig"
      :dialogVisible.sync="dialogVisible"
      @add-success="$emit('update-success')">
    </proxy-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { interfaceService } from '@/api'
import ProxyForm from './forms/ProxyForm'
import { messageWrapper, confirmWrapper } from '@/utils/message'

export default {
  components: {
    'proxy-form': ProxyForm
  },
  data () {
    return {
      enabled: false,
      proxyConfig: {},
      activeIndex: 0,
      proxyList: [],
      dialogVisible: false
    }
  },
  watch: {
    currentInterface () {
      this.proxyConfig = {
        proxyList: [],
        enabled: false,
        activeIndex: 0,
        ...this.currentInterface.proxyConfig
      }
      this.enabled = this.proxyConfig.enabled
      this.activeIndex = this.proxyConfig.activeIndex
    },
    allProxyList () {
      this.enabled = this.allProxyList[this.interfaceUniqId] || false
    }
  },
  computed: {
    ...mapState({
      allProxyList: state => state.proxyList,
      interfaceUniqId: state => state.interfaceUniqId,
      currentInterface: state => state.currentInterface
    }),
    proxyText () {
      return `${this.enabled ? '开启' : '关闭'}代理模式`
    }
  },
  methods: {
    // 当开启/关闭代理模式改变时
    handleEnabledChange () {
      this.handleProxyChange('enabled', this.proxyText)
      this.$store.dispatch('setProxy', {
        interfaceUniqId: this.interfaceUniqId,
        enabled: this.enabled
      })
    },
    // 点击添加代理
    handleAddClick () {
      this.dialogVisible = true
    },
    // 选择的代理变化
    handleRadioChange () {
      this.handleProxyChange('activeIndex', '切换代理')
    },
    // 删除代理
    handleDeleteClick (index) {
      this.proxyList = this.proxyConfig.proxyList.filter((proxy, i) => i !== index)
      confirmWrapper('删除代理', this.handleProxyChange.bind(this, 'proxyList', '删除代理'))
    },
    // 代理有所变化时
    handleProxyChange (itemName, message) {
      const updatePromise = interfaceService.updateInterface.bind(null, {
        uniqId: this.interfaceUniqId,
        proxyConfig: {
          ...this.proxyConfig,
          [itemName]: this[itemName]
        }
      })
      messageWrapper(message, updatePromise, undefined, undefined, () => {
        this.$emit('update-success')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.g-proxy {
  .m-header {
    .m-header-text {
      display: inline-block;
      margin-right: 5px;
    }
    .u-switch {
      vertical-align: -2px;
    }
  }
  .m-proxy-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    .m-proxy-item {
      flex: 0 0 220px;
      margin: 5px 0;
      .u-proxyurl {
        display: inline-block;
        width: calc(100% - 37px);
      }
      .u-radio {
        width: 200px;
        &:hover {
          .u-icon {
            opacity: 1;
          }
        }
        .u-icon {
          float: right;
          opacity: 0;
          transition: opacity .3s linear;
        }
        .el-icon-delete:hover {
          color: #F56C6C;
        }
        .u-opacity {
          opacity: 1;
        }
      }
    }
  }
}
</style>
