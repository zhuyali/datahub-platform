<template>
  <div class="g-scene">
    <h2 class="black">场景管理</h2>
    <el-button type="primary" @click="handleSceneAdd">添加场景</el-button>
    <div class="m-scene-list">
      <div class="m-scene-item" v-for="scene in scenes" :key="scene.uniqId">
        <el-radio class="m-radio" v-model="currentScene" :label="scene.sceneName" border>
          {{ scene.sceneName }}
          <div class="m-icons">
            <i class="u-icon el-icon-view" title="预览" 
              v-if="currentInterface.method === 'GET' || currentInterface.method === 'ALL'"></i>
            <i class="u-icon el-icon-edit" title="编辑"></i>
            <i class="u-icon el-icon-delete" title="删除"></i>
          </div>
        </el-radio>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { sceneService } from '@/api';

export default {
  watch: {
    interfaceUniqId() {
      this.getAllScene();
    },
    currentInterface() {
      if (this.currentInterface) {
        this.currentScene = this.currentInterface.currentScene || '';
      }
    }
  },
  data() {
    return {
      scenes: [],
      currentScene: ''
    }
  },
  computed: mapState({
    interfaceUniqId: state => state.interfaceUniqId,
    currentInterface: state => state.currentInterface
  }),
  methods: {
    // 点击添加场景按钮
    handleSceneAdd() {
      
    },
    // 获取所有的场景数据
    async getAllScene() {
      if (this.interfaceUniqId) {
        const res = await sceneService.getAllScene(this.interfaceUniqId);
        this.scenes = res.data || [];
      }
    }
  }
}
</script>

<style lang="less" scoped>
.g-scene {
  .m-scene-list {
    display: flex;
    margin-top: 10px;
    .m-scene-item {
      flex: 0 0 220px;
      .m-radio {
        width: 200px;
        .m-icons {
          float: right;
          .u-icon {
            margin-left: 3px;
            transition: color .5s linear;
          }
          .el-icon-view:hover {
            color: #67C23A;
          }
          .el-icon-delete:hover {
            color: #F56C6C;
          }
          .el-icon-edit:hover {
            color: #E6A23C;
          }
        }
      }
    }
  }
}
</style>
