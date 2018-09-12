<template>
  <el-dialog width="60%"
    :title="dialogType === 'add' ? '添加新场景' : '编辑场景'" 
    @open="handleDialogOpen"
    @close="handleDialogClose"
    :visible.sync="selfDialogVisible">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="场景名称：" label-width="120px" prop="sceneName">
        <el-input v-model="form.sceneName" placeholder="请输入场景名称"></el-input>
      </el-form-item>
      <el-form-item label="场景数据：" label-width="120px" prop="data">
        <code-mirror></code-mirror>
      </el-form-item>      
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="selfDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmAddOrUpdateScene">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex';

import { CodeMirror } from '@/components';

export default {
  props: ['dialogType', 'dialogVisible'],
  components: {
    'code-mirror': CodeMirror
  },
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
        interfaceUniqId: '',
        sceneName: '',
        data: {}
      },
      rules: {
        sceneName: [
          { required: true, message: '请输入场景名称', trigger: 'blur' }
        ],
        data: [
          { required: true, message: '请输入场景数据', trigger: 'blur' }
        ]
      }
    }
  },
  computed: mapState({
    interfaceUniqId: state => state.interfaceUniqId
  }),
  methods: {
    // 打开对话框时
    handleDialogOpen() {
      // this.$nextTick(() => {
      //   const codeElement = document.getElementById('code');
      //   const codeMirrorEditor = CodeMirror.fromTextArea(codeElement, {
      //     mode: {
      //       name: 'javascript',
      //       json: true
      //     },
      //     lint: true,
      //     tabSize: 2,
      //     foldGutter: true,
      //     lineNumbers: true,
      //     smartIndent: true,
      //     matchBrackets: true,
      //     styleActiveLine: true,
      //     autoCloseBrackets: true,
      //     gutters: [
      //       'CodeMirror-linenumbers',
      //       'CodeMirror-foldgutter',
      //       'CodeMirror-activeline-gutter',
      //       'CodeMirror-lint-markers'
      //     ],
      //     placeholder: '{\n  ... Input JSON data here\n}'
      //   });
      // });
    },
    // 关闭对话框时
    handleDialogClose() {

    },
    // 确认添加或更新场景
    confirmAddOrUpdateScene() {

    }
  }
}
</script>

<style lang="less" scoped>
</style>
