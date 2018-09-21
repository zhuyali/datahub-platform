<template>
  <div class="g-realtime g-container">
    <div class="g-realtime-header g-container-header">
      <el-breadcrumb class="m-breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item><a href="/">所有项目</a></el-breadcrumb-item>
        <el-breadcrumb-item>{{ projectName }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="m-btngroup">
        <el-button type="primary" size="mini" @click="handleSaveScene">保存为新场景</el-button>
      </div>
    </div>
    <div class="g-realtime-content g-container-content">
      <real-time-content type="request"></real-time-content>
      <real-time-content type="response"></real-time-content>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { RealTimeContent } from '@/components'

export default {
  components: {
    'real-time-content': RealTimeContent
  },
  watch: {
    realTimeData () {
      this.$store.dispatch('setCurrentRealTime', this.realTimeData[0])
    }
  },
  data () {
    return {
      projectName: window.context.projectName || ''
    }
  },
  computed: mapState({
    realTimeData: state => state.realTimeData,
    currentRealTime: state => state.currentRealTime
  }),
  activated () {
    if (this.realTimeData.length) {
      this.$store.dispatch('setCurrentRealTime', this.realTimeData[0])
    }
  },
  methods: {
    // 保存到场景
    handleSaveScene () {
    }
  }
}
</script>
