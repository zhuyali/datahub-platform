<template>
  <el-dialog 
    :title="dialogType === 'add' ? '添加新项目' : '编辑项目'" 
    width="500px" center 
    @open="handleDialogOpen"
    @close="handleDialogClose"
    :visible.sync="selfDialogVisible">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="项目名称：" label-width="120px" prop="projectName">
        <el-input v-model="form.projectName" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      <el-form-item label="项目描述：" label-width="120px" prop="description">
        <el-input v-model="form.description" placeholder="请输入项目描述"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="selfDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmAddOrUpdateProject">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { projectService } from '@/api';
import { messageWrapper } from '@/utils/message';

export default {
  props: ['dialogVisible', 'dialogType', 'dialogData'],
  watch: {
    dialogVisible() {
      this.selfDialogVisible = this.dialogVisible;
    },
    selfDialogVisible() {
      this.$emit('update:dialogVisible', this.selfDialogVisible);
    }
  },
  data() {
    return {
      selfDialogVisible: false,
      form: {
        uniqId: '',
        projectName: '',
        description: ''
      },
      rules: {
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入项目描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 确认添加或更新项目
    confirmAddOrUpdateProject() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.dialogType === 'add') {
            const addPromise = projectService.addProject.bind(null, this.form);
            messageWrapper('新增', addPromise, () => {
              this.$emit('add-or-update-success');
              this.selfDialogVisible = false;
            });
          } else {
            const updatePromise = projectService.updateProject.bind(null, this.form);
            messageWrapper('更新', updatePromise, () => {
              this.$emit('add-or-update-success');
              this.selfDialogVisible = false;
            });
          }
        } else {
            return false;
        }
      });
    },
    // 对话框关闭时
    handleDialogClose() {
      this.$refs.ruleForm.resetFields();
    },
    // 对话框打开时
    handleDialogOpen() {
      this.form.uniqId = this.dialogData.uniqId || '';
      this.form.projectName = this.dialogData.projectName || '';
      this.form.description = this.dialogData.description || '';
    }
  }
}
</script>
