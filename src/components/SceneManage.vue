<template>
  <div class="g-scene">
    <h2 class="black">场景管理</h2>
    <el-button type="primary" @click="handleAddClick">添加场景</el-button>
    <div class="m-scene-list">
      <div class="m-scene-item" v-for="scene in scenes" :key="scene.uniqId">
        <el-radio class="m-radio" v-model="currentScene" :label="scene.sceneName" border>
          {{ scene.sceneName }}
          <div :class="{ 'm-icons': true,
            'u-opacity': currentScene === scene.sceneName }">
            <i class="u-icon el-icon-view" title="预览" @click="handlePreviewClick"
              v-if="currentInterface.method === 'GET' || currentInterface.method === 'ALL'"></i>
            <i class="u-icon el-icon-edit" title="编辑" @click="handleEditClick"></i>
            <i class="u-icon el-icon-delete" title="删除" @click="handleDeleteClick"></i>
          </div>
        </el-radio>
      </div>
    </div>

    <scene-form
      :dialogType="dialogType" 
      :dialogVisible.sync="dialogVisible">
    </scene-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { sceneService } from '@/api';
import SceneForm from './forms/SceneForm';

export default {
  components: {
    'scene-form': SceneForm
  },
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
      currentScene: '',
      dialogType: 'add',
      dialogVisible: false
    }
  },
  computed: mapState({
    interfaceUniqId: state => state.interfaceUniqId,
    currentInterface: state => state.currentInterface
  }),
  methods: {
    // 点击添加场景按钮
    handleAddClick() {
      this.dialogType = 'add';
      this.dialogVisible = true;
    },
    // 点击预览场景
    handlePreviewClick() {

    },
    // 点击编辑场景
    handleEditClick() {
      this.dialogType = 'edit';
      this.dialogVisible = true;
    },
    // 点击删除场景
    handleDeleteClick() {

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
        &:hover {
          .m-icons {
            opacity: 1;
          }
        }
        .m-icons {
          float: right;
          opacity: 0;
          transition: opacity .3s linear;
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
        .u-opacity {
          opacity: 1;
        }
      }
    }
  }
}
</style>
