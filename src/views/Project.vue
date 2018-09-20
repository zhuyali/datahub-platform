<template>
  <div class="g-project">
    <div class="g-aside">
      <el-tabs v-model="activeName" stretch>
        <el-tab-pane label="接口列表" name="interface">
          <interface-list></interface-list>
        </el-tab-pane>
        <el-tab-pane label="实时快照" name="snapshot">实时快照</el-tab-pane>
      </el-tabs>
    </div>
    <div class="g-main">
      <keep-alive>
        <component :is="currentTabComponent"></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import {
  InterfaceList, InterfaceDetail, InterfaceDoc
} from '@/container'

export default {
  components: {
    'interface-doc': InterfaceDoc,
    'interface-list': InterfaceList,
    'interface-detail': InterfaceDetail
  },
  computed: {
    ...mapState({
      currentActiveName: state => state.activeName
    }),
    activeName: {
      get () {
        return this.currentActiveName.split('-')[0]
      },
      set () {}
    },
    currentTabComponent () {
      return this.currentActiveName
    }
  }
}
</script>

<style lang="less" scoped>
.g-project {
  background: #fff;
  height: calc(100vh - 81px);
  border-top: 1px solid #f0f2f5;
  .g-aside {
    float: left;
    width: 300px;
    height: inherit;
    border-right: 1px solid rgba(0, 0, 0, 0.05);
  }

  .g-main {
    height: inherit;
    margin-left: 300px;
  }
}
</style>
