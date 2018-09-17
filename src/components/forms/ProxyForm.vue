<template>
  <el-dialog 
    title="添加代理" 
    width="500px" center
    :visible.sync="selfDialogVisible">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="代理 URL：" label-width="120px" prop="proxyUrl">
        <el-input v-model="form.proxyUrl" placeholder="请输入代理 URL"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="selfDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmAddProxy">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex';

import { interfaceService } from '@/api';
import { messageWrapper } from '@/utils/message';

export default {
  props: ['dialogVisible', 'proxyConfig'],
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
        proxyUrl: ''
      },
      rules: {
        proxyUrl: [
          { required: true, message: '请输入代理 URL', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      interfaceUniqId: state => state.interfaceUniqId,
    }),
    newProxyList() {
      return this.proxyConfig.proxyList.concat(this.form);
    }
  },
  methods: {
    // 确认添加代理
    confirmAddProxy() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (/^https?:\/\/.+$/.test(this.form.proxyUrl)) {
            const addPromise = interfaceService.updateInterface.bind(null, {
              uniqId: this.interfaceUniqId,
              proxyConfig: {
                ...this.proxyConfig,
                proxyList: this.newProxyList
              }
            });
            messageWrapper('新增', addPromise, () => {
              this.$emit('add-success');
              this.selfDialogVisible = false;
            });
          } else {
            this.$message.error('URL 格式错误，请检查后提交');
          }
        } else {
            return false;
        }
      });
    }
  }
}
</script>
