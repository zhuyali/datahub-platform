<template>
  <div class="g-realtime-list">
    <div
      :class="`m-realtime pointer ${currentRealTimeIndex === index ? 'm-realtime-chosen' : ''}`"
      v-for="(realtime, index) in realTimeData"
      :key="index"
      @click="handleRealTimeClick(index)">
      <div class="m-req-info ellipsis">
        <b :class="`u-left u-method u-${realtime.req.method.toLowerCase()}`">{{ realtime.req.method }}</b>
        <span :title="realtime.req.path">{{ realtime.req.path }}</span>
      </div>
      <div class="m-res-info ellipsis">
        <span :class="`u-left m-status ${getStatusClass(realtime.res.status)}`">
          <i class="iconfont icon-yuandianxiao u-icon"></i>
          {{ realtime.res.status }}
        </span>
        <span :title="realtime.res.host">{{ realtime.res.host }}</span>
      </div>
      <div class="u-time">
        {{ realtime.date }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import io from 'socket.io-client'

export default {
  created () {
    this.initRealTimeData()
  },
  data () {
    return {
      currentRealTimeIndex: 0
    }
  },
  computed: mapState({
    realTimeData: state => state.realTimeData
  }),
  methods: {
    // 实时快照数据
    initRealTimeData () {
      const host = `//${location.hostname}:${window.context.socket.port}`
      const socket = io(host)
      socket.on('push data', (data) => {
        this.$store.dispatch('setRealTimeData', data)
      })
    },
    // 获取状态类名
    getStatusClass (statusCode) {
      const startNumber = String(statusCode).charAt(0)
      switch (startNumber) {
        case '2':
          return 'success'
        case '3':
          return 'warning'
        case '4':
        case '5':
          return 'error'
      }
    },
    // 点击实时快照某一项
    handleRealTimeClick (index) {
      this.currentRealTimeIndex = index
      this.$store.dispatch('setCurrentRealTime', this.realTimeData[index])
    }
  }
}
</script>

<style lang="less" scoped>
.g-realtime-list {
  .m-realtime {
    position: relative;
    padding: 7px 10px 3px;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: .3px;
    &-chosen {
      background: #eee;
    }
    .m-res-info {
      .m-status {
        font-size: 14px;
        .u-icon {
          vertical-align: middle;
        }
      }
    }
    .u-left {
      display: inline-block;
      width: 60px;
    }
    .u-time {
      text-align: right;
      color: #ccc;
    }
  }
}
</style>
