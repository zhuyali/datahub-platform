<template>
  <div class="g-scene">
    <h2 class="black">场景管理</h2>
    <el-button type="primary" @click="handleAddClick">添加场景</el-button>
    <div class="m-scene-list">
      <div class="m-scene-item" v-for="scene in scenes" :key="scene.uniqId">
        <el-radio class="m-radio" v-model="currentScene" :label="scene.sceneName" :title="scene.sceneName" border @change="handleRadioChange">
          <span class="u-scenename ellipsis">{{ scene.sceneName }}</span>
          <div :class="{ 'm-icons': true,
            'u-opacity': currentScene === scene.sceneName }">
            <a :href="`${previewLink}${scene.sceneName}`" style="color: #409EFF" target="_blank">
              <i class="u-icon el-icon-view" title="预览"
                v-if="currentInterface.method === 'GET' || currentInterface.method === 'ALL'"></i>
            </a>
            <i class="u-icon el-icon-edit" title="编辑" @click.prevent="handleEditClick(scene)"></i>
            <i class="u-icon el-icon-delete" title="删除" @click.prevent="handleDeleteClick(scene.uniqId)"></i>
          </div>
        </el-radio>
      </div>
    </div>

    <scene-form
      :dialogType="dialogType"
      :dialogData="dialogData"
      :dialogVisible.sync="dialogVisible"
      @add-or-update-success="handleSceneChange">
    </scene-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import SceneForm from './forms/SceneForm'
import { sceneService, interfaceService } from '@/api'
import { confirmWrapper, messageWrapper } from '@/utils/message'

export default {
  components: {
    'scene-form': SceneForm
  },
  watch: {
    interfaceUniqId () {
      this.getAllScene()
    },
    currentInterface () {
      this.currentScene = this.currentInterface.currentScene || ''
    }
  },
  data () {
    return {
      scenes: [],
      dialogData: {},
      currentScene: '',
      dialogType: 'add',
      dialogVisible: false
    }
  },
  computed: {
    ...mapState({
      interfaceUniqId: state => state.interfaceUniqId,
      currentInterface: state => state.currentInterface
    }),
    previewLink () {
      return `//${location.host}/api/preview/scene?interfaceUniqId=${this.interfaceUniqId}&sceneName=`
    }
  },
  methods: {
    // 点击添加场景按钮
    handleAddClick () {
      this.dialogData = {}
      this.dialogType = 'add'
      this.dialogVisible = true
    },
    // 点击编辑场景
    handleEditClick ({ sceneName, data, uniqId }) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.dialogData.data = data
      this.dialogData.uniqId = uniqId
      this.dialogData.sceneName = sceneName
    },
    // 点击删除场景
    handleDeleteClick (uniqId) {
      const deletePromise = sceneService.deleteScene.bind(null, uniqId)
      confirmWrapper('删除场景', deletePromise, () => {
        this.handleSceneChange()
      })
    },
    // 选择的场景变化
    handleRadioChange () {
      const updatePromise = interfaceService.updateInterface.bind(null, {
        uniqId: this.interfaceUniqId,
        currentScene: this.currentScene
      })
      messageWrapper('切换场景', updatePromise, () => {
        this.$emit('update-success')
      })
    },
    // 场景有所变化时
    handleSceneChange () {
      this.getAllScene()
      this.$emit('update-success')
    },
    // 获取所有的场景数据
    async getAllScene () {
      const res = await sceneService.getAllScene(this.interfaceUniqId)
      this.scenes = res.data || []
    }
  }
}
</script>

<style lang="less" scoped>
.g-scene {
  .m-scene-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    .m-scene-item {
      flex: 0 0 220px;
      margin: 5px 0;
      .u-scenename {
        display: inline-block;
        width: calc(100% - 70px);
      }
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
