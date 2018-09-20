<template>
  <el-dialog
    title="定义响应数据"
    width="500px" center
    class="g-context-dialog"
    @open="handleDialogOpen"
    @close="handleDialogClose"
    :visible.sync="selfDialogVisible">
    <el-form :model="form" ref="ruleForm">
      <el-form-item label="接口延迟时间(s)：" label-width="150px" prop="responseDelay">
        <el-input v-model="form.responseDelay" placeholder="请输入接口延迟时间，以秒为单位"></el-input>
      </el-form-item>
      <el-form-item label="接口响应状态码：" label-width="150px" prop="responseStatus">
        <el-input v-model="form.responseStatus" placeholder="请输入接口响应状态码"></el-input>
      </el-form-item>
      <el-form-item label="自定义响应头：" label-width="150px" prop="responseHeaders">
          <el-table :data="tableData" class="m-table" border :show-header="false">
            <el-table-column label="key" width="114">
              <template slot-scope="scope">
                <el-input style="width: 100%" v-model="scope.row.key"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="value" width="114">
              <template slot-scope="scope">
                <el-input style="width: 100%" v-model="scope.row.value"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="71">
                <template slot-scope="scope">
                    <el-button @click="handleDeleteRow(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
          </el-table>
          <div class="u-addbtn">
            <el-button @click="handleAddRow">添加一项</el-button>
          </div>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="selfDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmUpdateInterface">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'

import { interfaceService } from '@/api'
import { messageWrapper } from '@/utils/message'

export default {
  props: ['dialogVisible', 'dialogData'],
  watch: {
    dialogVisible () {
      this.selfDialogVisible = this.dialogVisible
    },
    selfDialogVisible () {
      this.$emit('update:dialogVisible', this.selfDialogVisible)
    }
  },
  data () {
    return {
      tableData: [],
      selfDialogVisible: false,
      form: {
        responseDelay: 0,
        responseStatus: 200,
        responseHeaders: {}
      }
    }
  },
  computed: mapState({
    currentInterface: state => state.currentInterface
  }),
  methods: {
    // 打开对话框时
    handleDialogOpen () {
      const responseHeaders = this.dialogData.responseHeaders
      this.form.responseDelay = this.dialogData.responseDelay
      this.form.responseStatus = this.dialogData.responseStatus
      this.form.responseHeaders = responseHeaders
      Object.keys(responseHeaders).forEach((key) => {
        this.tableData.push({
          key,
          value: responseHeaders[key]
        })
      })
    },
    // 关闭对话框时
    handleDialogClose () {
      this.tableData = []
    },
    // 更新接口
    confirmUpdateInterface () {
      this.form.responseHeaders = {}
      this.tableData.forEach(({ key, value }) => {
        if (key && value) {
          this.form.responseHeaders[key] = value
        }
      })
      const updatePromise = interfaceService.updateInterface.bind(null, {
        uniqId: this.currentInterface.uniqId,
        contextConfig: this.form
      })
      messageWrapper('更新', updatePromise, () => {
        this.$emit('update-success')
        this.selfDialogVisible = false
      })
    },
    // 点击添加一项
    handleAddRow () {
      this.tableData.push({
        key: '',
        value: ''
      })
    },
    // 点击删除一项
    handleDeleteRow (index) {
      this.tableData.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
.g-context-dialog {
  .m-table {
    width: 300px;
  }
  .u-addbtn {
    text-align: right;
    margin-top: 10px;
  }
}
</style>
