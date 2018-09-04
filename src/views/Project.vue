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
    <div class="g-main"></div>
  </div>
</template>

<script>
import { InterfaceList } from '@/container';

export default {
  components: {
    'interface-list': InterfaceList
  },
  data() {
    return {
      activeName: 'interface'
    };
  }
}
</script>

<style lang="less" scoped>
.g-project {
  background: #fff;
  height: calc(100vh - 81px);
  border-top: 1px solid #f0f2f5;
  .g-aside {
    width: 300px;
    height: inherit;
    border-right: 1px solid rgba(0, 0, 0, 0.05);
  }
}
</style>

