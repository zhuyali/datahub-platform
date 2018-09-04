<template>
  <div class="g-interface">
    <div class="m-searchbar">
      <el-input class="u-input" v-model="searchKey" placeholder="搜索接口">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button class="u-addbtn" type="primary" icon="el-icon-plus" @click="handleAddClick">添加接口</el-button>
    </div>
    <div class="m-interfaces">
      <div class="m-interface pointer" v-for="interfaceItem in filterInterfaces" :key="interfaceItem.uniqId">
        <div class="m-interface-key">
          <div class="u-interface-path ellipsis" :title="interfaceItem.pathname">
            {{ interfaceItem.pathname }}
          </div>
          <div :class="`u-interface-method u-${interfaceItem.method.toLowerCase()}`">
            {{ interfaceItem.method }}
          </div>
        </div>
        <div class="u-interface-desc ellipsis" :title="interfaceItem.description">
          {{ interfaceItem.description }}
        </div>
        <div class="m-operate">
          <i class="iconfont icon-shezhi u-icon" @click="handleUpdateClick(interfaceItem)"></i>
          <i class="iconfont icon-shanchu u-icon" @click="handleDeleteClick(interfaceItem.uniqId)"></i>
        </div>
      </div>
    </div>

    <interface-form
      :dialogData="dialogData"
      :dialogType="dialogType" 
      :dialogVisible.sync="dialogVisible"
      @add-or-update-success="getAllInterface">
    </interface-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { interfaceService } from '@/api';
import { InterfaceForm } from '@/components';
import { confirmWrapper } from '@/utils/message';

export default {
  components: {
    'interface-form': InterfaceForm
  },
  data() {
    return {
      searchKey: '',
      interfaces: [],
      dialogData: {},
      dialogType: 'add',
      dialogVisible: false,
    };
  },
  computed: {
    filterInterfaces() {
      const results = this.interfaces.filter((item) => {
        const matchPath = item.pathname.indexOf(this.searchKey) !== -1;
        const matchDesc = item.description.indexOf(this.searchKey) !== -1;
        return  matchPath || matchDesc;
      });
      return results;
    }
  },
  created() {
    this.getAllInterface();
  },
  methods: {
    // 删除接口点击时
    handleDeleteClick(uniqId) {
      const deletePromise = interfaceService.deleteInterface.bind(null, uniqId);
      confirmWrapper('删除', deletePromise, () => {
        this.getAllInterface();
      });
    },
    // 更新接口点击时
    handleUpdateClick(interfaceItem) {
      this.dialogData = {
        uniqId: interfaceItem.uniqId,
        method: interfaceItem.method,
        pathname: interfaceItem.pathname,
        description: interfaceItem.description
      };
      this.dialogVisible = true;
      this.dialogType = 'update';
    },
    // 添加接口点击时
    handleAddClick() {
      this.dialogData = {};
      this.dialogType = 'add';
      this.dialogVisible = true;
    },
    // 获取接口列表
    async getAllInterface() {
      const res = await interfaceService.getAllInterface();
      this.interfaces = res.data || [];
    },
  }
}
</script>

<style lang="less" scoped>
.g-interface {
  height: inherit;
  padding: 0 5px;
  .m-searchbar {
    overflow: hidden;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0,0,0,.05);
    .u-input {
      float: left;
      width: calc(100% - 100px);
    }
    .u-addbtn {
      float: right;
    }
  }
  .m-interfaces {
    height: calc(100% - 42px);
    overflow: auto;
    .m-interface {
      box-sizing: border-box;
      height: 80px;
      padding: 12px 20px 12px 16px;
      overflow: auto;
      border-top: 1px solid rgba(0,0,0,.05);
      &:first-child {
        border-top: none;
      }
      .m-interface-key {
        overflow: hidden;
        margin-bottom: 10px;
        .u-interface-path {
          float: left;
          max-width: calc(100% - 50px);
          color: #409EFF;
        }
        .u-interface-method {
          float: right;
        }
      }
      .u-interface-desc {
        float: left;
        max-width: calc(100% - 50px);
      }
      .m-operate {
        float: right;
        .u-icon {
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
