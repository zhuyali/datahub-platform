<template>
  <div class="g-home">
    <el-card class="m-box" shadow="hover" v-for="project in projects" :key="project.uniqId">
      <div slot="header" class="u-title ellipsis">
        <span>{{ project.projectName }}</span>
      </div>
      <div class="m-body">
        <div class="u-iconwrapper">
          <a :href="`/project/${project.projectName}`">
            <i class="iconfont icon-iconset0338 u-icon"></i>
          </a>
        </div>
        <div class="m-footer">
          <div class="m-desc ellipsis">
            <span>{{ project.description }}</span>
            <span class="m-size">
              <i class="iconfont icon-file u-icon"></i>
              {{ project.capacity.count }}
            </span>
            <span class="m-size">
              <i class="iconfont icon-cipanio u-icon"></i>
              {{ project.capacity.size }}
            </span>
          </div>
          <div class="m-operate">
            <i class="iconfont icon-shezhi u-icon pointer" @click="handleUpdateClick(project)"></i>
            <i class="iconfont icon-shanchu u-icon pointer" @click="handleDeleteClick(project.uniqId)"></i>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="m-box" shadow="hover">
      <div slot="header" class="u-title ellipsis">
        <span>添加项目</span>
      </div>
      <div class="m-body">
        <div class="u-iconwrapper u-iconwrapper-add">
          <i class="iconfont icon-tianjiawenjianjia u-icon pointer" @click="handleAddClick"></i>
        </div>
      </div>
    </el-card>

    <project-form 
      :dialogType="dialogType" 
      :dialogData="dialogData"
      :dialogVisible.sync="dialogVisible"
      @add-or-update-success="getAllProject">
    </project-form>
  </div>
</template>

<script>
import { projectService } from '@/api';
import { ProjectForm } from '@/components';
import { confirmWrapper } from '@/utils/message';

export default {
  name: 'home',
  components: {
    'project-form': ProjectForm
  },
  data() {
    return {
      projects: [],
      dialogData: {},
      dialogType: 'add',
      dialogVisible: false,
    }
  },
  created() {
    this.getAllProject();
  },
  methods: {
    // 添加项目点击时
    handleAddClick() {
      this.dialogData = {};
      this.dialogType = 'add';
      this.dialogVisible = true;
    },
    // 删除项目点击时
    handleDeleteClick(uniqId) {
      const deletePromise = projectService.deleteProject.bind(null, uniqId);
      confirmWrapper('删除', deletePromise, () => {
        this.getAllProject();
      });
    },
    // 更新项目点击时
    handleUpdateClick(project) {
      this.dialogData = {
        uniqId: project.uniqId,
        projectName: project.projectName,
        description: project.description
      };
      this.dialogVisible = true;
      this.dialogType = 'update';
    },
    // 获取项目列表
    async getAllProject() {
      const res = await projectService.getAllProject();
      this.projects = res.data || [];
    }
  }
}
</script>

<style lang="less" scoped>
.g-home {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 50px;
  .m-box {
    flex: 0 1 calc(33.333% - 32px);
    margin: 15px 15px;
    .u-title {
      font-size: 16px;
      color: rgba(0,0,0,.85);
      font-weight: 500;
    }
    .m-body {
      .u-iconwrapper {
        display: flex;
        justify-content: center;
        margin-top: -20px;
        border-bottom: 1px solid hsla(0,0%,67%,.2);
        .u-icon {
          font-size: 80px;
          font-weight: 700;
          color: hsla(0,0%,50%,.4);
          transition: color .5s linear;
          &:hover {
            color: #1890ff;
          }
        }
      }
      .u-iconwrapper-add {
        border-bottom: none;
        padding-bottom: 0;
      }
    }
    .m-footer {
      padding: 10px 0 20px;
      .m-desc {
        float: left;
        max-width: calc(100% - 50px);
        .m-size {
          color: #808080;
          margin-left: 5px;
          .u-icon {
            vertical-align: middle;
            margin-right: -6px;
            font-size: 18px;
          }
          .icon-file {
            font-size: 20px;
          }
        }
      }
      .m-operate {
        float: right;
        color: #808080;
        .u-icon {
          position: relative;
          top: 3px;
          font-size: 14px;
          &:last-child {
            margin-left: 3px;
          }
        }
      }
    }
  }
}
</style>
