<template>
  <div class="g-realtime-content">
    <div class="m-header">
      <h2 class="black capitalize">{{ type }}</h2>
    </div>
    <el-collapse class="m-content">
      <el-collapse-item :title="`${type} header`">
        <div v-for="(key, index) in header" :key="index" class="m-header-line">
          <b class="u-header-key">{{ key }}</b>
          <span class="u-header-value">{{ realtimeData.headers[key] }}</span>
        </div>
      </el-collapse-item>
      <el-collapse-item :title="`${type} body`">
        <pre>{{ body }}</pre>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['type'],
  computed: {
    ...mapState({
      currentRealTime: state => state.currentRealTime || {}
    }),
    realtimeData () {
      return this.type === 'request' ? 
        this.currentRealTime.req || {} : 
        this.currentRealTime.res || {}
    },
    header () {
      const headers = this.realtimeData.headers || {}
      return Object.keys(headers)
    },
    body () {
      const realtimeBody = this.realtimeData.body || {}
      if (typeof realtimeBody === 'object') {
        return JSON.stringify(realtimeBody, {}, 2)
      } else {
        try {
          return JSON.stringify(JSON.parse(realtimeBody), {}, 2);
        } catch (e) {
          return body;
        }
      }
    }
  },
}
</script>

<style lang="less" scoped>
.g-realtime-content {
  .m-content {
    .m-header-line {
      font-size: 14px;
      line-height: 2;
      .u-header-key {
        display: inline-block;
        min-width: 128px;
        text-align: right;
        margin-right: 20px;
        color: rgba(0,0,0,.65);
      }
    }
  }
}
</style>
