<template>
  <el-dialog
    :title="dialogType === 'add' ? '添加新接口' : '编辑接口'"
    width="500px" center
    @open="handleDialogOpen"
    @close="handleDialogClose"
    :visible.sync="selfDialogVisible">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="接口路径：" label-width="120px" prop="pathname">
        <el-input v-model="form.pathname" placeholder="请输入接口名称"></el-input>
      </el-form-item>
      <el-form-item label="接口描述：" label-width="120px" prop="description">
        <el-input v-model="form.description" placeholder="请输入接口描述"></el-input>
      </el-form-item>
      <el-form-item label="请求方式：" label-width="120px" prop="method">
          <el-select style="width: 330px" v-model="form.method" default-first-option placeholder="请选择请求方式">
              <el-option v-for="(method, index) in supportMethod" :key="index" :value="method"></el-option>
          </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="selfDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmAddOrUpdateInterface">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { interfaceService } from '@/api'
import { messageWrapper } from '@/utils/message'

export default {
  props: ['dialogVisible', 'dialogType', 'dialogData'],
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
      selfDialogVisible: this.dialogVisible,
      supportMethod: ['ALL', 'GET', 'POST', 'PUT', 'DELETE'],
      form: {
        uniqId: '',
        pathname: '',
        method: 'ALL',
        description: ''
      },
      rules: {
        method: [
          { required: true, message: '请选择请求方式', trigger: 'change' }
        ],
        pathname: [
          { required: true, message: '请输入接口URL', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入接口描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 确认添加或更新接口
    confirmAddOrUpdateInterface () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.dialogType === 'add') {
            const addPromise = interfaceService.addInterface.bind(null, this.form)
            messageWrapper('新增', addPromise, () => {
              this.$emit('add-or-update-success')
              this.selfDialogVisible = false
            })
          } else {
            const updatePromise = interfaceService.updateInterface.bind(null, this.form)
            messageWrapper('更新', updatePromise, () => {
              this.$emit('add-or-update-success')
              this.selfDialogVisible = false
            })
          }
        } else {
          return false
        }
      })
    },
    // 对话框关闭时
    handleDialogClose () {
      this.$refs.ruleForm.resetFields()
    },
    // 对话框打开时
    handleDialogOpen () {
      this.form.uniqId = this.dialogData.uniqId || ''
      this.form.method = this.dialogData.method || 'ALL'
      this.form.pathname = this.dialogData.pathname || ''
      this.form.description = this.dialogData.description || ''
    }
  }
}
</script>
