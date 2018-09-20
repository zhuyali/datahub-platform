<template>
  <div class="g-scene-data">
    <h2 class="black">场景数据</h2>
    <el-tabs v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane
        v-for="(scene, index) in scenes"
        :key="scene.uniqId"
        :label="scene.sceneName"
        :name="`${index}`">
        <code-mirror
          :value="scene.data"
          :visible="index == visible"
          :ref="`code-mirror-${index}`"
          :selfKey="`code-mirror-${index}`"
          :hasChange="index === 0 ? true : false">
        </code-mirror>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import CodeMirror from './CodeMirror'

export default {
  components: {
    'code-mirror': CodeMirror
  },
  data () {
    return {
      activeName: '0',
      visible: '0'
    }
  },
  computed: mapState({
    scenes: state => state.scenes
  }),
  methods: {
    // 浏览不同的场景数据
    handleTabClick (tab) {
      const { name } = tab
      this.visible = name
    }
  }
}
</script>

<style lang="less" scoped>

</style>
